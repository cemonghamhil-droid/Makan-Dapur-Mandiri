// Variabel Tempat Menyimpan Pesanan & Konfigurasi
const WA_PHONE = "6281574921996";
const menuData = [
    {
        "id": 1,
        "name": "Nasi Goreng Spesial",
        "price": 25000,
        "desc": "Dengan telor ceplok, ayam suwir & kerupuk",
        "category": "Makanan Utama",
        "img": "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=500&q=80"
    },
    {
        "id": 2,
        "name": "Ayam Bakar Madu",
        "price": 30000,
        "desc": "Ayam kampung bakar empuk bumbu madu",
        "category": "Makanan Utama",
        "img": "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=500&q=80"
    },
    {
        "id": 3,
        "name": "Sate Ayam Madura",
        "price": 28000,
        "desc": "10 tusuk sate ayam daging tebal bumbu kacang",
        "category": "Makanan Utama",
        "img": "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?w=500&q=80"
    },
    {
        "id": 4,
        "name": "Es Teh Manis Jumbo",
        "price": 3000,
        "desc": "Teh melati segar rasa mantap",
        "category": "Minuman",
        "img": "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80"
    },
    {
        "id": 5,
        "name": "Es Jeruk Peras",
        "price": 8000,
        "desc": "Jeruk peras murni kaya vitamin C",
        "category": "Minuman",
        "img": "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=500&q=80"
    }
];

let cart = [];

function addToCart(itemId) {
    const item = menuData.find(m => m.id === itemId);
    if (!item) return;

    const existingIndex = cart.findIndex(c => c.id === itemId);
    if (existingIndex > -1) {
        cart[existingIndex].qty += 1;
    } else {
        cart.push({ ...item, qty: 1 });
    }

    renderCart();
    toggleCartDrawer(true);
}

function renderCart() {
    const container = document.getElementById('cart-items');
    const badge = document.getElementById('cart-badge');
    const totalEl = document.getElementById('cart-total');

    if (cart.length === 0) {
        container.innerHTML = '<p class="text-center text-slate-400 text-sm py-8">Keranjang belanjaan masih kosong.</p>';
        badge.classList.add('hidden');
        totalEl.innerText = 'Rp 0';
        return;
    }

    const totalQty = cart.reduce((acc, i) => acc + i.qty, 0);
    badge.innerText = totalQty;
    badge.classList.remove('hidden');

    let totalHarga = 0;
    container.innerHTML = cart.map(item => {
        const itemTotal = item.price * item.qty;
        totalHarga += itemTotal;
        return `
        <div class="flex justify-between items-center border-b border-slate-100 pb-2">
            <div>
                <h4 class="font-bold text-xs text-slate-800">${item.name}</h4>
                <p class="text-[11px] text-slate-500">${item.qty} x Rp ${item.price.toLocaleString('id-ID')}</p>
            </div>
            <span class="font-bold text-xs text-slate-800">Rp ${itemTotal.toLocaleString('id-ID')}</span>
        </div>
        `;
    }).join('');

    totalEl.innerText = 'Rp ' + totalHarga.toLocaleString('id-ID');
}

function toggleCartDrawer(open) {
    const drawer = document.getElementById('cart-drawer');
    if (open === true) {
        drawer.classList.remove('hidden');
    } else if (open === false) {
        drawer.classList.add('hidden');
    } else {
        drawer.classList.toggle('hidden');
    }
}

function checkoutToWhatsApp() {
    const name = document.getElementById('cust-name').value.trim();
    const address = document.getElementById('cust-address').value.trim();

    if (cart.length === 0) {
        alert('Keranjang belanja kamu masih kosong!');
        return;
    }
    if (!name || !address) {
        alert('Harap isi Nama dan Alamat Pengiriman terlebih dahulu!');
        return;
    }

    let message = `Halo, saya mau pesan makanan dari Dapur Mandiri:\n\n`;
    let total = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.qty;
        total += subtotal;
        message += `- ${item.name} (${item.qty}x) = Rp ${subtotal.toLocaleString('id-ID')}\n`;
    });

    message += `\n*Total: Rp ${total.toLocaleString('id-ID')}*\n\n`;
    message += `*Data Pemesan:*\nNama: ${name}\nAlamat: ${address}`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WA_PHONE}?text=${encoded}`, '_blank');
}