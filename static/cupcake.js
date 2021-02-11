const BASE_URL = "http://localhost:5000/api";
function generateCupcakeHTML(cupcake) {
    return `
    <div class="col-sm-4">
    <div class="card" style="width: 14rem;" data-cupcake-id=${cupcake.id}>
     <img src="${cupcake.image}" class="card-img-top" alt="...">
     <div class="card-body">
     <ul>
        <li>flavour:${cupcake.flavor}</li>
        <li>size:${cupcake.size}</li>
        <li>Rating:${cupcake.rating}
        </ul>
    </div>
    </div>
    </div>`;
}
async function showInitialCupcakes() {
    const response = await axios.get(`${BASE_URL}/cupcakes`);

    for (let cupcakeData of response.data.cupcakes) {
        let newCupcake = $(generateCupcakeHTML(cupcakeData));
        $(".row").append(newCupcake);
    }
}
$(showInitialCupcakes);