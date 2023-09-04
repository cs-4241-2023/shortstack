//FRONT-END (CLIENT) JAVASCRIPT FOR EXISTING MUSIC DELETIONS HERE

const deletionSubmit = async function(event)
{
    event.preventDefault()

    const currentYear = 2023
    const startingYear = 0

    const bandInput = document.querySelector('#deletebandname') 
    const albumInput = document.querySelector('#deletealbumname')
    const releaseYearInput = document.querySelector('#deletereleaseyear')

    const deletionInfo = document.getElementById("submissionForDeletionInfo")
    const deletionInfoParagraph = document.createElement('p')

    let inputObj = {bandname: bandInput.value, albumname: albumInput.value, releaseyear: releaseYearInput.value}
    
    if(inputObj.releaseyear < startingYear) {
        deletionInfoParagraph.innerHTML = `<strong>The music you submitted cannot be sent to the server</strong>: ${inputObj.releaseyear} is not a valid year.`
        deletionInfo.appendChild(deletionInfoParagraph)
    }
    else if(inputObj.releaseyear > currentYear) {
        deletionInfoParagraph.innerHTML = `<strong>The music you submitted cannot be sent to the server</strong>: ${inputObj.albumname} has not been released yet.`
        deletionInfo.appendChild(deletionInfoParagraph)
    }
    else {
        const body = JSON.stringify(inputObj)

        const response = await fetch('/submitForDelete', { 
            method:'DELETE', 
            body 
        })

        const data = await response.json()
        console.log(data)

        deletionInfoParagraph.innerHTML = `<strong>Here is the music that has been sent to the server to compare against existing data</strong>: Band Name: ${inputObj.bandname}, Album Name: ${inputObj.albumname}, Release Year: ${inputObj.releaseyear}`
        deletionInfo.appendChild(deletionInfoParagraph)
    }
}

window.addEventListener('load', function() { 
    const deleteMusicButton = document.getElementById("submitMusicForDeletion")
    deleteMusicButton.onclick = deletionSubmit
 })

