const defaultSeatsData = [
    { id: 1, type: "Table", capacity: 4, available: true },
    { id: 2, type: "Table", capacity: 4, available: true },
    { id: 3, type: "Seat", capacity: 1, available: true },
    { id: 4, type: "Seat", capacity: 1, available: false }
];

// Cek apakah sudah ada data kursi di localStorage
if (localStorage.getItem("seatsData") === null) {
    localStorage.setItem("seatsData", JSON.stringify(defaultSeatsData));
}

const nameInput = document.getElementById("name");
const saveButton = document.getElementById("saveName");
const navigationButtons = document.querySelectorAll(".navigation");

// Tampilkan nama jika sebelumnya sudah pernah disimpan
const savedName = localStorage.getItem("customerName");
if (savedName !== null && nameInput) {
    nameInput.value = savedName;
}

// Simpan nama ke localStorage
if (saveButton) {
    saveButton.addEventListener("click", function () {
        const customerName = nameInput.value.trim();
        if (customerName === "") {
            alert("Silahkan masukkan nama terlebih dahulu!");
            return;
        }
        localStorage.setItem("customerName", customerName);
        alert("Nama berhasil disimpan!");
    });
}

// Cegah pindah halaman kalau nama belum disimpan
navigationButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
        const customerName = localStorage.getItem("customerName");
        if (customerName === null || customerName.trim() === "") {
            event.preventDefault();
            alert("Silahkan isi dan simpan nama terlebih dahulu!");
        }
    });
});
