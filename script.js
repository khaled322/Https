// هذا الكود لا يستخدم import لأنه سيتم تشغيله كـ CommonJS
// الوظائف تعتمد على المتغيرات العامة التي تم تهيئتها في <script type="module"> في index.html

document.addEventListener('DOMContentLoaded', () => {
    // التأكد من أن Firebase قد تم تهيئته
    if (!window.auth || !window.signInWithEmailAndPassword || !window.createUserWithEmailAndPassword) {
        console.error('لم يتم تحميل Firebase بشكل صحيح.');
        return;
    }

    // المتغيرات
    const auth = window.auth;
    const signInWithEmailAndPassword = window.signInWithEmailAndPassword;
    const createUserWithEmailAndPassword = window.createUserWithEmailAndPassword;

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

    // وظيفة تبديل رؤية كلمة المرور
    function togglePasswordVisibility(input, toggle) {
        if (input && toggle) {
            toggle.addEventListener('click', () => {
                const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
                input.setAttribute('type', type);
                toggle.classList.toggle('fa-eye-slash');
                console.log('تم تبديل رؤية كلمة المرور');
            });
        }
    }
    togglePasswordVisibility(password, togglePassword);
    togglePasswordVisibility(registerPassword, toggleRegisterPassword);
    togglePasswordVisibility(confirmPassword, toggleConfirmPassword);

    // التبديل بين النماذج
    if (showRegisterForm) {
        showRegisterForm.addEventListener('click', () => {
            loginForm.classList.add('hidden');
            registerForm.classList.remove('hidden');
            console.log('تم التبديل إلى نموذج التسجيل');
        });
    }
    if (showLoginForm) {
        showLoginForm.addEventListener('click', () => {
            registerForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
            console.log('تم التبديل إلى نموذج تسجيل الدخول');
        });
    }

    // التحقق من تطابق كلمات المرور
    if (confirmPassword) {
        confirmPassword.addEventListener('input', () => {
            if (registerPassword.value !== confirmPassword.value) {
                passwordError.classList.remove('hidden');
            } else {
                passwordError.classList.add('hidden');
            }
        });
    }

    // تسجيل الدخول مع Firebase
    if (loginFormSubmit) {
        loginFormSubmit.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.querySelector('#loginEmail').value;
            const password = document.querySelector('#password').value;

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log('تم تسجيل الدخول بنجاح:', userCredential.user);
                    alert('تم تسجيل الدخول بنجاح!');
                })
                .catch((error) => {
                    loginError.classList.remove('hidden');
                    loginError.textContent = error.message;
                    console.error('خطأ في تسجيل الدخول:', error.code, error.message);
                });
        });
    }

    // إنشاء حساب مع Firebase
    if (registrationForm) {
        registrationForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const firstName = document.querySelector('#firstName').value;
            const lastName = document.querySelector('#lastName').value;
            const email = document.querySelector('#registerEmail').value;
            const password = registerPassword.value;
            const confirmPasswordVal = confirmPassword.value;

            if (password !== confirmPasswordVal) {
                passwordError.classList.remove('hidden');
                return;
            }

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    console.log('تم إنشاء الحساب بنجاح:', userCredential.user);
                    alert('تم إنشاء الحساب بنجاح!');
                })
                .catch((error) => {
                    registerError.classList.remove('hidden');
                    registerError.textContent = error.message;
                    console.error('خطأ في إنشاء الحساب:', error.code, error.message);
                });
        });
    }

    // تبديل الوضع الداكن
    if (toggleDarkMode) {
        toggleDarkMode.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            toggleDarkMode.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            localStorage.setItem('darkMode', isDark);
            console.log('تم تبديل الوضع الداكن:', isDark);
        });

        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
            toggleDarkMode.innerHTML = '<i class="fas fa-sun"></i>';
        }
    }

    // تبديل اللغة وضبط موقع الأيقونة
    let currentLang = 'ar';
    const eyeIcons = [togglePassword, toggleRegisterPassword, toggleConfirmPassword];
    if (toggleLanguage) {
        toggleLanguage.addEventListener('click', () => {
            currentLang = currentLang === 'ar' ? 'en' : 'ar';
            htmlRoot.setAttribute('lang', currentLang);
            htmlRoot.setAttribute('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
            toggleLanguage.textContent = currentLang === 'ar' ? 'EN' : 'AR';
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
            console.log('تم تبديل اللغة إلى:', currentLang);
        });
    }

    // تحديث النصوص بناءً على اللغة
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

    // ضبط الموقع الافتراضي للأيقونات
    eyeIcons.forEach(icon => {
        if (icon) {
            icon.classList.add('left-3');
        }
    });

    console.log('تم تحميل الصفحة بنجاح مع Firebase Modular SDK');
});
