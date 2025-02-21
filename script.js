// script.js
document.addEventListener('DOMContentLoaded', () => {
    const auth = firebase.auth();
    const googleProvider = new firebase.auth.GoogleAuthProvider();

    const togglePassword = document.querySelector('#togglePassword');
    const password = document.querySelector('#password');
    const toggleRegisterPassword = document.querySelector('#toggleRegisterPassword');
    const registerPassword = document.querySelector('#registerPassword');
    const toggleConfirmPassword = document.querySelector('#toggleConfirmPassword');
    const confirmPassword = document.querySelector('#confirmPassword');
    const showRegisterForm = document.querySelector('#showRegisterForm');
    const showLoginForm = document.querySelector('#showLoginForm');
    const loginForm = document.querySelector('#loginForm');
    const registerForm = document.querySelector('#registerForm');
    const passwordError = document.querySelector('#passwordError');
    const registerError = document.querySelector('#registerError');
    const loginError = document.querySelector('#loginError');
    const registrationForm = document.querySelector('#registrationForm');
    const loginFormSubmit = document.querySelector('#loginFormSubmit');
    const toggleDarkMode = document.querySelector('#toggleDarkMode');
    const toggleLanguage = document.querySelector('#toggleLanguage');
    const htmlRoot = document.querySelector('#htmlRoot');
    const googleSignIn = document.querySelector('#googleSignIn');
    const googleSignUp = document.querySelector('#googleSignUp');

    function togglePasswordVisibility(input, toggle) {
        if (input && toggle) {
            toggle.addEventListener('click', () => {
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                toggle.classList.toggle('fa-eye-slash');
            });
        }
    }
    togglePasswordVisibility(password, togglePassword);
    togglePasswordVisibility(registerPassword, toggleRegisterPassword);
    togglePasswordVisibility(confirmPassword, toggleConfirmPassword);

    if (showRegisterForm) {
        showRegisterForm.addEventListener('click', () => {
            loginForm.classList.add('hidden');
            registerForm.classList.remove('hidden');
            registerForm.style.animation = 'slideIn 0.5s ease forwards';
        });
    }
    if (showLoginForm) {
        showLoginForm.addEventListener('click', () => {
            registerForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
            loginForm.style.animation = 'slideIn 0.5s ease forwards';
        });
    }

    if (confirmPassword) {
        confirmPassword.addEventListener('input', () => {
            if (registerPassword.value !== confirmPassword.value) {
                passwordError.classList.remove('hidden');
            } else {
                passwordError.classList.add('hidden');
            }
        });
    }

    if (loginFormSubmit) {
        loginFormSubmit.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.querySelector('#loginEmail').value;
            const password = document.querySelector('#password').value;
            const submitButton = loginFormSubmit.querySelector('button');
            submitButton.disabled = true;
            submitButton.textContent = currentLang === 'ar' ? 'جارٍ التحميل...' : 'Loading...';

            if (!email || !password) {
                loginError.classList.remove('hidden');
                loginError.textContent = currentLang === 'ar' ? 'يرجى إدخال البريد وكلمة المرور' : 'Please enter email and password';
                submitButton.disabled = false;
                submitButton.textContent = currentLang === 'ar' ? 'تسجيل الدخول' : 'Login';
                return;
            }

            try {
                const userCredential = await auth.signInWithEmailAndPassword(email, password);
                console.log('تم تسجيل الدخول بنجاح:', userCredential.user);
                window.location.href = 'dashboard.html';
            } catch (error) {
                loginError.classList.remove('hidden');
                loginError.textContent = currentLang === 'ar' ? 
                    (error.code === 'auth/wrong-password' ? 'كلمة المرور غير صحيحة' : 
                     error.code === 'auth/user-not-found' ? 'المستخدم غير موجود' : 
                     error.message) : 
                    error.message;
                console.error('خطأ في تسجيل الدخول:', error.code, error.message);
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = currentLang === 'ar' ? 'تسجيل الدخول' : 'Login';
            }
        });
    }

    if (registrationForm) {
        registrationForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const firstName = document.querySelector('#firstName').value;
            const lastName = document.querySelector('#lastName').value;
            const email = document.querySelector('#registerEmail').value;
            const password = registerPassword.value;
            const confirmPasswordVal = confirmPassword.value;
            const submitButton = registrationForm.querySelector('button');
            submitButton.disabled = true;
            submitButton.textContent = currentLang === 'ar' ? 'جارٍ التحميل...' : 'Loading...';

            if (!email || !password || !firstName || !lastName) {
                registerError.classList.remove('hidden');
                registerError.textContent = currentLang === 'ar' ? 'يرجى ملء جميع الحقول' : 'Please fill all fields';
                submitButton.disabled = false;
                submitButton.textContent = currentLang === 'ar' ? 'تسجيل' : 'Register';
                return;
            }

            if (password !== confirmPasswordVal) {
                passwordError.classList.remove('hidden');
                submitButton.disabled = false;
                submitButton.textContent = currentLang === 'ar' ? 'تسجيل' : 'Register';
                return;
            }

            try {
                const userCredential = await auth.createUserWithEmailAndPassword(email, password);
                console.log('تم إنشاء الحساب بنجاح:', userCredential.user);
                window.location.href = 'dashboard.html';
            } catch (error) {
                registerError.classList.remove('hidden');
                registerError.textContent = currentLang === 'ar' ? 
                    (error.code === 'auth/email-already-in-use' ? 'البريد الإلكتروني مستخدم بالفعل' : error.message) : 
                    error.message;
                console.error('خطأ في إنشاء الحساب:', error.code, error.message);
            } finally {
                submitButton.disabled = false;
                submitButton.textContent = currentLang === 'ar' ? 'تسجيل' : 'Register';
            }
        });
    }

    function handleGoogleAuth(button, actionText, errorElement) {
        button.addEventListener('click', async () => {
            button.disabled = true;
            const originalText = button.querySelector('span').textContent;
            button.querySelector('span').textContent = currentLang === 'ar' ? 'جارٍ التحميل...' : 'Loading...';

            try {
                const result = await auth.signInWithPopup(googleProvider);
                console.log(`${actionText} باستخدام Google:`, result.user);
                window.location.href = 'dashboard.html';
            } catch (error) {
                errorElement.classList.remove('hidden');
                errorElement.textContent = currentLang === 'ar' ?
                    (error.code === 'auth/popup-blocked' ? 'تم حظر النافذة المنبثقة، الرجاء السماح بها' : error.message) :
                    error.message;
                console.error(`خطأ في ${actionText} عبر Google:`, error.code, error.message);
            } finally {
                button.disabled = false;
                button.querySelector('span').textContent = originalText;
            }
        });
    }

    if (googleSignIn) handleGoogleAuth(googleSignIn, 'تسجيل الدخول', loginError);
    if (googleSignUp) handleGoogleAuth(googleSignUp, 'التسجيل', registerError);

    let currentLang = localStorage.getItem('language') || 'ar';
    if (toggleDarkMode) {
        const isDark = localStorage.getItem('darkMode') === 'true';
        if (isDark) {
            document.body.classList.add('dark-mode');
            toggleDarkMode.innerHTML = '<i class="fas fa-sun"></i>';
        }
        toggleDarkMode.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            toggleDarkMode.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            localStorage.setItem('darkMode', isDark);
            updateTextContent();
        });
    }

    const eyeIcons = [togglePassword, toggleRegisterPassword, toggleConfirmPassword];
    if (toggleLanguage) {
        htmlRoot.setAttribute('lang', currentLang);
        htmlRoot.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
        toggleLanguage.textContent = currentLang === 'ar' ? 'EN' : 'AR';
        updateTextContent();

        toggleLanguage.addEventListener('click', () => {
            currentLang = currentLang === 'ar' ? 'en' : 'ar';
            htmlRoot.setAttribute('lang', currentLang);
            htmlRoot.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
            toggleLanguage.textContent = currentLang === 'ar' ? 'EN' : 'AR';
            localStorage.setItem('language', currentLang);
            updateTextContent();
            eyeIcons.forEach(icon => {
                if (currentLang === 'ar') {
                    icon.classList.remove('right-3');
                    icon.classList.add('left-3');
                } else {
                    icon.classList.remove('left-3');
                    icon.classList.add('right-3');
                }
            });
        });
    }

    function updateTextContent() {
        document.querySelectorAll('[data-ar][data-en]').forEach(element => {
            const text = element.getAttribute(`data-${currentLang}`);
            if (element.tagName === 'INPUT') {
                element.placeholder = text;
            } else if (element.tagName === 'TITLE') {
                document.title = text;
            } else {
                element.textContent = text;
            }
        });
    }

    eyeIcons.forEach(icon => {
        if (icon) icon.classList.add('left-3');
    });
});
