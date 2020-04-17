let loginButton = document.getElementById('loginButton');
let usernameField = document.getElementById('usernameField');
let passwordField = document.getElementById('passwordField');




function loginRequest(){ 
    console.log(usernameField.value) //reading in correctly 
    console.log(passwordField.value)
    sendLogin(usernameField.value, passwordField.value, (res) =>{
        console.log(res)
        response = JSON.parse(res.response);
        
    })

}

let sendLogin = (username, password, callback) => {
    let xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
            console.log("readyState", 4)
            console.log("status", 200)
            callback(this);
      }
    };

    xhttp.open("POST", "/login", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send("{\"username\": \"" + username + "\", \"password\": \"" + password + "\"}");
}

if(loginButton){
    loginButton.addEventListener('click', loginRequest, false);
}