<!DOCTYPE html>
<html lang="ar" dir="rtl" id="htmlRoot">
<head>
    <meta charset="utf-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title data-ar="تسجيل الدخول - تاجر هيلب" data-en="Login - Tadjir Help">تسجيل الدخول - تاجر هيلب</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" rel="stylesheet"/>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Cairo:wght@400;700&display=swap" rel="stylesheet"/>
    <!-- Firebase Modular SDK -->
    <script type="module">
        import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
        import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

        const firebaseConfig = {
            apiKey: "YOUR_API_KEY",           // استبدل بـ API Key الخاص بك
            authDomain: "YOUR_AUTH_DOMAIN",   // استبدل بـ authDomain الخاص بك
            projectId: "YOUR_PROJECT_ID",     // استبدل بـ projectId الخاص بك
            storageBucket: "YOUR_STORAGE_BUCKET",
            messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
            appId: "YOUR_APP_ID",
            measurementId: "YOUR_MEASUREMENT_ID"
        };

        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const googleProvider = new GoogleAuthProvider();

        window.auth = auth;
        window.signInWithEmailAndPassword = signInWithEmailAndPassword;
        window.createUserWithEmailAndPassword = createUserWithEmailAndPassword;
        window.signInWithPopup = signInWithPopup;
        window.googleProvider = googleProvider;

        // إعادة توجيه إلى Dashboard عند تسجيل الدخول
        onAuthStateChanged(auth, (user) => {
            if (user) {
                window.location.href = 'dashboard.html';
            }
        });
    </script>
    <style>
        body {
            font-family: 'Cairo', 'Roboto', sans-serif;
            transition: all 0.4s ease-in-out;
            background-color: #ffffff;
            color: #1a202c;
        }
        .dark-mode {
            background-color: #121212;
            color: #e2e8f0;
        }
        .dark-mode #loginForm, .dark-mode #registerForm {
            background-color: #1e1e1e;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }
        .dark-mode input {
            background-color: #2d2d2d;
            color: #e2e8f0;
            border-color: #4a5568;
        }
        .dark-mode input:focus {
            border-color: #ecc94b;
            ring-color: #ecc94b;
        }
        .dark-mode button:not(.google-btn) {
            background-color: #ecc94b;
            color: #1a202c;
        }
        .dark-mode button:not(.google-btn):hover {
            background-color: #d69e2e;
        }
        .dark-mode .google-btn {
            background-color: #ffffff;
            color: #1a202c;
            border-color: #4a5568;
        }
        .dark-mode .google-btn:hover {
            background-color: #f7fafc;
        }
        .dark-mode a {
            color: #ecc94b;
        }
        .dark-mode .text-gray-600 {
            color: #a0aec0;
        }
        .input-field, .input-field-no-icon {
            position: relative;
            width: 100%;
        }
        .input-field input, .input-field-no-icon input {
            padding: 0.75rem 1rem;
            width: 100%;
            box-sizing: border-box;
            font-size: 1rem;
            line-height: 1.5;
            transition: all 0.3s ease;
        }
        .input-field input {
            padding-left: 2.25rem;
            padding-right: 1rem;
        }
        .input-field input:focus {
            transform: scale(1.02);
            border-color: #ecc94b;
            box-shadow: 0 0 5px rgba(236, 201, 75, 0.5);
        }
        .input-field i {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            font-size: 1rem;
            transition: color 0.3s ease;
        }
        .input-field i:hover {
            color: #ecc94b;
        }
        [dir="rtl"] .input-field i {
            left: 0.75rem;
        }
        [dir="ltr"] .input-field i {
            right: 0.75rem;
        }
        .btn, .google-btn {
            transition: all 0.3s ease;
        }
        .btn:hover, .google-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
        }
        .btn:active, .google-btn:active {
            transform: scale(0.98);
        }
        .form-container {
            opacity: 0;
            transform: translateY(20px);
            animation: slideIn 0.5s ease forwards;
        }
        .hidden {
            display: none;
        }
        @keyframes slideIn {
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .title-highlight {
            display: inline-block;
        }
        #toggleDarkMode, #toggleLanguage {
            transition: background-color 0.3s ease;
        }
        #toggleDarkMode:hover, #toggleLanguage:hover {
            background-color: #ecc94b;
            color: #1a202c;
        }
    </style>
</head>
<body class="flex items-center justify-center min-h-screen">
    <div class="fixed top-4 left-4 flex space-x-4">
        <button id="toggleDarkMode" class="bg-gray-200 px-3 py-1 rounded-md dark:bg-gray-700" aria-label="تبديل الوضع الداكن">
            <i class="fas fa-moon"></i>
        </button>
        <button id="toggleLanguage" class="bg-gray-200 px-3 py-1 rounded-md dark:bg-gray-700" aria-label="تغيير اللغة">EN</button>
    </div>

    <div id="loginForm" class="form-container w-full max-w-md mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
        <div class="text-center mb-8">
            <h2 class="text-4xl font-bold">
                <span data-ar="تاجر" data-en="Tadjir">تاجر</span>
                <span class="text-yellow-500 title-highlight" data-ar="هيلب" data-en="Help">هيلب</span>
            </h2>
            <p class="text-gray-600 mt-2" data-ar="سجل الدخول إلى حسابك" data-en="Log in to your account">سجل الدخول إلى حسابك</p>
        </div>
        <form id="loginFormSubmit" class="space-y-6">
            <div class="input-field-no-icon">
                <input class="border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                       placeholder="أدخل البريد الإلكتروني" data-ar="أدخل البريد الإلكتروني" data-en="Enter email" 
                       type="email" id="loginEmail" required/>
            </div>
            <div class="input-field">
                <input class="border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                       id="password" placeholder="أدخل كلمة المرور" data-ar="أدخل كلمة المرور" data-en="Enter password" 
                       type="password" required/>
                <i class="fas fa-eye" id="togglePassword"></i>
            </div>
            <div class="text-left">
                <a class="text-sm text-gray-600 hover:underline" href="forgot-password.html" data-ar="نسيت كلمة المرور؟" data-en="Forgot Password?">نسيت كلمة المرور؟</a>
            </div>
            <p id="loginError" class="text-red-500 text-sm hidden"></p>
            <button class="btn w-full bg-yellow-500 text-white py-3 rounded-md font-bold hover:bg-yellow-600" 
                    type="submit" data-ar="تسجيل الدخول" data-en="Login">تسجيل الدخول</button>
        </form>
        <div class="mt-6">
            <button id="googleSignIn" class="google-btn w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-md font-bold flex items-center justify-center space-x-2">
                <svg class="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.02.68-2.31 1.08-3.71 1.08-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C4 20.36 7.9 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.9 1 4 3.64 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                <span data-ar="تسجيل الدخول عبر Google" data-en="Sign in with Google">تسجيل الدخول عبر Google</span>
            </button>
        </div>
        <div class="text-center mt-6">
            <p class="text-sm text-gray-600">
                <span data-ar="ليس لديك حساب؟" data-en="Don't have an account?">ليس لديك حساب؟</span>
                <a class="text-yellow-500 font-bold cursor-pointer hover:underline" id="showRegisterForm" data-ar="إنشاء حساب" data-en="Create Account">إنشاء حساب</a>
            </p>
        </div>
    </div>

    <div id="registerForm" class="form-container w-full max-w-md mx-auto p-6 bg-gray-50 rounded-lg shadow-md hidden">
        <div class="text-center mb-8">
            <h2 class="text-4xl font-bold">
                <span data-ar="تاجر" data-en="Tadjir">تاجر</span>
                <span class="text-yellow-500 title-highlight" data-ar="هيلب" data-en="Help">هيلب</span>
            </h2>
            <p class="text-gray-600 mt-2" data-ar="أنشئ حسابك الجديد" data-en="Create your new account">أنشئ حسابك الجديد</p>
        </div>
        <form id="registrationForm" class="space-y-6">
            <div class="input-field-no-icon">
                <input class="border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                       placeholder="الاسم الأول" data-ar="الاسم الأول" data-en="First Name" 
                       type="text" id="firstName" required/>
            </div>
            <div class="input-field-no-icon">
                <input class="border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                       placeholder="اسم العائلة" data-ar="اسم العائلة" data-en="Last Name" 
                       type="text" id="lastName" required/>
            </div>
            <div class="input-field-no-icon">
                <input class="border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                       placeholder="أدخل البريد الإلكتروني" data-ar="أدخل البريد الإلكتروني" data-en="Enter email" 
                       type="email" id="registerEmail" required/>
            </div>
            <div class="input-field">
                <input class="border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                       id="registerPassword" placeholder="أدخل كلمة المرور" data-ar="أدخل كلمة المرور" data-en="Enter password" 
                       type="password" required/>
                <i class="fas fa-eye" id="toggleRegisterPassword"></i>
            </div>
            <div class="input-field">
                <input class="border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500" 
                       id="confirmPassword" placeholder="تأكيد كلمة المرور" data-ar="تأكيد كلمة المرور" data-en="Confirm password" 
                       type="password" required/>
                <i class="fas fa-eye" id="toggleConfirmPassword"></i>
            </div>
            <p id="passwordError" class="text-red-500 text-sm hidden" data-ar="كلمات المرور غير متطابقة!" data-en="Passwords do not match!">كلمات المرور غير متطابقة!</p>
            <p id="registerError" class="text-red-500 text-sm hidden"></p>
            <button class="btn w-full bg-yellow-500 text-white py-3 rounded-md font-bold hover:bg-yellow-600" 
                    type="submit" data-ar="تسجيل" data-en="Register">تسجيل</button>
        </form>
        <div class="mt-6">
            <button id="googleSignUp" class="google-btn w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-md font-bold flex items-center justify-center space-x-2">
                <svg class="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.02.68-2.31 1.08-3.71 1.08-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C4 20.36 7.9 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.9 1 4 3.64 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                <span data-ar="التسجيل عبر Google" data-en="Sign up with Google">التسجيل عبر Google</span>
            </button>
        </div>
        <div class="text-center mt-6">
            <p class="text-sm text-gray-600">
                <span data-ar="لديك حساب بالفعل؟" data-en="Already have an account?">لديك حساب بالفعل؟</span>
                <a class="text-yellow-500 font-bold cursor-pointer hover:underline" id="showLoginForm" data-ar="تسجيل الدخول" data-en="Login">تسجيل الدخول</a>
            </p>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
