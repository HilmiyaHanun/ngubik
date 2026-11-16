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
                onclick="${seat.available ? `bookSeat(${index})` : `unbookSeat(${seat.id})`}"
            >
                ${seat.available ? 'Book' : 'Unbook'}
            </button>
        </div>
    `).join('');
}

// Fungsi saat tombol Book diklik -> simpan kursi & pindah ke halaman konfirmasi
function bookSeat(index) {
    const seats = getSeatsData();
    const seat = seats[index];

    if (seat && seat.available) {
        const selectedSeatData = {
            ...seat,
            name: `${seat.type} #${seat.id}`
        };
        localStorage.setItem("selectedSeat", JSON.stringify(selectedSeatData));

        // Sesuaikan nama file di bawah ini dengan nama file halaman konfirmasimu
        window.location.href = "bookseat-confirm.html";
    }
}

// Fungsi saat tombol Unbook diklik -> kembalikan status kursi menjadi tersedia
function unbookSeat(seatId) {
    let seatsData = getSeatsData();
    const index = seatsData.findIndex(s => s.id === seatId);
    if (index !== -1) {
        seatsData[index].available = true;
        localStorage.setItem("seatsData", JSON.stringify(seatsData));
        renderSeats();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderSeats();
});
