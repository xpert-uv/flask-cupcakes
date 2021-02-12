const BASE_URL = "http://localhost:5000/api";


function generateCupcakeHTML(cupcake) {
    return `
    <div class="col-sm-4">
    <div class="card" style="width: 14rem;">
     <img src="${cupcake.image}" class="card-img-top" alt="...">
     <div class="card-body">
     <ul>
        <li>flavour:${cupcake.flavor}</li>
        <li>size:${cupcake.size}</li>
        <li>Rating:${cupcake.rating}
        </ul>
        <button id="delete-btn" class="btn btn-danger delete-btn" data-id=${cupcake.id}>Delete</button>
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
$('.addform').click(function () {
    $("#form").show();
})

$('#frm').on("submit", async function (evt) {
    evt.preventDefault();
    $("#form").hide();
    let flavor = $('#flavor').val();
    let size = $('#size').val();
    let image = $("#image").val();
    let rating = $("#rating").val();

    const newCupCakeResp = await axios.post(`${BASE_URL}/cupcakes`, { flavor, image, size, rating });
    let newCupCake = $(generateCupcakeHTML(newCupCakeResp.data.cupcake));
    $("#frm").trigger("reset");
    $(".row").append(newCupCake);

})

$(".card-body").on("click", "#delete-btn", async function (evt) {
    evt.preventDefault();
    const id = $(this).data('id')
    await axios.delete(`${BASE_URL}/cupcakes/${id}`);
    alert("deleted")
    $(this).parent().parent().remove()
});

