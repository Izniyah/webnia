document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCountElement = document.getElementById('cart-count');

    // Fungsi untuk mendapatkan data keranjang dari localStorage
    function getCartItems() {
        const cartData = localStorage.getItem('cart');
        return cartData ? JSON.parse(cartData) : [];
    }

    // Fungsi untuk menyimpan data keranjang ke localStorage
    function saveCartItems(cartItems) {
        localStorage.setItem('cart', JSON.stringify(cartItems));
        updateCartCount();
    }

    // Fungsi untuk menambahkan item ke keranjang
    function addToCart(event) {
        const button = event.target;
        const appId = button.dataset.id;
        const appName = button.dataset.name;
        const appPrice = parseFloat(button.dataset.price);

        const cartItems = getCartItems();
        const existingItem = cartItems.find(item => item.id === appId);

        if (existingItem) {
            existingItem.quantity = (existingItem.quantity || 0) + 1;
            showNotification(`${appName} (x${existingItem.quantity}) telah ditambahkan ke keranjang!`);
        } else {
            cartItems.push({ id: appId, name: appName, price: appPrice, quantity: 1 });
            showNotification(`${appName} telah ditambahkan ke keranjang!`);
        }

        saveCartItems(cartItems);
    }

    // Fungsi untuk menampilkan notifikasi
    function showNotification(message) {
        const notificationDiv = document.createElement('div');
        notificationDiv.classList.add('notification');
        notificationDiv.textContent = message;
        document.body.appendChild(notificationDiv);

        // Hapus notifikasi setelah beberapa detik
        setTimeout(() => {
            notificationDiv.remove();
        }, 3000); // Notifikasi akan hilang setelah 3 detik (3000 milidetik)
    }

    // Fungsi untuk memperbarui tampilan jumlah item di keranjang
    function updateCartCount() {
        const cartItems = getCartItems();
        const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
        cartCountElement.textContent = totalQuantity;
    }

    // Event listener untuk tombol "Tambah ke Keranjang"
    addToCartButtons.forEach(button => {
        button.addEventListener('click', addToCart);
    });

    // Inisialisasi tampilan jumlah item di keranjang saat halaman dimuat
    updateCartCount();
});