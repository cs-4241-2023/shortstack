const loginServer = async function(event) {
  event.preventDefault()
  console.log("here")
  const json = {
    "username": document.getElementById('username').value,
    "password": document.getElementById('password').value
  }
  fetch( '/login', {
    method:'POST',
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify(json)
  }).catch(error => {
    console.error('Fetch error:', error);
  })
}

window.onload = function(){
  const loginBtn = document.getElementById('login');
  loginBtn.onclick = loginServer;
}