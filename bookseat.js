const fallbackSeats = [
    { id: 1, type: "Table", capacity: 4, available: true },
    { id: 2, type: "Table", capacity: 4, available: true },
    { id: 3, type: "Seat", capacity: 1, available: true },
    { id: 4, type: "Seat", capacity: 1, available: false }
];

// Ambil data kursi dari localStorage
function getSeatsData() {
    const stored = localStorage.getItem("seatsData");
    if (!stored) {
        localStorage.setItem("seatsData", JSON.stringify(fallbackSeats));
        return fallbackSeats;
    }
    return JSON.parse(stored);
}

// Render daftar kursi ke halaman
function renderSeats() {
    const container = document.getElementById("seatListContainer");
    if (!container) return;

    const seats = getSeatsData();

    container.innerHTML = seats.map((seat, index) => `
        <div class="seat-card">
            <div class="seat-info">
                <strong>${seat.type} #${seat.id}</strong>
                <p>Kapasitas: ${seat.capacity} Orang</p>
                <p>Status: <strong style="color: ${seat.available ? 'green' : 'red'};">
                    ${seat.available ? 'Tersedia' : 'Sudah Dipesan'}
                </strong></p>
            </div>
            <button 
                type="button" 
                class="book-btn" 
                onclick="bookSeat(${index})"
                ${seat.available ? '' : 'disabled'}
            >
                ${seat.available ? 'Book' : 'Booked'}
            </button>
        </div>
    `).join('');
}

// Fungsi saat tombol Book diklik
function bookSeat(index) {
    const seats = getSeatsData();
    const customerName = localStorage.getItem("customerName") || "Tamu";

    if (seats[index].available) {
        seats[index].available = false;
        localStorage.setItem("seatsData", JSON.stringify(seats));
        alert(`${seats[index].type} #${seats[index].id} berhasil dipesan atas nama ${customerName}!`);
        renderSeats();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderSeats();
});
