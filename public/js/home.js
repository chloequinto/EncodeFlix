function findID(movieID){ 
    console.log(movieID)
    sendID(movieID, (res) =>{
        response = JSON.parse(res.response)
        console.log(response)
        // window.location = window.location.href.slice(0,21) + response["url"]
    })

}


let sendID = (movieID, callback) => {
    let xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
      if(this.readyState == 4 && this.status == 200) {
            console.log("readyState", 4)
            console.log("status", 200)
            callback(this);
      }
    }; 

    xhttp.open("POST", "/like", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send("{\"movieID\": \"" + movieID + "\"}");
}