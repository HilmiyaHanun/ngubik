const fallbackSeats = [
    { id: 1, type: "Table", capacity: 4, available: true, bookedBy: null },
    { id: 2, type: "Table", capacity: 4, available: true, bookedBy: null },
    { id: 3, type: "Seat", capacity: 1, available: true, bookedBy: null },
    { id: 4, type: "Seat", capacity: 1, available: false, bookedBy: "orang-lain" }
];


function getBrowserId() {
    let id = localStorage.getItem("browserId");
    if (!id) {
        id = "b-" + Date.now() + "-" + Math.random().toString(36).slice(2, 8);
        localStorage.setItem("browserId", id);
    }
    return id;
}


function getSeatsData() {
    const stored = localStorage.getItem("seatsData");
    if (!stored) {
        localStorage.setItem("seatsData", JSON.stringify(fallbackSeats));
        return fallbackSeats;
    }
    return JSON.parse(stored);
}


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
    }).join('');
}

function bookSeat(index) {
    const seats = getSeatsData();
    const customerName = localStorage.getItem("customerName") || "Tamu";

    if (seats[index].available) {
        seats[index].available = false;
        seats[index].bookedBy = getBrowserId();   
        localStorage.setItem("seatsData", JSON.stringify(seats));
        alert(`${seats[index].type} #${seats[index].id} berhasil dipesan atas nama ${customerName}!`);
        renderSeats();
    }
}


function cancelSeat(index) {
    const seats = getSeatsData();


    if (!seats[index].available && seats[index].bookedBy === getBrowserId()) {
        if (!confirm(`Yakin batalin ${seats[index].type} #${seats[index].id}?`)) return;

        seats[index].available = true;
        seats[index].bookedBy = null;
        localStorage.setItem("seatsData", JSON.stringify(seats));
        alert(`Booking ${seats[index].type} #${seats[index].id} berhasil dibatalkan.`);
        renderSeats();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderSeats();
});
