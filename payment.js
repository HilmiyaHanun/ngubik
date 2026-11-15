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