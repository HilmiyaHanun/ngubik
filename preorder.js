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
