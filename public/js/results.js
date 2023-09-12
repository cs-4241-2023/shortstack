const getServerData = async function() {
    console.log('Results.js loaded and working')
    const response = await fetch('results', {method: 'GET'});
    const text = await response.text();
    console.log(text);
}

window.onload = getServerData;