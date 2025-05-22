document.addEventListener('DOMContentLoaded', () => {
    // Fungsi untuk mendapatkan parameter URL
    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        var results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }

    // Mengambil data dari parameter URL
    const urlOrderId = getUrlParameter('orderId');
    const urlOrderDate = getUrlParameter('orderDate');
    const urlPaymentMethod = getUrlParameter('paymentMethod');
    const urlTotalAmount = parseFloat(getUrlParameter('totalAmount'));
    const urlProductsString = getUrlParameter('products');

    let parsedProducts = [];
    try {
        if (urlProductsString) {
            parsedProducts = JSON.parse(urlProductsString);
        }
    } catch (e) {
        console.error("Error parsing products from URL:", e);
        // Jika ada kesalahan parsing, kosongkan produk agar struk tidak menampilkan data salah
        // atau Anda bisa menampilkan pesan error di UI
        parsedProducts = [];
    }

    // Menggabungkan data dari URL
    // Jika ada parameter yang kosong/tidak valid dari URL, ini akan menampilkan string kosong atau 0
    const orderData = {
        orderId: urlOrderId,
        orderDate: urlOrderDate,
        products: parsedProducts, // Langsung gunakan produk yang sudah diparse
        paymentMethod: urlPaymentMethod,
        totalAmount: urlTotalAmount
    };

    // Hitung ulang total jika tidak ada dari URL atau parsing gagal/null
    // Ini penting sebagai jaring pengaman jika totalAmount dari URL tidak terkirim atau tidak valid
    if (orderData.totalAmount <= 0 || isNaN(orderData.totalAmount) || !orderData.totalAmount) {
        orderData.totalAmount = orderData.products.reduce((sum, product) => sum + ((product.quantity || 1) * (product.price || 0)), 0);
    }

    // Mengisi informasi header struk
    document.getElementById('orderDate').textContent = orderData.orderDate || 'Tanggal Tidak Tersedia';
    document.getElementById('orderId').textContent = orderData.orderId || 'ID Tidak Tersedia';

    // Mengisi detail produk
    const productTableBody = document.querySelector('#productTable tbody');
    productTableBody.innerHTML = ''; // Kosongkan tabel sebelum mengisi

    // Jika tidak ada produk yang berhasil di-load, tampilkan pesan
    if (orderData.products.length === 0) {
        const row = productTableBody.insertRow();
        const cell = row.insertCell(0);
        cell.colSpan = 4; // Rentangkan sel agar memenuhi seluruh lebar tabel
        cell.textContent = 'Detail produk tidak dapat dimuat.';
        cell.style.textAlign = 'center';
        cell.style.fontStyle = 'italic';
        cell.style.padding = '20px';
    } else {
        orderData.products.forEach(product => {
            const row = productTableBody.insertRow();
            const subtotal = (product.quantity || 1) * (product.price || 0); // Pastikan quantity dan price ada

            row.insertCell(0).textContent = product.name || 'N/A';
            row.insertCell(1).textContent = product.quantity || 1;
            row.insertCell(2).textContent = `Rp ${(product.price || 0).toLocaleString('id-ID')}`;
            row.insertCell(3).textContent = `Rp ${subtotal.toLocaleString('id-ID')}`;
        });
    }

    // Mengisi ringkasan
    document.getElementById('totalAmount').textContent = `Rp ${orderData.totalAmount.toLocaleString('id-ID')}`;
    document.getElementById('paymentMethod').textContent = orderData.paymentMethod || 'Metode Pembayaran Tidak Tersedia';
});