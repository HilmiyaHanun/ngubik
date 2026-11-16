/* ===================== DATA & HELPER ===================== */
const CONFIRM_PAGE = "bookseatconfirm.html"; // sesuaikan dengan nama file confirm kamu

const defaultSeatsData = [
    { id: 1, type: "Table", capacity: 4, available: true,  bookedBy: null },
    { id: 2, type: "Table", capacity: 4, available: true,  bookedBy: null },
    { id: 3, type: "Seat",  capacity: 1, available: true,  bookedBy: null },
    { id: 4, type: "Seat",  capacity: 1, available: false, bookedBy: "orang-lain" }
];

if (localStorage.getItem("seatsData") === null) {
    localStorage.setItem("seatsData", JSON.stringify(defaultSeatsData));
}

function getBrowserId() {
    let id = localStorage.getItem("browserId");
    if (!id) {
        id = "b-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
        localStorage.setItem("browserId", id);
    }
    return id;
}

function getSeatsData() {
    return JSON.parse(localStorage.getItem("seatsData") || "[]");
}

function saveSeatsData(seats) {
    localStorage.setItem("seatsData", JSON.stringify(seats));
}

/* ===================== HALAMAN SEAT LIST ===================== */
function renderSeats() {
    const container = document.getElementById("seatListContainer");
    if (!container) return;

    const seats = getSeatsData();
    const myId = getBrowserId();

    container.innerHTML = seats.map((seat, index) => {
        const isMine = !seat.available && seat.bookedBy === myId;

        let button;
        if (seat.available) {
            button = `<button type="button" class="book-btn" onclick="bookSeat(${index})">Book</button>`;
        } else if (isMine) {
            button = `<button type="button" class="book-btn cancel-btn" onclick="cancelSeat(${index})">Batalkan</button>`;
        } else {
            button = `<button type="button" class="book-btn" disabled>Booked</button>`;
        }

        return `
        <div class="seat-card">
            <div class="seat-info">
                <strong>${seat.type} #${seat.id}</strong>
                <p>Kapasitas: ${seat.capacity} Orang</p>
                <p>Status: <strong style="color: ${seat.available ? 'green' : 'red'};">
                    ${seat.available ? 'Tersedia' : 'Sudah Dipesan'}
                </strong></p>
            </div>
            ${button}
        </div>`;
    }).join("");
}

// Book -> simpan pilihan, pindah ke halaman confirm
function bookSeat(index) {
    const seat = getSeatsData()[index];
    if (!seat || !seat.available) return;

    localStorage.setItem("selectedSeat", JSON.stringify({
        id: seat.id,
        name: `${seat.type} #${seat.id}`,
        capacity: seat.capacity
    }));
    window.location.href = CONFIRM_PAGE;
}

// Batalkan booking milik browser ini
function cancelSeat(index) {
    const seats = getSeatsData();
    const seat = seats[index];
    if (!seat || seat.available || seat.bookedBy !== getBrowserId()) return;

    if (!confirm(`Yakin batalin ${seat.type} #${seat.id}?`)) return;

    seat.available = true;
    seat.bookedBy = null;
    delete seat.timeBook;
    delete seat.duration;
    saveSeatsData(seats);

    alert(`Booking ${seat.type} #${seat.id} berhasil dibatalkan.`);
    renderSeats();
}

/* ===================== HALAMAN HOME (NAMA) ===================== */
function initHome() {
    const nameInput = document.getElementById("name");
    const saveButton = document.getElementById("saveName");
    if (nameInput && saveButton) {
        const savedName = localStorage.getItem("customerName");
        if (savedName !== null) nameInput.value = savedName;

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

    document.querySelectorAll(".navigation").forEach(function (button) {
        button.addEventListener("click", function (event) {
            const customerName = localStorage.getItem("customerName");
            if (customerName === null || customerName.trim() === "") {
                event.preventDefault();
                alert("Silahkan simpan nama terlebih dahulu!");
            }
        });
    });
}

/* ===================== MENU ===================== */
const menuData = {
    food: [
        { id: "f1", name: "Nasi Goreng Spesial", price: 20000, qty: 0 },
        { id: "f2", name: "Mie Goreng Seafood",  price: 25000, qty: 0 },
        { id: "f3", name: "Chicken Katsu Curry", price: 18000, qty: 0 }
    ],
    drink: [
        { id: "d1", name: "Es Teh Manis", price: 3000,  qty: 0 },
        { id: "d2", name: "Es Jeruk",     price: 5000,  qty: 0 },
        { id: "d3", name: "Jus Buah",     price: 10000, qty: 0 }
    ]
};

function formatRupiah(amount) {
    return "Rp " + amount.toLocaleString("id-ID");
}

function menuRows(category) {
    return menuData[category].map((item, index) => `
        <tr>
            <td class="name">${item.name}</td>
            <td class="price">${formatRupiah(item.price)}</td>
            <td class="qty">
                <button onclick="updateQty('${category}', ${index}, -1)">-</button>
                <span>${item.qty}</span>
                <button onclick="updateQty('${category}', ${index}, 1)">+</button>
            </td>
        </tr>
    `).join("");
}

function renderMenu() {
    const foodListEl = document.getElementById("foodList");
    const drinkListEl = document.getElementById("drinkList");
    if (!foodListEl || !drinkListEl) return;

    foodListEl.innerHTML = menuRows("food");
    drinkListEl.innerHTML = menuRows("drink");
    updateTotal();
}

function updateQty(category, index, change) {
    if (menuData[category][index].qty + change >= 0) {
        menuData[category][index].qty += change;
        renderMenu();
    }
}

function updateTotal() {
    let total = 0;
    menuData.food.forEach(item => { total += item.price * item.qty; });
    menuData.drink.forEach(item => { total += item.price * item.qty; });

    const totalDisplay = document.getElementById("totalDisplay");
    if (totalDisplay) totalDisplay.innerText = formatRupiah(total);

    window.cartTotal = total;
}

function initMenu() {
    if (!document.getElementById("foodList")) return;

    renderMenu();
    const nextBtn = document.querySelector(".sub-navigation");
    if (nextBtn) {
        nextBtn.addEventListener("click", function () {
            localStorage.setItem("cartTotal", window.cartTotal || 0);
            localStorage.setItem("cartData", JSON.stringify(menuData));
        });
    }
}

/* ===================== PICK-UP & PEMBAYARAN ===================== */
function initPickup() {
    const pickupTimeInput = document.getElementById("pickupTime");
    if (!pickupTimeInput) return;

    const timeStatus = document.getElementById("timeStatus");
    const radioCash = document.getElementById("radioCash");
    const radioQris = document.getElementById("radioQris");
    const labelCash = document.getElementById("labelCash");
    const labelQris = document.getElementById("labelQris");

    function setPaymentLocked(isLocked) {
        if (!radioCash || !radioQris) return;
        radioCash.disabled = isLocked;
        radioQris.disabled = isLocked;

        const opacity = isLocked ? "0.5" : "1";
        const cursor = isLocked ? "not-allowed" : "pointer";
        [labelCash, labelQris].forEach(function (label) {
            if (label) {
                label.style.opacity = opacity;
                label.style.cursor = cursor;
            }
        });
    }

    setPaymentLocked(true);

    pickupTimeInput.addEventListener("input", function () {
        const timeValue = pickupTimeInput.value;

        if (!timeValue) {
            timeStatus.innerText = "";
            timeStatus.style.color = "black";
            setPaymentLocked(true);
            return;
        }

        if (timeValue >= "07:00" && timeValue <= "15:00") {
            timeStatus.innerText = "✓ Jam pick-up valid";
            timeStatus.style.color = "green";
            setPaymentLocked(false);
        } else {
            timeStatus.innerText = "✕ Jam pick-up harus antara 07:00 - 15:00";
            timeStatus.style.color = "red";
            setPaymentLocked(true);
            radioCash.checked = false;
            radioQris.checked = false;
        }
    });

    const doneButton = document.querySelector(".sub-navigation");
    if (doneButton) {
        doneButton.addEventListener("click", function (e) {
            const timeValue = pickupTimeInput.value;
            if (!timeValue || timeValue < "07:00" || timeValue > "15:00") {
                e.preventDefault();
                alert("Silahkan pilih jam pick-up yang valid (07:00 - 15:00) terlebih dahulu!");
                return;
            }
            alert("Pesanan berhasil diselesaikan! Terima kasih.");
            localStorage.setItem("cartTotal", "0");
        });
    }
}

/* ===================== HALAMAN CONFIRM SEAT ===================== */
function initConfirm() {
    const bookButton = document.getElementById("bookButton");
    if (!bookButton) return; // bukan halaman confirm

    const customerName = localStorage.getItem("customerName");
    const selectedSeat = JSON.parse(localStorage.getItem("selectedSeat") || "null");

    if (!selectedSeat) {
        alert("No seat selected!");
        window.location.href = "bookseat.html";
        return;
    }

    const customerNameEl = document.getElementById("customerName");
    if (customerNameEl) customerNameEl.textContent = customerName || "-";

    const name = selectedSeat.name || selectedSeat.seatName || selectedSeat.id || "-";
    const capacity = Number(selectedSeat.capacity || selectedSeat.people || 1);
    const seatNameEl = document.getElementById("seatName");
    const seatCapacityEl = document.getElementById("seatCapacity");
    if (seatNameEl) seatNameEl.textContent = String(name).toUpperCase();
    if (seatCapacityEl) {
        seatCapacityEl.textContent = capacity === 1 ? "Single person" : `Seat for ${capacity} people`;
    }

    const timeInput = document.getElementById("timeBook");
    const durationInput = document.getElementById("duration");
    const timeError = document.getElementById("timeError");
    const durationError = document.getElementById("durationError");

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

    timeInput.addEventListener("input", validateTime);
    durationInput.addEventListener("input", validateDuration);

    bookButton.addEventListener("click", function () {
        const isTimeValid = validateTime();
        const isDurationValid = validateDuration();
        if (!isTimeValid || !isDurationValid) return;

        const seatsData = getSeatsData();
        const seatIndex = seatsData.findIndex(seat => seat.id === selectedSeat.id);

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

        saveSeatsData(seatsData);
        localStorage.removeItem("selectedSeat");

        alert("Booking successfully confirmed!");
        window.location.href = "bookseat.html";
    });
}

/* ===================== JALANKAN SEMUA ===================== */
document.addEventListener("DOMContentLoaded", function () {
    // tampilkan nama & total (kalau elemennya ada di halaman)
    const displayCustomerName = document.getElementById("displayCustomerName");
    const displayCartTotal = document.getElementById("displayCartTotal");
    if (displayCustomerName) {
        displayCustomerName.innerText = localStorage.getItem("customerName") || "Tamu";
    }
    if (displayCartTotal) {
        displayCartTotal.innerText = formatRupiah(Number(localStorage.getItem("cartTotal") || 0));
    }

    initHome();
    renderSeats();
    initMenu();
    initPickup();
    initConfirm();
});
