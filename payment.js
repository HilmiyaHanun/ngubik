document.addEventListener('DOMContentLoaded', () => {
    const customerName = localStorage.getItem('customerName') || 'Tamu';
    const cartTotal = localStorage.getItem('cartTotal') || '0';

    const displayCustomerName = document.getElementById('displayCustomerName');
    const displayCartTotal = document.getElementById('displayCartTotal');

    if (displayCustomerName) {
        displayCustomerName.innerText = customerName;
    }

    if (displayCartTotal) {
        const formattedTotal = 'Rp ' + Number(cartTotal).toLocaleString('id-ID');
        displayCartTotal.innerText = formattedTotal;
    }

    // Validasi jam ambil
    const pickupTimeInput = document.getElementById('pickupTime');
    const timeStatus = document.getElementById('timeStatus');
    const radioCash = document.getElementById('radioCash');
    const radioQris = document.getElementById('radioQris');
    const labelCash = document.getElementById('labelCash');
    const labelQris = document.getElementById('labelQris');

    function setPaymentLocked(isLocked) {
        if (radioCash && radioQris) {
            radioCash.disabled = isLocked;
            radioQris.disabled = isLocked;

            if (isLocked) {
                labelCash.style.opacity = '0.5';
                labelQris.style.opacity = '0.5';
                labelCash.style.cursor = 'not-allowed';
                labelQris.style.cursor = 'not-allowed';
            } else {
                labelCash.style.opacity = '1';
                labelQris.style.opacity = '1';
                labelCash.style.cursor = 'pointer';
                labelQris.style.cursor = 'pointer';
            }
        }
    }

    setPaymentLocked(true);

    if (pickupTimeInput) {
        pickupTimeInput.addEventListener('input', () => {
            const timeValue = pickupTimeInput.value; // format HH:MM

            if (!timeValue) {
                timeStatus.innerText = '';
                setPaymentLocked(true);
                return;
            }

            if (timeValue >= '07:00' && timeValue <= '15:00') {
                timeStatus.innerText = '✓ Jam pick-up valid';
                timeStatus.style.color = 'green';
                setPaymentLocked(false);
            } else {
                timeStatus.innerText = '✕ Jam pick-up harus antara 07:00 - 15:00';
                timeStatus.style.color = 'red';
                setPaymentLocked(true);

                radioCash.checked = false;
                radioQris.checked = false;
            }
        });
    }

    // Tombol DONE
    const doneButton = document.getElementById('doneBtn');
    if (doneButton) {
        doneButton.addEventListener('click', (e) => {
            const timeValue = pickupTimeInput.value;
            if (!timeValue || timeValue < '07:00' || timeValue > '15:00') {
                e.preventDefault();
                alert('Silahkan pilih jam pick-up yang valid (07:00 - 15:00) terlebih dahulu!');
                return;
            }

            if (!radioCash.checked && !radioQris.checked) {
                e.preventDefault();
                alert('Silahkan pilih metode pembayaran (Cash atau QRIS)!');
                return;
            }

            alert(`Pesanan atas nama ${customerName} berhasil diselesaikan! Terima kasih.`);
            localStorage.setItem('cartTotal', '0');
        });
    }
});
