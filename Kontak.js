document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formMessage = document.getElementById('formMessage');

    // Fungsi placeholder untuk memperbarui jumlah keranjang di header
    // (Anda harus mengintegrasikan ini dengan logika keranjang Anda yang sebenarnya)
    function updateCartCountHeader() {
        const cartCountElementHeader = document.getElementById('cart-count');
        // Contoh: ambil dari localStorage jika ada
        const cartData = localStorage.getItem('cart');
        const cartItems = cartData ? JSON.parse(cartData) : [];
        const totalQuantity = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
        cartCountElementHeader.textContent = totalQuantity;
    }

    // Panggil saat halaman dimuat
    updateCartCountHeader();

    contactForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Mencegah form untuk submit secara default

        // Nonaktifkan tombol dan tampilkan pesan loading
        submitBtn.disabled = true;
        submitBtn.textContent = 'Mengirim...';
        formMessage.textContent = ''; // Hapus pesan sebelumnya
        formMessage.className = 'message-status'; // Reset class

        // Ambil data dari form
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };

        // --- Simulasi Pengiriman Data (Ganti dengan AJAX/Fetch ke Backend Anda) ---
        // Dalam aplikasi nyata, Anda akan menggunakan fetch() atau XMLHttpRequest
        // untuk mengirim data ini ke server backend (misalnya, PHP, Node.js, Python, dll.)
        // yang akan menangani pengiriman email atau penyimpanan data.

        console.log("Data Formulir Dikirim:", formData);

        // Simulasi penundaan pengiriman 2 detik
        setTimeout(() => {
            const success = Math.random() > 0.1; // 90% sukses, 10% gagal untuk contoh

            if (success) {
                formMessage.textContent = 'Pesan Anda berhasil terkirim! Kami akan segera menghubungi Anda.';
                formMessage.classList.add('success');
                contactForm.reset(); // Kosongkan form setelah sukses
            } else {
                formMessage.textContent = 'Maaf, terjadi kesalahan saat mengirim pesan Anda. Silakan coba lagi nanti.';
                formMessage.classList.add('error');
            }

            // Aktifkan kembali tombol
            submitBtn.disabled = false;
            submitBtn.textContent = 'Kirim Pesan';
        }, 2000); // Simulasi 2 detik
    });
});