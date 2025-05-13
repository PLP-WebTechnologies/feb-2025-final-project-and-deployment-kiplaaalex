document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'auth.html?action=login&message=Please login to access your account';
        return;
    }

    // Set user info
    document.getElementById('username').textContent = `Welcome, ${currentUser.name.split(' ')[0]}`;
    document.getElementById('account-name').value = currentUser.name;
    document.getElementById('account-email').value = currentUser.email;
    document.getElementById('account-phone').value = currentUser.phone;

    // Navigation between sections
    const menuLinks = document.querySelectorAll('.account-menu a[data-section]');
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const section = this.getAttribute('data-section');
            
            // Update active menu item
            menuLinks.forEach(l => l.parentNode.classList.remove('active'));
            this.parentNode.classList.add('active');
            
            // Show selected section
            document.querySelectorAll('.account-section').forEach(s => {
                s.classList.remove('active');
            });
            document.getElementById(`${section}-section`).classList.add('active');
        });
    });

    // Load orders
    loadOrders(currentUser.id);

    // Logout button
    document.getElementById('logout-btn').addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    });

    // Save account changes
    document.getElementById('account-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('account-name').value;
        const email = document.getElementById('account-email').value;
        const phone = document.getElementById('account-phone').value;
        const password = document.getElementById('account-password').value;

        // Update user in localStorage (in real app, would call API)
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.email === currentUser.email);
        
        if (userIndex !== -1) {
            users[userIndex].name = name;
            users[userIndex].email = email;
            users[userIndex].phone = phone;
            if (password) {
                users[userIndex].password = password; // Note: In real app, hash this
            }
            
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
            showAlert('Account updated successfully!', 'success');
        }
    });

    // Toggle password visibility
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', function() {
            const input = this.previousElementSibling;
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });

    // Load sample orders
    function loadOrders(userId) {
        // In a real app, this would fetch from API
        const orders = [
            {
                id: 'VS-2023-1001',
                date: 'June 15, 2023',
                items: 'Samsung Galaxy S23 Ultra (1), Apple Watch (2)',
                total: 279997,
                status: 'delivered'
            },
            {
                id: 'VS-2023-1002',
                date: 'July 2, 2023',
                items: 'Nike Air Max 270 (1)',
                total: 12999,
                status: 'shipped'
            },
            {
                id: 'VS-2023-1003',
                date: 'July 10, 2023',
                items: 'Sony Headphones (1), Dettol Liquid (3)',
                total: 36496,
                status: 'processing'
            }
        ];

        // Populate recent orders table
        const ordersTable = document.querySelector('.recent-orders tbody');
        ordersTable.innerHTML = orders.map(order => `
            <tr>
                <td>${order.id}</td>
                <td>${order.date}</td>
                <td>${order.items}</td>
                <td>KES ${order.total.toLocaleString()}</td>
                <td><span class="order-status ${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span></td>
                <td><a href="#" class="view-order">View</a></td>
            </tr>
        `).join('');

        // Populate orders list
        const ordersList = document.querySelector('.orders-list');
        ordersList.innerHTML = orders.map(order => `
            <div class="order-card">
                <div class="order-header">
                    <div class="order-id">Order #${order.id}</div>
                    <div class="order-date">${order.date}</div>
                    <div class="order-status ${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</div>
                </div>
                <div class="order-details">
                    <div class="order-items">${order.items}</div>
                    <div class="order-total">KES ${order.total.toLocaleString()}</div>
                </div>
                <div class="order-actions">
                    <button class="btn btn-small">Track Order</button>
                    <button class="btn btn-small btn-outline">View Details</button>
                </div>
            </div>
        `).join('');
    }

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