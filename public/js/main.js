// FRONT-END (CLIENT) JAVASCRIPT HERE

const submit = async function( event ) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault()
  
 const input = document.querySelector( '#yourname' ),
        input2 = document.querySelector('#meetname'),
        input3 = document.querySelector('#locationname'),
        input4 = document.querySelector('#datetime'),
        json = { yourname: input.value, meetname: input2.value, locationname: input3.value, datetime: input4.value},
        body = JSON.stringify( json )

  const response = await fetch( '/submit', {
    method:'POST',
    body 
  })
  const today = new Date()
  //console.log(today)
  
  const text = await response.text()
  //console.log(JSON.parse(text))
  const data = JSON.parse(text)
  const list = document.createElement('ul')
    data.forEach( d =>{
    const date = d.date.split('/')
    let months = parseInt(date[0]) - today.getMonth() - 1
    let days = parseInt(date[1]) - today.getDay()
    let totalDays = months * 30 + days
    const meet = document.createElement('li')
    meet.innerHTML = `<b>Meeting Name</b>: ${d.name} | <b>Location</b>: ${d.location} | <b>Date</b>: ${d.date} | <b>Days Till Meeting</b>: ${d.daysTill}`
    list.appendChild(meet)
  })
  
  document.body.replaceChild(list,document.body.lastChild)
  
  //console.log( 'text:', text)
}

window.onload = function() {
   const button = document.querySelector("button");
  button.onclick = submit;
}