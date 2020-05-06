/*este array será en el futuro una lista heroes*/
let elementRow = document.querySelector(".row");
const urlApi = "https://shrouded-tor-09389.herokuapp.com/all/pagination/0/10"
fetch(urlApi)
    .then(response => {
        return response.json();
    })
    .then(data => {
        data.forEach(
            (heroe) => {
            elementRow.innerHTML = `${elementRow.innerHTML}
                      <div class="col-md-4">
                      <div class="card mb-4 shadow-sm">
                      <img class="bd-placeholder-img card-img-top" width="100%" height="225" src="${heroe["images/md"]}" />
                      <div class="card-body">
                          <p class="card-text">${heroe["biography/fullName"]}</p>
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
            }

        );

    })

