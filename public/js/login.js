//function for login button 
const login = function(){
  const username = document.getElementById('username').value
  const password = document.getElementById('password').value
  // console.log(username,password)
  loginServer(username,password)
}


const loginServer = async function(username, password) {
  //event.preventDefault()

  const json = {
    "username": username,
    "password": password
  }
  fetch( '/login', {
    method:'POST',
    headers: { 'Content-Type': 'application/json' },
    body:JSON.stringify({ "user":json })
  }).catch(error => {
    console.error('Fetch error:', error);
  })
}