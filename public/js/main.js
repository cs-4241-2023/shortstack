// FRONT-END (CLIENT) JAVASCRIPT HERE

/*const submit = async function (event) {
  // stop form submission from trying to load
  // a new .html page for displaying results...
  // this was the original browser behavior and still
  // remains to this day
  event.preventDefault();

  const input = document.querySelector("#title"),
    json = { title: input.value },
    body = JSON.stringify(json);

  const response = await fetch("/submit", {
    method: "POST",
    body,
  });

  const data = await response.json();

  const list = document.createElement("ul");

  data.forEach((d) => {
    const item = document.createElement("li");
    item.innerHTML = `<b>season</b> : ${d.season}, <b>title</b> : ${d.title}, <b>artist</b> : ${d.artist}`;
    list.appendChild(item);
  });

  document.body.appendChild(list);
};*/

const add = async function (event) {
  event.preventDefault();

  const season = document.getElementById("season").value;
  const songTitle = document.getElementById("title").value;
  const songArtist = document.getElementById("artist").value;
  const songLength = document.getElementById("length").value;
  const json = {
      season: season,
      title: songTitle,
      artist: songArtist,
      length: songLength,
    },
    body = JSON.stringify(json);

  const response = await fetch("/submit", {
    method: "POST",
    body,
  });

  const data = await response.json();
  createPlaylist(data);
};


 function createPlaylist(data) {
   
  const list = document.getElementById("output");
  const header = document.getElementById("header");
   
    list.innerHTML = "";
    data.forEach((d) => {
      let current_season = document.getElementById("season").value;
      const item = document.createElement("p1");
      const pop = document.createElement("button");
      if (current_season === d.season) {
        item.innerHTML = `${d.title} by ${d.artist}: ${d.length}`;
        list.appendChild(item);

        pop.innerHTML = `Delete`;
        pop.onclick = async function (event) {
          event.preventDefault();
          const removeJson = {
              season: d.season,
              title: d.title,
              artist: d.artist,
              length: d.length,
            },
            removeBody = JSON.stringify(removeJson);

          const removeResponse = await fetch("/remove", {
            method: "POST",
            body: removeBody,
          });

          const responseData = await removeResponse.json();
          createPlaylist(responseData);
        };
        item.appendChild(pop);
      } else {
        document.getElementById("output").innerHTML = "";
      }

      header.innerHTML = `${d.season} playlist`;
    });

    document.body.appendChild(list);
  }



window.onload = async function () {
  const addButton = document.getElementById("add");
  addButton.onclick = add;
  
  
   const doesNothing = await fetch("/nothing", {
            method: "POST",
            body: JSON.stringify({})
          });
  

  // similar logic to add - not appending/replacing
};

//send data
