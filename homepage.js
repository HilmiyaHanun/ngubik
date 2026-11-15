//buat kursi tersedia
const defaultSeatsData = [
    {
        id: 1,
        type: "Table",
        capacity: 4,
        available: true
    },
    {
        id: 2,
        type: "Table",
        capacity: 4,
        available: true
    },
    {
        id: 3,
        type: "Seat",
        capacity: 1,
        available: true
    },
    {
        id: 4,
        type: "Seat",
        capacity: 1,
        available: false
    }
];

// buat cek apa ada data kursi di local storage
if (localStorage.getItem("seatsData") === null){
    localStorage.setItem(
        "seatsData",
        JSON.stringify(defaultSeatsData)
    );
}

//elemen html buat di save
const nameInput = document.getElementById("name");
const saveButton = document.getElementById("saveName");
const navigationButtons = document.querySelectorAll(".navigation");

//cek sebelumnya pernah ada datanya ga
const savedName = localStorage.getItem("customerName");
if (savedName !== null){
    nameInput.value = savedName;
}

//nyimpen nama 
saveButton.addEventListener("click", function) (){
    const customerName = nameInput.value.trim();
    if (customerName === ""){
        alert("Silahkan masukkan nama terlebih dahulu!");
        return;
    }
    localStorage.setItem("customerName", customerName);
    alert ("Nama berhasil disimpan!");
});

navigationButtons.forEach(function (button)){
    button.addEventListener("click", function (event)) {
        const customerName = localStorage.getItem("customerName");
        if (customerName === null || customerName.trim() === ""){
            event.preventDefault();
            alert ("Silahkan simpan nama terlebih dahulu!");
        }
    });
});

