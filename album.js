/*este array será en el futuro una lista heroes*/
//variables y constantes
const dataNotProvidedMessage = "Dato no suministrado por la API"
let currentData = "";

//funciones
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
                                                    <button type="button" class="btn btn-sm btn-outline-secondary">View</button>
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
    const urlApi = `https://shrouded-tor-09389.herokuapp.com/all/pagination/${skip}/${limit}`
    fetch(urlApi)
        .then(response => {
            return response.json();
        })
        .then(data => {
            currentData = data;
            renderHeroes(currentData);

        })

}


let skip = 0;
apiGetPagination(skip, 9);

//programacion boton previous
let elementsPrevious = document.querySelectorAll(".btn-previous");
elementsPrevious.forEach((element) => element.addEventListener("click", (e) => {
    e.preventDefault();
    if (skip > 0) {
        skip -= 9;
        apiGetPagination(skip, 9);
        if (skip <= 0) document.querySelector(".btn-previous").parentNode.classList.add("disabled");
    }

}))
//programacion boton next
let elementsNext = document.querySelectorAll(".btn-next");
elementsNext.forEach((element) => element.addEventListener("click", (e) => {
    e.preventDefault();
    skip += 9;
    apiGetPagination(skip, 9);
    if (skip > 0) {
        document.querySelector(".btn-previous").parentNode.classList.remove("disabled");
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
            gender.includes(e.target.value.toLowerCase()) ||
            maxPower.includes(e.target.value.toLowerCase()) ||
            place.includes(e.target.value.toLowerCase())
    });
    renderHeroes(filteredData);
})