//definimos las constantes
const urlApi = "https://shrouded-tor-09389.herokuapp.com";

if (getCookie("tokenApiHeroes")) document.location.replace("/album.html");

//manejamos el evento submit del login
let elementoForm = document.querySelector("form.form-signin");
elementoForm.addEventListener("submit", (e) => {
    const urlToken = urlApi + "/token";
    const email = document.querySelector("#inputEmail").value;
    let cookieTimeToLive = 60 * 10;
    e.preventDefault();
    
    fetch(urlToken, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
        })
    })
    .then(response => response.json())
    .then(json => {
        document.cookie = "tokenApiHeroes=" + json.token + "; max-age=" + cookieTimeToLive + "; path=/";
        document.location.replace("/album.html");
    })    
});

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
