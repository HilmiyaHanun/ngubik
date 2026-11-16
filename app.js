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

document.addEventListener('DOMContentLoaded', () => {
    const customerName = localStorage.getItem('customerName') || 'Tamu';
    const cartTotal = localStorage.getItem('cartTotal') || '0';

    const displayCustomerName = document.getElementById('displayCustomerName');
    const displayCartTotal = document,getElementById('displayCartTotal');

    if (displayCustomerName){
        displayCustomerName.innerText = customerName;
    }

    if (displayCartTotal){
        const fromattedTotal = 'Rp ' + Number(cartTotal).toLocalString('id-ID');
        displayCartTotal.innerText = fromattedTotal;
    }

// menu, harga, jumlah awal
const menuData = {
    food: [
        { id: 'f1', name: 'Nasi Goreng Spesial', price: 20000. qty: 0},
        { id: 'f2', name: 'Mie Goreng Seafood', price: 25000. qty: 0},
        { id: 'f3', name: 'Chicken Katsu Curry', price: 18000. qty: 0},
    ],
    drink: [
        { id: 'd1', name: 'Es Teh Manis', price: 3000. qty: 0},
        { id: 'd2', name: 'Es Jeruk', price: 5000. qty: 0},
        { id: 'd3', name: 'Jus Buah', price: 10000. qty: 0},
    ]
};

// biar bentuk rupiah
function formatRupiah(amount){
    return 'Rp ' + amount.toLocaleString('id-ID');
}

// menu masuk ke tabel html
function renderMenu(){
    const foodListEl = document.getElementById('foodList');
    const drinkListEl = document.getElementById('drinkList');

    id (foodListEl || !drinkListEl) return;

    <tr>
        <td class= "name"> ${item.name}</td>
        <td class= "price"> ${formatRupiah(item.price)}</td>
        <td class= "qty">
            <button onclick="updateQty('food', ${index}, -1)">-</button>
            <button onclick="updateQty('food', ${index}, -1)">+</button>
        </td>
    </tr>
    `).join('');

    <tr>
        <td class= "name"> ${item.name}</td>
        <td class= "price"> ${formatRupiah(item.price)}</td>
        <td class= "qty">
            <button onclick="updateQty('drink', ${index}, -1)">-</button>
            <button onclick="updateQty('drink', ${index}, -1)">+</button>
        </td>
    </tr>
    `).join('');

    updateTotal();
}

// nambah kurang qty
function updateQty(category, index, change){
    if (menuData[category][index].qty + change >= 0){
        menuData[category][index].qty += change;
        renderMenu();
    }
}

// hitung total keseluruhan
function updateTotal(){
    let total = 0;

    menuData.food.forEach(item=> {
        total += item.price * item.qty;
    });

    menuData.drink.forEach(item => {
        total += item.price * item.qty;
    });

    const totalDisplay = document.getElementById('totalDisplay');
    if (totalDisplay){
        totalDisplay.innerTec=xt = formatRupiah(total);
    }

    window.cartTotal = total;
}

// kl pencxet next ntar nyimpen data
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    const nextBtn = document.querySelector('.sub-navigation');
    if (nextBtn){
        nextBtn.addEventListener('click', (e) => {
            localDtorage.setItem('cartTotal', window.carTotal);
            localDtorage.setItem('cartData', JSON.stringify(menuData));
        });
    }
});
  
// validasi jam ambil
const pickupTimeInput = document.getElementById('pickupTime');
const timeStatus = document.getElementById('timeStatus');
const radioCash = document.getElementById('radioCash');
const radioQris = document.getElementById('radioQris');
const labelCash = document.getElementById('labelCash');
const labelQris = document.getElementById('labelQris');

function setPaymentLocked(isLocked){
    if (radioCash && radioQris){
        radiocashCash.disabled = isLocked;
        radioQris.disabled = isLocked;

        if (isLocked){
            labelCash.style.opacity = '0.5';
            labelQris.style.opacity = '0.5';
            labelCash.style.cursor = 'not-allowed';
            labelQris.style.cursor = 'not-allowed';
        } else {
            labelCash.style.opacity = '1';
            labelQris.style.opacity = '1';
            labelCash.style.cursor = 'pointer';
        }
    }
}

setPaymentLocked(true);
if (pickupTimeInput){
    pickupTimeInput.addEventListener('input', () =>{
        const timeValue = pickupTimeInput.value; // format hh:mm

        if (!timeValue){
            timeStatus.innerText = '';
            timeStatus.style.color = 'black';
            setPaymentLocked (true);
            return;
        }

        if (timeValue >= '07:00' && timeValue <= '15:00') {
            timeStatus.innerText = '✓ Jam pick-up valid';
            timeStatus.style/color = 'green';
            setPaymntLocked (false); //buka kunci pilihan pembayaran
        } else {
            timeStatus.innerText = '✕ Jam pick-up harus antara 07:00 - 15:00';
            timeStatus.style.color = 'red';
            setPaymentLocked(true); //kunci lg krn di luar jam pickup

            //reset pilihan kl udah terlanjur
            radioCash.checked = false;
            radioQris.checked = false;
        }
    });
}
// tombol done buat reset & back
const doneButton = document.querySelector ('.sub-navigation');
if (doneButton){
    doneButton.addEventListener('click', (e) => {
        //recheck jamnya valid ga
        const timeValue = pickupTimeInput.value;
        if (timeValue < '07:00' || timeValue > '15:00' || !timeValue){
            e.preventDefault();
            alert('Silahkan pilih jam pick-up yang valid (07:00 - 15:00) terlebih dahulu!');
            return;
        }

        // tampilkan pesanan selesai
        alert('Pesanan berhasil diselesaikan! Terima kasih.');

        // resetcartTotal di storage
        localStorage.removeItem('cartTotal');
        localStorage.setItem('cartTotal', '0');
    });
}
});


function getBrowserId() {
    let id = localStorage.getItem("browserId");
    if (!id) {
        id = "b-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
        localStorage.setItem("browserId", id);
    }
    return id;
}

document.addEventListener("DOMContentLoaded", function () {
    const customerName = localStorage.getItem("customerName");
    const selectedSeat = JSON.parse(localStorage.getItem("selectedSeat") || "null");
    const customerNameEl = document.getElementById("customerName");

    if (customerNameEl) {
        customerNameEl.textContent = customerName || "-";
    }

    if (selectedSeat) {
        const name = selectedSeat.name || selectedSeat.seatName || selectedSeat.id || "-";
        const capacity = Number(selectedSeat.capacity || selectedSeat.people || 1);
        const seatNameEl = document.getElementById("seatName");
        const seatCapacityEl = document.getElementById("seatCapacity");

        if (seatNameEl) {
            seatNameEl.textContent = String(name).toUpperCase();
        }
        if (seatCapacityEl) {
            seatCapacityEl.textContent = capacity === 1
                ? "Single person"
                : `Seat for ${capacity} people`;
        }
    } else {
        alert("No seat selected!");
        window.location.href = "bookseat.html";
        return;
    }

    const timeInput = document.getElementById("timeBook");
    const durationInput = document.getElementById("duration");
    const timeError = document.getElementById("timeError");
    const durationError = document.getElementById("durationError");
    const bookButton = document.getElementById("bookButton");

    function validateTime() {
        const timeValue = timeInput.value;

        if (!timeValue) {
            timeError.textContent = "Please enter booking time.";
            return false;
        }
        if (timeValue < "07:00" || timeValue > "15:00") {
            timeError.textContent = "Invalid time! Booking is only available from 07:00 to 15:00";
            return false;
        }
        timeError.textContent = "";
        return true;
    }

    function validateDuration() {
        const durationValue = durationInput.value;
        const numDuration = Number(durationValue);

        if (durationValue === "" || !Number.isInteger(numDuration)) {
            durationError.textContent = "Duration must be a valid number.";
            return false;
        }
        if (numDuration < 1 || numDuration > 120) {
            durationError.textContent = "Duration must be between 1 and 120 minutes.";
            return false;
        }
        durationError.textContent = "";
        return true;
    }

    if (timeInput) {
        timeInput.addEventListener("input", validateTime);
    }
    if (durationInput) {
        durationInput.addEventListener("input", validateDuration);
    }

    if (bookButton) {
        bookButton.addEventListener("click", function () {
            const isTimeValid = validateTime();
            const isDurationValid = validateDuration();

            if (!isTimeValid || !isDurationValid) {
                return;
            }

            let seatsData = JSON.parse(localStorage.getItem("seatsData") || "[]");
            const selectedName = selectedSeat.name || selectedSeat.seatName || selectedSeat.id;

            const seatIndex = seatsData.findIndex(function (seat) {
                if (selectedSeat.id !== undefined && seat.id === selectedSeat.id) {
                    return true;
                }
                const seatName = seat.name || seat.seatName || seat.id;
                return seatName === selectedName;
            });

            if (seatIndex === -1) {
                alert("Seat data not found!");
                return;
            }

            if (seatsData[seatIndex].available === false) {
                alert("Sorry, this seat is already unavailable.");
                window.location.href = "bookseat.html";
                return;
            }

            seatsData[seatIndex].available = false;
            seatsData[seatIndex].bookedBy = getBrowserId();          
            seatsData[seatIndex].timeBook = timeInput.value;         
            seatsData[seatIndex].duration = Number(durationInput.value); 

            localStorage.setItem("seatsData", JSON.stringify(seatsData));
            localStorage.removeItem("selectedSeat");               

            alert("Booking successfully confirmed!");
            window.location.href = "bookseat.html";
        });
    }
});
