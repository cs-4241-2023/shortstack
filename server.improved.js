const http = require('http'),
  fs = require('fs'),
  // IMPORTANT: you must run `npm install` in the directory for this assignment
  // to install the mime library if you're testing this on your local machine.
  // However, Glitch will install it automatically by looking in your package.json
  // file.
  mime = require('mime'),
  crypto = require('crypto'),
  dir = 'public/',
  port = 3000

const appdata = [];

const server = http.createServer(function (request, response) {
  if (request.method === 'GET') {
    handleGet(request, response)
  } else if (request.method === 'POST') {
    handlePost(request, response)
  }
})

const handleGet = function (request, response) {
  const filename = dir + request.url.slice(1)

  if (request.url === '/') {
    sendFile(response, 'public/index.html')
  } else if (request.url === '/req-server-data') {
    const res_type = mime.getType(JSON.stringify(appdata));
    response.writeHeader(200, { 'Content-Type': res_type })
    response.end(JSON.stringify(appdata));
  }
  else {
    sendFile(response, filename)
  }
}

const handlePost = function (request, response) {
  let dataString = ''

  request.on('data', function (data) {
    dataString += data
  })

  request.on('end', function () {
    if (request.url === '/submit') {
      const user_data_json = JSON.parse(dataString);
      console.log("Data being added: ");
      console.log(user_data_json);

      // Add user vehice service appointment data to appdata
      // Before adding it to the array of JSON objects, add new derived field 
      user_data_json['day-until-appointment'] = addNewDataField(user_data_json);
      user_data_json['uuid'] = crypto.randomUUID();

      appdata.push(user_data_json);

      console.log("Server Data after submission: ");
      console.log(appdata);
      response.writeHead(200, "OK", { 'Content-Type': 'text/plain' })
      response.end('Success')

    } else if (request.url === '/delete-frm-table') {

      const unique_identifier = dataString;
      console.log(`Server: Removing UUID ${unique_identifier}`);
      const index = appdata.findIndex(entry => entry.uuid === unique_identifier);

      if (index !== -1) {
        appdata.splice(index, 1);
      }

      response.writeHead(200, "OK", { 'Content-Type': 'text/plain' })
      response.end('Success');

    } else if (request.url === '/modify-table-entry') {

      const data_to_modify = JSON.parse(dataString);
      console.log("Modified Data: ");
      console.log(data_to_modify);

      const modify_uuid = data_to_modify[0];
      const modify_form_data = JSON.parse(data_to_modify[1]);

      // Locate entry we want to modify using the UUID
      const modify_index = appdata.findIndex(entry => entry.uuid === modify_uuid);

      // modify appdata
      appdata[modify_index]['year'] = modify_form_data['year'];
      appdata[modify_index]['car_make'] = modify_form_data['car_make'];
      appdata[modify_index]['model'] = modify_form_data['model'];
      appdata[modify_index]['service_type'] = modify_form_data['service_type'];
      appdata[modify_index]['appointment_date'] = modify_form_data['appointment_date'];

      const new_days_until_apt = addNewDataField(appdata[modify_index])
      appdata[modify_index]['day-until-appointment'] = new_days_until_apt;

      console.log("App data after modification");
      console.log(appdata);

      response.writeHead(200, "OK", { 'Content-Type': 'text/plain' })
      response.end('Modify Success');
    }


  })

}

function addNewDataField(json_data) {
  const currentDate = new Date();
  const appointment_date = new Date(json_data['appointment_date']) // 2023-09-23

  if (appointment_date >= currentDate) {
    // Calculate the time difference in milliseconds
    const timeDifference = appointment_date - currentDate;

    // Convert the time difference to days
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    return daysDifference;
  } else {
    return 0;
  }
}

const sendFile = function (response, filename) {
  const type = mime.getType(filename)

  fs.readFile(filename, function (err, content) {

    // if the error = null, then we've loaded the file successfully
    if (err === null) {

      // status code: https://httpstatuses.com
      response.writeHeader(200, { 'Content-Type': type })
      response.end(content)

    } else {
      // file not found, error code 404
      response.writeHeader(404)
      response.end('404 Error: File Not Found')

    }
  })
}

server.listen(process.env.PORT || port)
