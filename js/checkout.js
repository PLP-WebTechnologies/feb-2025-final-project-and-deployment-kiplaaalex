document.addEventListener('DOMContentLoaded', function() {
    // Checkout steps functionality
    const checkoutSteps = document.querySelectorAll('.checkout-step');
    const stepNavItems = document.querySelectorAll('.step');
    
    if (checkoutSteps.length > 0 && stepNavItems.length > 0) {
        // Show first step by default
        checkoutSteps[0].classList.add('active');
        stepNavItems[0].classList.add('active');
        
        // Next button functionality
        const nextButtons = document.querySelectorAll('.btn-next');
        nextButtons.forEach(button => {
            button.addEventListener('click', function() {
                const nextStep = this.getAttribute('data-next');
                goToStep(nextStep);
            });
        });
        
        // Back button functionality
        const backButtons = document.querySelectorAll('.btn-back');
        backButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (this.hasAttribute('data-back')) {
                    const prevStep = this.getAttribute('data-back');
                    goToStep(prevStep);
                } else {
                    window.location.href = 'cart.html';
                }
            });
        });
        
        // Edit button functionality
        const editButtons = document.querySelectorAll('.btn-edit');
        editButtons.forEach(button => {
            button.addEventListener('click', function() {
                const stepToEdit = this.getAttribute('data-edit');
                goToStep(stepToEdit);
            });
        });
    }
    
    function goToStep(stepNumber) {
        // Hide all steps
        checkoutSteps.forEach(step => step.classList.remove('active'));
        stepNavItems.forEach(step => step.classList.remove('active'));
        
        // Show selected step
        document.getElementById(`step-${stepNumber}`).classList.add('active');
        document.querySelector(`.step[data-step="${stepNumber}"]`).classList.add('active');
        
        // Scroll to top of step
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Payment method tabs
    const paymentTabs = document.querySelectorAll('.payment-tab');
    const paymentTabContents = document.querySelectorAll('.payment-tab-content');
    
    if (paymentTabs.length > 0 && paymentTabContents.length > 0) {
        paymentTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Remove active class from all tabs and contents
                paymentTabs.forEach(t => t.classList.remove('active'));
                paymentTabContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to current tab and content
                this.classList.add('active');
                document.getElementById(`${tabId}-tab`).classList.add('active');
            });
        });
    }
    
    // Simulate M-Pesa payment
    const mpesaPayBtn = document.getElementById('pay-with-mpesa');
    if (mpesaPayBtn) {
        mpesaPayBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const phoneInput = document.getElementById('mpesa-phone');
            
            if (!phoneInput.value) {
                showAlert('Please enter your M-Pesa phone number', 'error');
                return;
            }
            
            // Validate phone number format (Kenyan)
            const phoneRegex = /^(?:254|\+254|0)?(7\d{8})$/;
            if (!phoneRegex.test(phoneInput.value)) {
                showAlert('Please enter a valid Kenyan phone number (e.g. 254712345678 or 0712345678)', 'error');
                return;
            }
            
            // Simulate payment processing
            mpesaPayBtn.disabled = true;
            mpesaPayBtn.textContent = 'Processing...';
            
            // Show loading animation
            const loading = document.createElement('div');
            loading.className = 'loading';
            loading.innerHTML = '<div class="spinner"></div><p>Waiting for M-Pesa payment...</p>';
            this.parentNode.appendChild(loading);
            
            setTimeout(() => {
                // Simulate successful payment
                goToStep(3);
                mpesaPayBtn.disabled = false;
                mpesaPayBtn.textContent = 'Pay with M-Pesa';
                loading.remove();
                
                // Update payment method in review section
                document.querySelector('.payment-review .review-content p:first-child strong').textContent = 'M-Pesa';
                document.querySelector('.payment-review .review-content p:nth-child(2)').textContent = `Phone: ${formatPhoneNumber(phoneInput.value)}`;
            }, 3000);
        });
    }
    
    // Simulate Airtel Money payment
    const airtelPayBtn = document.getElementById('pay-with-airtel');
    if (airtelPayBtn) {
        airtelPayBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const phoneInput = document.getElementById('airtel-phone');
            
            if (!phoneInput.value) {
                showAlert('Please enter your Airtel Money phone number', 'error');
                return;
            }
            
            // Validate phone number format (Kenyan)
            const phoneRegex = /^(?:254|\+254|0)?(7\d{8})$/;
            if (!phoneRegex.test(phoneInput.value)) {
                showAlert('Please enter a valid Kenyan phone number (e.g. 254712345678 or 0712345678)', 'error');
                return;
            }
            
            // Simulate payment processing
            airtelPayBtn.disabled = true;
            airtelPayBtn.textContent = 'Processing...';
            
            // Show loading animation
            const loading = document.createElement('div');
            loading.className = 'loading';
            loading.innerHTML = '<div class="spinner"></div><p>Waiting for Airtel Money payment...</p>';
            this.parentNode.appendChild(loading);
            
            setTimeout(() => {
                // Simulate successful payment
                goToStep(3);
                airtelPayBtn.disabled = false;
                airtelPayBtn.textContent = 'Pay with Airtel Money';
                loading.remove();
                
                // Update payment method in review section
                document.querySelector('.payment-review .review-content p:first-child strong').textContent = 'Airtel Money';
                document.querySelector('.payment-review .review-content p:nth-child(2)').textContent = `Phone: ${formatPhoneNumber(phoneInput.value)}`;
            }, 3000);
        });
    }
    
    // Simulate card payment
    const cardPayBtn = document.getElementById('pay-with-card');
    if (cardPayBtn) {
        cardPayBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const cardNumber = document.getElementById('card-number');
            const cardExpiry = document.getElementById('card-expiry');
            const cardCvv = document.getElementById('card-cvv');
            const cardName = document.getElementById('card-name');
            
            if (!cardNumber.value || !cardExpiry.value || !cardCvv.value || !cardName.value) {
                showAlert('Please fill in all card details', 'error');
                return;
            }
            
            // Validate card number
            const cardRegex = /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/;
            if (!cardRegex.test(cardNumber.value.replace(/\s/g, ''))) {
                showAlert('Please enter a valid 16-digit card number', 'error');
                return;
            }
            
            // Validate expiry date
            const expiryRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
            if (!expiryRegex.test(cardExpiry.value)) {
                showAlert('Please enter a valid expiry date (MM/YY)', 'error');
                return;
            }
            
            // Validate CVV
            if (cardCvv.value.length < 3 || cardCvv.value.length > 4) {
                showAlert('Please enter a valid CVV (3 or 4 digits)', 'error');
                return;
            }
            
            // Simulate payment processing
            cardPayBtn.disabled = true;
            cardPayBtn.textContent = 'Processing...';
            
            // Show loading animation
            const loading = document.createElement('div');
            loading.className = 'loading';
            loading.innerHTML = '<div class="spinner"></div><p>Processing card payment...</p>';
            this.parentNode.appendChild(loading);
            
            setTimeout(() => {
                // Simulate successful payment
                goToStep(3);
                cardPayBtn.disabled = false;
                cardPayBtn.textContent = 'Pay with Card';
                loading.remove();
                
                // Update payment method in review section
                document.querySelector('.payment-review .review-content p:first-child strong').textContent = 'Credit/Debit Card';
                document.querySelector('.payment-review .review-content p:nth-child(2)').textContent = `Card ending with ${cardNumber.value.slice(-4)}`;
                document.querySelector('.payment-review .review-content p:nth-child(3)').textContent = `Name: ${cardName.value}`;
            }, 3000);
        });
    }
    
    // Simulate bank payment confirmation
    const bankPayBtn = document.getElementById('confirm-bank-payment');
    if (bankPayBtn) {
        bankPayBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const reference = document.getElementById('bank-reference');
            const slip = document.getElementById('bank-slip');
            
            if (!reference.value || !slip.value) {
                showAlert('Please fill in payment reference and upload payment slip', 'error');
                return;
            }
            
            // Simulate payment processing
            bankPayBtn.disabled = true;
            bankPayBtn.textContent = 'Processing...';
            
            // Show loading animation
            const loading = document.createElement('div');
            loading.className = 'loading';
            loading.innerHTML = '<div class="spinner"></div><p>Confirming bank payment...</p>';
            this.parentNode.appendChild(loading);
            
            setTimeout(() => {
                // Simulate successful payment
                goToStep(3);
                bankPayBtn.disabled = false;
                bankPayBtn.textContent = 'Confirm Bank Payment';
                loading.remove();
                
                // Update payment method in review section
                document.querySelector('.payment-review .review-content p:first-child strong').textContent = 'Bank Transfer';
                document.querySelector('.payment-review .review-content p:nth-child(2)').textContent = `Reference: ${reference.value}`;
            }, 3000);
        });
    }
    
    // Place order button
    const placeOrderBtn = document.querySelector('.btn-place-order');
    if (placeOrderBtn) {
        placeOrderBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const agreeTerms = document.getElementById('agree-terms');
            
            if (!agreeTerms.checked) {
                showAlert('Please agree to the terms and conditions', 'error');
                return;
            }
            
            // Simulate order placement
            placeOrderBtn.disabled = true;
            placeOrderBtn.textContent = 'Placing Order...';
            
            // Show loading animation
            const loading = document.createElement('div');
            loading.className = 'loading';
            loading.innerHTML = '<div class="spinner"></div><p>Processing your order...</p>';
            this.parentNode.appendChild(loading);
            
            setTimeout(() => {
                // Show order complete step
                goToStep(4);
                placeOrderBtn.disabled = false;
                placeOrderBtn.textContent = 'Place Order';
                loading.remove();
                
                // Update cart count
                updateCartCount(-getCartItemCount());
                
                // Generate random order number
                const orderNumber = `VS-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
                document.querySelector('.order-number strong').textContent = orderNumber;
                
                // Set current date
                const now = new Date();
                const options = { year: 'numeric', month: 'long', day: 'numeric' };
                document.querySelector('.detail-item:nth-child(2) span:last-child').textContent = now.toLocaleDateString('en-US', options);
            }, 2000);
        });
    }
    
    // Helper function to format phone number
    function formatPhoneNumber(phone) {
        // Convert to 254 format
        const cleaned = phone.replace(/\D/g, '');
        const match = cleaned.match(/^(?:254|\+254|0)?(7\d{8})$/);
        if (match) {
            return `254${match[1]}`;
        }
        return phone;
    }
    
    // Helper function to get cart item count
    function getCartItemCount() {
        // In a real app, this would count actual cart items
        return 2; // Simulating 2 items in cart
    }
    
    // Helper function to update cart count
    function updateCartCount(change) {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            let count = parseInt(cartCount.textContent) || 0;
            count += change;
            if (count < 0) count = 0;
            cartCount.textContent = count;
            localStorage.setItem('cartCount', count);
        }
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
    
    // Initialize shipping info from localStorage if available
    function initShippingInfo() {
        const savedShippingInfo = JSON.parse(localStorage.getItem('shippingInfo')) || {};
        
        if (savedShippingInfo.firstName) {
            document.getElementById('shipping-first-name').value = savedShippingInfo.firstName;
        }
        if (savedShippingInfo.lastName) {
            document.getElementById('shipping-last-name').value = savedShippingInfo.lastName;
        }
        if (savedShippingInfo.email) {
            document.getElementById('shipping-email').value = savedShippingInfo.email;
        }
        if (savedShippingInfo.phone) {
            document.getElementById('shipping-phone').value = savedShippingInfo.phone;
        }
        if (savedShippingInfo.address) {
            document.getElementById('shipping-address').value = savedShippingInfo.address;
        }
        if (savedShippingInfo.city) {
            document.getElementById('shipping-city').value = savedShippingInfo.city;
        }
        if (savedShippingInfo.county) {
            document.getElementById('shipping-county').value = savedShippingInfo.county;
        }
        if (savedShippingInfo.notes) {
            document.getElementById('shipping-notes').value = savedShippingInfo.notes;
        }
    }
    
    // Save shipping info when proceeding to payment
    const paymentNextBtn = document.querySelector('#step-1 .btn-next');
    if (paymentNextBtn) {
        paymentNextBtn.addEventListener('click', function() {
            const shippingInfo = {
                firstName: document.getElementById('shipping-first-name').value,
                lastName: document.getElementById('shipping-last-name').value,
                email: document.getElementById('shipping-email').value,
                phone: document.getElementById('shipping-phone').value,
                address: document.getElementById('shipping-address').value,
                city: document.getElementById('shipping-city').value,
                county: document.getElementById('shipping-county').value,
                notes: document.getElementById('shipping-notes').value
            };
            
            localStorage.setItem('shippingInfo', JSON.stringify(shippingInfo));
            
            // Update review section
            document.querySelector('.shipping-review .review-content p:first-child strong').textContent = 
                `${shippingInfo.firstName} ${shippingInfo.lastName}`;
            document.querySelector('.shipping-review .review-content p:nth-child(2)').textContent = 
                shippingInfo.address;
            document.querySelector('.shipping-review .review-content p:nth-child(3)').textContent = 
                `${shippingInfo.city}, Kenya`;
            document.querySelector('.shipping-review .review-content p:nth-child(4)').textContent = 
                `Phone: ${shippingInfo.phone}`;
            document.querySelector('.shipping-review .review-content p:nth-child(5)').textContent = 
                `Email: ${shippingInfo.email}`;
                
            // Update shipping method
            const selectedShipping = document.querySelector('input[name="shipping-method"]:checked');
            if (selectedShipping) {
                const optionContent = selectedShipping.closest('.shipping-option').querySelector('.option-content');
                document.querySelector('.shipping-review .review-content p:last-child strong').textContent = 
                    optionContent.querySelector('.option-title').textContent;
                document.querySelector('.shipping-review .review-content p:last-child').innerHTML += 
                    ` (${optionContent.querySelector('.option-details').textContent})`;
            }
        });
    }
    
    initShippingInfo();
});