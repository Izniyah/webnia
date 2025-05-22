document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const usernameError = document.getElementById('usernameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Mencegah form submit default
        validateForm();
    });

    function validateForm() {
        let isValid = true;

        // Validasi Nama Pengguna
        if (usernameInput.value.trim() === '') {
            displayError(usernameError, 'Nama pengguna tidak boleh kosong.');
            isValid = false;
        } else {
            clearError(usernameError);
        }

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
        } else if (passwordInput.value.length < 6) {
            displayError(passwordError, 'Kata sandi minimal 6 karakter.');
            isValid = false;
        } else {
            clearError(passwordError);
        }

        // Validasi Konfirmasi Kata Sandi
        if (confirmPasswordInput.value === '') {
            displayError(confirmPasswordError, 'Konfirmasi kata sandi tidak boleh kosong.');
            isValid = false;
        } else if (confirmPasswordInput.value !== passwordInput.value) {
            displayError(confirmPasswordError, 'Konfirmasi kata sandi tidak sesuai.');
            isValid = false;
        } else {
            clearError(confirmPasswordError);
        }

        if (isValid) {
            // Di sini Anda bisa menambahkan logika untuk mengirim data pendaftaran ke server
            // Setelah berhasil (simulasi berhasil), alihkan ke halaman login
            window.location.href = 'Apk Prem Login.html';
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