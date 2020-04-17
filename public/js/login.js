let loginButton = document.getElementById('loginButton');


let sendLogin = (username, password, cb) => { 
    let xhttp = new XMLHttpRequest(); 

    xhttp.onreadystatechange = function(){ 
        if(this.readyState == 4 && this.status == 200){
            cb(this); 
        }
    }; 

    xhttp.open("POST", "/login", true); 
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send("{\"username\": \"" + username + "\", \"password\": \"" + password + "\"}");
}
function loginRequest(){ 
    sendLogin(usernameField.value, passwordField.value, (res) =>{
        response = JSON.parse(res.response);
    })

}

if(loginButton){
    loginButton.addEventListener('click', loginRequest, false);
}