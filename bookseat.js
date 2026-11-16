// 1. GANTI BAGIAN TOMBOL DI DALAM renderSeats()
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
                onclick="${seat.available ? `bookSeat(${index})` : `unbookSeat(${index})`}"
            >
                ${seat.available ? 'Book' : 'Unbook'}
            </button>
        </div>
    `).join('');
}

// 2. GANTI FUNGSI bookSeat(index) AGAR PINDAH KE HALAMAN KONFIRMASI
function bookSeat(index) {
    const seats = getSeatsData();
    const seat = seats[index];

    if (seat && seat.available) {
        localStorage.setItem("selectedSeat", JSON.stringify({
            ...seat,
            name: seat.name || `${seat.type} #${seat.id}`
        }));

        // PENTING: Ganti "confirm.html" sesuai nama file halaman konfirmasimu!
        window.location.href = "bookseat-confirm.html";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderSeats();
});

// 3. GANTI FUNGSI unbookSeat MENGGUNAKAN index
function unbookSeat(index) {
    const seatsData = getSeatsData();
    if (seatsData[index]) {
        seatsData[index].available = true;
        localStorage.setItem("seatsData", JSON.stringify(seatsData));
        renderSeats();
    }
}
