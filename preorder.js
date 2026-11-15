const menuData = {
    food: [
        { id: 'f1', name: 'Nasi Goreng Spesial', price: 20000, qty: 0 },
        { id: 'f2', name: 'Mie Goreng Seafood', price: 25000, qty: 0 },
        { id: 'f3', name: 'Chicken Katsu Curry', price: 18000, qty: 0 }
    ],
    drink: [
        { id: 'd1', name: 'Es Teh Manis', price: 3000, qty: 0 },
        { id: 'd2', name: 'Es Jeruk', price: 5000, qty: 0 },
        { id: 'd3', name: 'Jus Buah', price: 10000, qty: 0 }
    ]
};

function formatRupiah(amount) {
    return 'Rp ' + amount.toLocaleString('id-ID');
}

function renderMenu() {
    const foodListEl = document.getElementById('foodList');
    const drinkListEl = document.getElementById('drinkList');

    if (!foodListEl || !drinkListEl) return;

    foodListEl.innerHTML = menuData.food.map((item, index) => `
        <tr>
            <td class="name">${item.name}</td>
            <td class="price">${formatRupiah(item.price)}</td>
            <td class="qty">
                <button type="button" onclick="updateQty('food', ${index}, -1)">-</button>
                <span>${item.qty}</span>
                <button type="button" onclick="updateQty('food', ${index}, 1)">+</button>
            </td>
        </tr>
    `).join('');

    drinkListEl.innerHTML = menuData.drink.map((item, index) => `
        <tr>
            <td class="name">${item.name}</td>
            <td class="price">${formatRupiah(item.price)}</td>
            <td class="qty">
                <button type="button" onclick="updateQty('drink', ${index}, -1)">-</button>
                <span>${item.qty}</span>
                <button type="button" onclick="updateQty('drink', ${index}, 1)">+</button>
            </td>
        </tr>
    `).join('');

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

    menuData.food.forEach(item => {
        total += item.price * item.qty;
    });

    menuData.drink.forEach(item => {
        total += item.price * item.qty;
    });

    const totalDisplay = document.getElementById('totalDisplay');
    if (totalDisplay) {
        totalDisplay.innerText = formatRupiah(total);
    }

    window.cartTotal = total;
}

document.addEventListener('DOMContentLoaded', () => {
    renderMenu();

    const nextBtn = document.querySelector('.sub-navigation');
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            if (!window.cartTotal || window.cartTotal === 0) {
                e.preventDefault();
                alert('Silahkan pilih minimal 1 makanan atau minuman terlebih dahulu!');
                return;
            }
            localStorage.setItem('cartTotal', window.cartTotal);
            localStorage.setItem('cartData', JSON.stringify(menuData));
        });
    }
});
