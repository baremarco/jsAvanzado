/*este array será en el futuro una lista heroes*/
//variables y constantes
const dataNotProvidedMessage = "Dato no suministrado por la API";
let currentData = "";
let skip = 0;
const urlApi = "https://shrouded-tor-09389.herokuapp.com";
//funciones
const handleModal = (e) => {
    let elementUlModal = document.querySelector("div.modal-body ul");
    let elementModalTitle = document.querySelector("#exampleModalLabel")
    let heroe = currentData.find(heroe => heroe._id == e.target.id)
    elementModalTitle.innerHTML = heroe.slug;
    elementUlModal.innerHTML = `<li>Intelligence: ${heroe["powerstats/intelligence"]}</li>
                                <li>Strength: ${heroe["powerstats/strength"]}</li>
                                <li>Speed: ${heroe["powerstats/speed"]}</li>
                                <li>Durability: ${heroe["powerstats/durability"]}</li>
                                <li>Power: ${heroe["powerstats/power"]}</li>
                                <li>Combat: ${heroe["powerstats/combat"]}</li>
                                <li>Full Name: ${heroe["biography/fullName"]}</li>
                                <li>Alter Egos: ${heroe["biography/alterEgos"]}</li>
                                ${heroe["biography/aliases/0"] && '<li>Aliases: ' + heroe["biography/aliases/0"] + '</li>'} 
                                ${heroe["biography/aliases/1"] && '<li>Aliases: ' + heroe["biography/aliases/1"] + '</li>'} 
                                ${heroe["biography/aliases/2"] && '<li>Aliases: ' + heroe["biography/aliases/2"] + '</li>'} 
                                ${heroe["biography/aliases/3"] && '<li>Aliases: ' + heroe["biography/aliases/3"] + '</li>'} 
                                ${heroe["biography/aliases/4"] && '<li>Aliases: ' + heroe["biography/aliases/4"] + '</li>'} 
                                ${heroe["biography/aliases/5"] && '<li>Aliases: ' + heroe["biography/aliases/5"] + '</li>'} 
                                ${heroe["biography/aliases/6"] && '<li>Aliases: ' + heroe["biography/aliases/6"] + '</li>'} 
                                ${heroe["biography/aliases/7"] && '<li>Aliases: ' + heroe["biography/aliases/7"] + '</li>'} 
                                ${heroe["biography/aliases/8"] && '<li>Aliases: ' + heroe["biography/aliases/8"] + '</li>'} 
                                ${heroe["biography/aliases/9"] && '<li>Aliases: ' + heroe["biography/aliases/9"] + '</li>'} 
                                ${heroe["biography/aliases/10"] && '<li>Aliases: ' + heroe["biography/aliases/10"] + '</li>'} 
                                ${heroe["biography/aliases/11"] && '<li>Aliases: ' + heroe["biography/aliases/11"] + '</li>'} 
                                ${heroe["biography/aliases/12"] && '<li>Aliases: ' + heroe["biography/aliases/12"] + '</li>'} 
                                ${heroe["biography/aliases/13"] && '<li>Aliases: ' + heroe["biography/aliases/13"] + '</li>'} 
                                ${heroe["biography/aliases/14"] && '<li>Aliases: ' + heroe["biography/aliases/14"] + '</li>'} 
                                ${heroe["biography/aliases/15"] && '<li>Aliases: ' + heroe["biography/aliases/15"] + '</li>'} 
                                ${heroe["biography/aliases/16"] && '<li>Aliases: ' + heroe["biography/aliases/16"] + '</li>'} 
                                ${heroe["biography/aliases/17"] && '<li>Aliases: ' + heroe["biography/aliases/17"] + '</li>'} 
                                ${heroe["biography/aliases/18"] && '<li>Aliases: ' + heroe["biography/aliases/18"] + '</li>'} 
                                ${heroe["biography/aliases/19"] && '<li>Aliases: ' + heroe["biography/aliases/19"] + '</li>'} 
                                <li>Place of Birth: ${heroe["biography/placeOfBirth"]}</li>
                                <li>First Appearance: ${heroe["biography/firstAppearance"]}</li>
                                <li>Publisher: ${heroe["biography/publisher"]}</li>
                                <li>Alignment: ${heroe["biography/alignment"]}</li>
                                <li>Gender: ${heroe["appearance/gender"]}</li>
                                <li>Race: ${heroe["appearance/race"]}</li>
                                <li>Height: ${heroe["appearance/height/1"]}</li>
                                <li>Weight: ${heroe["appearance/weight/1"]}</li>
                                <li>Eye Color: ${heroe["appearance/eyeColor"]}</li>
                                <li>Hair Color: ${heroe["appearance/hairColor"]}</li>
                                <li>Occupation: ${heroe["biography/fullName"]}</li>
                                <li>Base of operation: ${heroe["work/base"]}</li>`
    $('#exampleModal').modal('show');
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
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

const renderHeroes = (heroes) => {
    let elementRow = document.querySelector(".row");
    elementRow.innerHTML = "";
    heroes.forEach((heroe) => {
        elementRow.innerHTML = `${elementRow.innerHTML}
                            <div class="col-md-4">
                                <div class="card mb-4 shadow-sm">
                                        <img class="bd-placeholder-img card-img-top" width="100%" height="225" src="${heroe["images/md"]}" alt="Imagen del superheroe"/>
                                        <div class="card-body">
                                        <p class="card-text">${heroe["biography/fullName"] || dataNotProvidedMessage}: ${heroe.name || dataNotProvidedMessage}</p>
                                            <ul class="list-group list-group-flush">
                                                <li class="list-group-item">Genero: ${heroe["appearance/gender"] || dataNotProvidedMessage}</li>
                                                <li class="list-group-item">Maximo Poder: ${heroe["powerstats/power"] || dataNotProvidedMessage}</li>
                                                <li class="list-group-item">Lugar donde vive: ${heroe["biography/placeOfBirth"] || dataNotProvidedMessage}</li>
                                                <li class="list-group-item"></li>
                                            </ul>
                                            <div class="d-flex justify-content-between align-items-center">
                                                <div class="btn-group">
                                                    <button type="button" id=${heroe._id} class="btn btn-sm btn-outline-secondary" onclick="handleModal(event)">View</button>
                                                    <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                                                </div>
                                                <small class="text-muted">9 mins</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
    })
}

const apiGetPagination = (skip, limit) => {
    let urlPagination = `${urlApi}/all/pagination/${skip}/${limit}`
    fetch(urlPagination, {
        headers: {
            "Content-Type": "application/json",
            "token": getCookie("tokenApiHeroes")
        }
    })
        .then(response => {
            return response.json();
        })
        .then(data => {
            currentData = data;
            renderHeroes(currentData);
        })
}


//programacion boton previous
let elementsPrevious = document.querySelectorAll(".btn-previous");
elementsPrevious.forEach((element) => element.addEventListener("click", (e) => {
    e.preventDefault();
    if (skip > 0) {
        skip -= 9;
        apiGetPagination(skip, 9);
        if (skip <= 0) document.querySelectorAll(".btn-previous").forEach((btn) => btn.parentNode.classList.add("disabled"));
    }

}))
//programacion boton next
let elementsNext = document.querySelectorAll(".btn-next");
elementsNext.forEach((element) => element.addEventListener("click", (e) => {
    e.preventDefault();
    skip += 9;
    apiGetPagination(skip, 9);
    if (skip > 0) {
        document.querySelectorAll(".btn-previous").forEach((btn) => btn.parentNode.classList.remove("disabled"));
    }
}))

//programacion del search input
let elementSearch = document.querySelector("input[type=search]");
elementSearch.addEventListener("keyup", (e) => {
    let filteredData = currentData.filter((heroe) => {
        let fullName = heroe["biography/fullName"].toLowerCase();
        let gender = heroe["appearance/gender"].toLowerCase();
        let maxPower = heroe["powerstats/power"].toLowerCase();
        let place = heroe["biography/placeOfBirth"].toLowerCase();
        return fullName.includes(e.target.value.toLowerCase()) ||
            gender.startsWith(e.target.value.toLowerCase()) ||
            maxPower.includes(e.target.value.toLowerCase()) ||
            place.includes(e.target.value.toLowerCase())
    });
    renderHeroes(filteredData);
})

//programacion del  enviar super heroe del abmModal
let elementFormAbmModal = document.querySelector("form.abmModal");
elementFormAbmModal.addEventListener("submit", (e) => {
    const urlCreate = `${urlApi}/create`
    let elementName = document.querySelector("#name");
    let elementSlug = document.querySelector("#slug");
    let elementGender = document.querySelector("#gender");
    let elementMaxPower = document.querySelector("#maxpower");
    const name = elementName.value;
    const slug = elementSlug.value;
    const gender = elementGender.value;
    const maxPower = elementMaxPower.value;
    e.preventDefault();
    if (getCookie("tokenApiHeroes")) {
        fetch(urlCreate, {
            method: "POST",
            body: JSON.stringify({
                name,
                slug,
                appearancegender: gender,
                powerstatspower: maxPower 
            }),
            headers: {
                "Content-Type": "application/json",
                "token": getCookie("tokenApiHeroes")
            }
        })
            .then(response => response.json())
            .then(json => {
                console.log(json);
            })
        elementName.value = "";
        elementSlug.value = "";
        elementGender.value = "";
        elementMaxPower.value = "";
        $('#abmModal').modal('hide');

    } else {
        document.location.replace("/index.html");

    }
})

setInterval( () => {
    if (getCookie("tokenApiHeroes")) document.location.replace("/index.html");
}, 60000 * 5);
// ----------------------------------Pragrama--------------------------------

//Llamado a la api y renderizado
apiGetPagination(skip, 9);
