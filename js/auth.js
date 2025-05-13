document.addEventListener('DOMContentLoaded', function() {
    // Toggle between login and register forms
    const loginToggle = document.getElementById('login-toggle');
    const registerToggle = document.getElementById('register-toggle');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    loginToggle.addEventListener('click', function() {
        this.classList.add('active');
        registerToggle.classList.remove('active');
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
    });

    registerToggle.addEventListener('click', function() {
        this.classList.add('active');
        loginToggle.classList.remove('active');
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
    });

    // Toggle password visibility
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });

    // Form validation and submission
    const loginFormElement = document.getElementById('login-form');
    const registerFormElement = document.getElementById('register-form');

    if (loginFormElement) {
        loginFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            if (validateLogin(email, password)) {
                loginUser(email, password);
            }
        });
    }

    if (registerFormElement) {
        registerFormElement.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const phone = document.getElementById('register-phone').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm').value;
            
            if (validateRegistration(name, email, phone, password, confirmPassword)) {
                registerUser(name, email, phone, password);
            }
        });
    }

    // Validation functions
    function validateLogin(email, password) {
        if (!email || !password) {
            showAlert('Please fill in all fields', 'error');
            return false;
        }
        
        if (!validateEmail(email)) {
            showAlert('Please enter a valid email address', 'error');
            return false;
        }
        
        return true;
    }

    function validateRegistration(name, email, phone, password, confirmPassword) {
        if (!name || !email || !phone || !password || !confirmPassword) {
            showAlert('Please fill in all fields', 'error');
            return false;
        }
        
        if (!validateEmail(email)) {
            showAlert('Please enter a valid email address', 'error');
            return false;
        }
        
        if (!validatePhone(phone)) {
            showAlert('Please enter a valid Kenyan phone number (e.g. 254712345678 or 0712345678)', 'error');
            return false;
        }
        
        if (password.length < 8) {
            showAlert('Password must be at least 8 characters long', 'error');
            return false;
        }
        
        if (!/\d/.test(password)) {
            showAlert('Password must contain at least one number', 'error');
            return false;
        }
        
        if (password !== confirmPassword) {
            showAlert('Passwords do not match', 'error');
            return false;
        }
        
        if (!document.getElementById('agree-terms').checked) {
            showAlert('You must agree to the terms and conditions', 'error');
            return false;
        }
        
        return true;
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        const re = /^(?:254|\+254|0)?(7\d{8})$/;
        return re.test(phone);
    }

    // Authentication functions
    function loginUser(email, password) {
        // In a real app, this would call your backend API
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Store user session
            localStorage.setItem('currentUser', JSON.stringify(user));
            showAlert('Login successful! Redirecting...', 'success');
            
            // Redirect to homepage after 1.5 seconds
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            showAlert('Invalid email or password', 'error');
        }
    }

    function registerUser(name, email, phone, password) {
        // In a real app, this would call your backend API
        const users = JSON.parse(localStorage.getItem('users')) || [];
        
        // Check if user already exists
        if (users.some(u => u.email === email)) {
            showAlert('An account with this email already exists', 'error');
            return;
        }
        
        // Create new user
        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            phone: formatPhoneNumber(phone),
            password, // Note: In a real app, never store plain text passwords
            createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Automatically log the user in
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        showAlert('Registration successful! Redirecting...', 'success');
        
        // Redirect to homepage after 1.5 seconds
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    }

    function formatPhoneNumber(phone) {
        // Convert to 254 format
        const cleaned = phone.replace(/\D/g, '');
        const match = cleaned.match(/^(?:254|\+254|0)?(7\d{8})$/);
        if (match) {
            return `254${match[1]}`;
        }
        return phone;
    }

    // Helper function to show alerts
    function showAlert(message, type) {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type}`;
        alert.textContent = message;
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(alert);
            }, 300);
        }, 3000);
    }
});
// Add this at the start of auth.js
document.addEventListener('DOMContentLoaded', function() {
    // Check for redirect message
    const urlParams = new URLSearchParams(window.location.search);
    const message = urlParams.get('message');
    if (message) {
        showAlert(message, 'info');
    }

    // Rest of your auth.js code...
});

// Modify the login success handler
function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        showAlert('Login successful!', 'success');
        
        // Redirect to return URL or homepage
        const returnUrl = localStorage.getItem('returnUrl') || 'index.html';
        localStorage.removeItem('returnUrl');
        setTimeout(() => {
            window.location.href = returnUrl;
        }, 1500);
    } else {
        showAlert('Invalid email or password', 'error');
    }
}

// Password reset functionality
const resetForm = document.getElementById('reset-form');
const showLogin = document.getElementById('show-login');

if (resetForm && showLogin) {
    showLogin.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('login-toggle').click();
    });

    resetForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('reset-email').value;
        
        // In a real app, send to server
        showAlert('If an account exists with this email, a reset link has been sent', 'info');
        resetForm.reset();
    });
}

// In auth.js
document.getElementById('google-login').addEventListener('click', () => {
    // In a real app, this would redirect to your backend OAuth endpoint
    window.location.href = '/auth/google';
});

// Server-side (Node.js example)
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: 'your_client_id',
    clientSecret: 'your_client_secret',
    callbackURL: '/auth/google/callback'
},
(accessToken, refreshToken, profile, done) => {
    // Find or create user in your database
    return done(null, profile);
}));

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication
        res.redirect('/');
    });