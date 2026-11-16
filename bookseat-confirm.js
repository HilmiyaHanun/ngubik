
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
