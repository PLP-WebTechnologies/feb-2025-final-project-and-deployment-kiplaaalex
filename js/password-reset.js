document.addEventListener('DOMContentLoaded', function() {
    // Get token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    document.getElementById('reset-token').value = token;

    // Form submission
    document.getElementById('reset-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        
        if (newPassword !== confirmPassword) {
            showAlert('Passwords do not match', 'error');
            return;
        }
        
        if (newPassword.length < 8 || !/\d/.test(newPassword)) {
            showAlert('Password must be at least 8 characters with 1 number', 'error');
            return;
        }
        
        // In a real app, send to server to verify token and update password
        try {
            const response = await fetch('/api/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    token: document.getElementById('reset-token').value,
                    newPassword
                })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                showAlert('Password reset successfully! Redirecting to login...', 'success');
                setTimeout(() => {
                    window.location.href = 'auth.html';
                }, 2000);
            } else {
                showAlert(data.error || 'Password reset failed', 'error');
            }
        } catch (error) {
            showAlert('An error occurred. Please try again.', 'error');
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