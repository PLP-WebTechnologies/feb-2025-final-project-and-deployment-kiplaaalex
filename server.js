// server.js
const express = require('express');
const session = require('express-session');

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));

// Login endpoint
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    // Validate credentials against database
    if (validCredentials(email, password)) {
        req.session.user = { email };
        res.json({ success: true });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Protected checkout endpoint
app.post('/api/checkout', (req, res) => {
    if (!req.session.user) {
        return res.status(403).json({ error: 'Login required' });
    }
    
    // Process checkout
    processCheckout(req.body, req.session.user)
        .then(order => res.json({ order }))
        .catch(error => res.status(500).json({ error }));
});

app.listen(3000, () => console.log('Server running'));

// Server-side middleware
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
});

// Render the form using a template engine
app.set('view engine', 'ejs');
app.get('/checkout', (req, res) => {
    res.render('checkout', { csrfToken: req.csrfToken() });
});

// In your Express app
const csrf = require('csurf');
app.use(csrf());

// server.js
// server.js
const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const saltRounds = 10;
// Middleware
app.use(express.json());
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true } // Enable for HTTPS
}));

// User model (simplified)
let users = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "254712345678",
        password: "$2b$10$examplehashedpassword", // bcrypt hash
        createdAt: new Date()
    }
];

// Routes
app.post('/api/register', async (req, res) => {
    const { name, email, phone, password } = req.body;
    
    // Validate input
    if (!name || !email || !phone || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Check if user exists
    if (users.some(u => u.email === email)) {
        return res.status(400).json({ error: 'Email already registered' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    // Create user
    const newUser = {
        id: users.length + 1,
        name,
        email,
        phone,
        password: hashedPassword,
        createdAt: new Date()
    };
    
    users.push(newUser);
    
    // Return user data (without password)
    const { password: _, ...userData } = newUser;
    res.status(201).json(userData);
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    
    // Find user
    const user = users.find(u => u.email === email);
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Create session
    req.session.user = { id: user.id, email: user.email };
    
    // Return user data (without password)
    const { password: _, ...userData } = user;
    res.json(userData);
});

app.get('/api/account', (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const user = users.find(u => u.id === req.session.user.id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    
    // Return user data (without password)
    const { password: _, ...userData } = user;
    res.json(userData);
});

app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.json({ message: 'Logged out successfully' });
});

// Password reset endpoints
app.post('/api/forgot-password', (req, res) => {
    const { email } = req.body;
    
    // In a real app, you would:
    // 1. Find user by email
    // 2. Generate reset token
    // 3. Send email with reset link
    // 4. Store token in database with expiry
    
    res.json({ message: 'If an account exists with this email, a reset link has been sent' });
});

app.post('/api/reset-password', (req, res) => {
    const { token, newPassword } = req.body;
    
    // In a real app, you would:
    // 1. Verify token is valid and not expired
    // 2. Find associated user
    // 3. Update password
    // 4. Invalidate token
    
    res.json({ message: 'Password reset successfully' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Add to server.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Configure passport
passport.use(new GoogleStrategy({
    clientID: 'your-google-client-id',
    clientSecret: 'your-google-client-secret',
    callbackURL: '/auth/google/callback'
},
(accessToken, refreshToken, profile, done) => {
    // Find or create user in your database
    let user = users.find(u => u.email === profile.emails[0].value);
    
    if (!user) {
        user = {
            id: users.length + 1,
            name: profile.displayName,
            email: profile.emails[0].value,
            provider: 'google',
            createdAt: new Date()
        };
        users.push(user);
    }
    
    return done(null, user);
}));

// Serialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    const user = users.find(u => u.id === id);
    done(null, user);
});

// Add routes
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication
        res.redirect('/account');
    });

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

const csrf = require('csurf');
const csrfProtection = csrf({ cookie: true });

// Apply CSRF to routes that modify state
app.post('/api/checkout', csrfProtection, (req, res) => {
    // Verify CSRF token automatically
    // Process checkout
});

// Add CSRF token to all views
app.use((req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
});