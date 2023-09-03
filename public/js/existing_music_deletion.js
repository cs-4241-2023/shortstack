//FRONT-END (CLIENT) JAVASCRIPT FOR EXISTING MUSIC DELETIONS HERE

const deletionSubmit = async function(event)
{
    event.preventDefault()

    const bandInput = document.querySelector('#deletebandname') 
    const albumInput = document.querySelector('#deletealbumname')
    const releaseYearInput = document.querySelector('#deletereleaseyear')

    const deletionInfo = document.getElementById("submitMusicForDeletion")
    const deletionInfoParagraph = document.createElement('p')

    let inputObj = {bandname: bandInput.value, albumname: albumInput.value, releaseyear: releaseYearInput.value}
    
    if(inputObj.releaseyear < 0) {
        deletionInfoParagraph.innerHTML = `<strong>The music you submitted cannot not be sent to the server</strong>: ${inputObj.releaseyear} is not a valid year.`
        deletionInfo.appendChild(deletionInfoParagraph)
    }
    else if(inputObj.releaseyear > 2023) {
        deletionInfoParagraph.innerHTML = `<strong>The music you submitted cannot be sent to the server</strong>: ${inputObj.albumname} has not been released yet.`
        deletionInfo.appendChild(deletionInfoParagraph)
    }
    else {
        const body = JSON.stringify(inputObj)

        const response = await fetch('/submit', { 
            method:'DELETE', 
            body 
        })

        const data = await response.json()
        console.log(data)
    }
}


window.addEventListener('load', function() { 
    const deleteMusicButton = document.getElementById("submitMusicForDeletion");
    deleteMusicButton.onclick = deletionSubmit;
 })

