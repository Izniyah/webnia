document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah form submit default
        validateLogin();
    });

    function validateLogin() {
        let isValid = true;

        // Validasi Email
        if (emailInput.value.trim() === '') {
            displayError(emailError, 'Email tidak boleh kosong.');
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            displayError(emailError, 'Format email tidak valid.');
            isValid = false;
        } else {
            clearError(emailError);
        }

        // Validasi Kata Sandi
        if (passwordInput.value === '') {
            displayError(passwordError, 'Kata sandi tidak boleh kosong.');
            isValid = false;
        } else {
            clearError(passwordError);
        }

        if (isValid) {
            // Di sini Anda bisa menambahkan logika untuk mengirim data login ke server
            // Misalnya menggunakan fetch API untuk mengirim data ke backend
            // Setelah berhasil login, Anda bisa mengarahkan pengguna ke halaman utama
            alert('Login berhasil!'); // Contoh sederhana
            window.location.href = 'Apk Prem Home.html';
        }
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function displayError(element, message) {
        element.textContent = message;
    }

    function clearError(element) {
        element.textContent = '';
    }
});