//FRONT-END (CLIENT) JAVASCRIPT FOR SHOWING ALL MUSIC IN SERVER MEMORY

const showMusicListeningList = async function(event) {
    
    const requestURL = '/getMusicData'
    event.preventDefault()

    const response = await fetch(requestURL, {
        method:'GET'
    })

    const data = await response.json()
    console.log(data)
    const listSection = document.getElementById("musicList")
    const musicList = document.createElement('ul')

    data.forEach(d => {
        const musicItem = document.createElement('li')
        musicItem.innerHTML = `<strong>Band Name</strong>: ${d.bandName}, <strong>Album Name</strong>: ${d.albumName}, <strong>Release Year</strong>: ${d.releaseYear}, <strong>Album Age</strong>: ${d.albumAge}` //Template literal example
        musicList.appendChild(musicItem)
    })

    listSection.appendChild(musicList)
}

if(window.location.href === 'view_music_listening_list.html') {   
    window.addEventListener('load', function() { 
        const getMusicButton = document.getElementById("getMusic")
        getMusicButton.onclick = showMusicListeningList
    })
}
 
 