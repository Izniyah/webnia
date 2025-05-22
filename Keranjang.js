document.addEventListener('DOMContentLoaded', () => {
    const cartListElement = document.getElementById('cart-list');
    const cartTotalElement = document.getElementById('cart-total');
    const cartCountElementHeader = document.getElementById('cart-count');
    const emptyCartMessage = document.getElementById('empty-cart');
    const checkoutButton = document.getElementById('checkout-button');

    // Fungsi untuk mendapatkan data keranjang dari localStorage
    function getCartItems() {
        const cartData = localStorage.getItem('cart');
        return cartData ? JSON.parse(cartData) : [];
    }

    // Fungsi untuk menyimpan data keranjang ke localStorage
    function saveCartItems(cartItems) {
        localStorage.setItem('cart', JSON.stringify(cartItems));
        updateCartDisplay();
        updateCartCountHeader();
    }

    // Fungsi untuk menghapus item dari keranjang
    function removeItem(itemId) {
        let cartItems = getCartItems();
        cartItems = cartItems.filter(item => item.id !== itemId);
        saveCartItems(cartItems);
    }

    // Fungsi untuk memperbarui tampilan item di keranjang
    function updateCartDisplay() {
        const cartItems = getCartItems();
        cartListElement.innerHTML = ''; // Kosongkan tampilan list

        if (cartItems.length === 0) {
            emptyCartMessage.style.display = 'block';
            cartTotalElement.innerHTML = 'Total: Rp <span>0</span>'; // Pastikan span ada untuk CSS
            checkoutButton.style.display = 'none';
            return;
        } else {
            emptyCartMessage.style.display = 'none';
            checkoutButton.style.display = 'block';
        }

        let totalHarga = 0;
        cartItems.forEach(item => {
            const listItem = document.createElement('li');
            // Menambahkan elemen img dan menyesuaikan struktur agar sesuai dengan CSS keranjang
            listItem.innerHTML = `
                <div class="cart-item-info">
                    <img src="https://placehold.co/80x80/e74c3c/ffffff?text=${item.name.substring(0, 3)}" alt="${item.name}">
                    <div class="item-details">
                        <div class="item-name">${item.name}</div>
                        <div class="item-price-quantity">Rp ${item.price.toLocaleString('id-ID')} x ${item.quantity || 1}</div>
                    </div>
                </div>
                <button class="remove-item" data-id="${item.id}">Hapus</button>
            `;
            cartListElement.appendChild(listItem);
            totalHarga += item.price * (item.quantity || 1);
        });

        cartTotalElement.innerHTML = `Total: Rp <span>${totalHarga.toLocaleString('id-ID')}</span>`;

        // Tambahkan event listener untuk tombol hapus
        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const itemIdToRemove = event.target.dataset.id;
                removeItem(itemIdToRemove);
            });
        });
    }

    // Fungsi untuk memperbarui tampilan jumlah item di header keranjang
    function updateCartCountHeader() {
        const cartItems = getCartItems();
        const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
        cartCountElementHeader.textContent = totalQuantity;
    }

    // Inisialisasi tampilan keranjang saat halaman dimuat
    updateCartDisplay();
    updateCartCountHeader();

    // Logika untuk tombol checkout
    checkoutButton.addEventListener('click', () => {
        const cartItems = getCartItems();
        if (cartItems.length === 0) {
            // Mengganti alert dengan pesan di UI jika keranjang kosong
            // Anda bisa membuat modal atau elemen div sementara untuk pesan ini
            // Contoh sederhana:
            alert('Keranjang Anda masih kosong. Silakan tambahkan produk terlebih dahulu.');
            return;
        }

        // 1. Buat data pesanan
        const orderId = `INV-${Date.now()}-${Math.floor(Math.random() * 1000)}`; // ID unik
        const orderDate = new Date().toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        const paymentMethod = 'Transfer Bank'; // Contoh, bisa dari form input jika ada
        let totalAmount = 0;
        const productsForReceipt = cartItems.map(item => {
            const subtotal = item.price * (item.quantity || 1);
            totalAmount += subtotal;
            return {
                name: item.name,
                quantity: item.quantity || 1,
                price: item.price,
                subtotal: subtotal // Tambahkan subtotal per item jika diperlukan di struk
            };
        });

        // 2. Encode data untuk URL
        const params = new URLSearchParams();
        params.append('orderId', orderId);
        params.append('orderDate', orderDate);
        params.append('paymentMethod', paymentMethod);
        params.append('totalAmount', totalAmount.toFixed(2)); // Format total amount
        params.append('products', JSON.stringify(productsForReceipt)); // Stringify array produk

        // 3. Kosongkan keranjang di localStorage
        localStorage.removeItem('cart');

        // 4. Arahkan ke halaman struk dengan parameter URL
        // Ganti 'Struk.html' dengan nama file struk Anda jika berbeda
        window.location.href = `Apk Prem Struk.html?${params.toString()}`;
    });
});