document.addEventListener('DOMContentLoaded', function() {
    // Quantity adjustment in cart
    const quantityMinusBtns = document.querySelectorAll('.cart-item .quantity-btn.minus');
    const quantityPlusBtns = document.querySelectorAll('.cart-item .quantity-btn.plus');
    const quantityInputs = document.querySelectorAll('.cart-item .quantity-selector input');
    
    quantityMinusBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentNode.querySelector('input');
            let value = parseInt(input.value);
            if (value > 1) {
                input.value = value - 1;
                updateCartItem(this.closest('.cart-item'));
            }
        });
    });
    
    quantityPlusBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentNode.querySelector('input');
            let value = parseInt(input.value);
            input.value = value + 1;
            updateCartItem(this.closest('.cart-item'));
        });
    });
    
    quantityInputs.forEach(input => {
        input.addEventListener('change', function() {
            let value = parseInt(this.value);
            if (isNaN(value) || value < 1) {
                this.value = 1;
            }
            updateCartItem(this.closest('.cart-item'));
        });
    });
    
    // Remove item from cart
    const removeBtns = document.querySelectorAll('.remove-btn');
    removeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            cartItem.classList.add('removing');
            
            setTimeout(() => {
                cartItem.remove();
                updateCartSummary();
                updateCartCount(-1);
                
                if (document.querySelectorAll('.cart-item').length === 0) {
                    showEmptyCartMessage();
                }
            }, 300);
        });
    });
    
    // Update cart button
    const updateCartBtn = document.querySelector('.btn-update-cart');
    if (updateCartBtn) {
        updateCartBtn.addEventListener('click', function() {
            showAlert('Cart updated successfully!', 'success');
        });
    }
    
    // Clear cart button
    const clearCartBtn = document.querySelector('.btn-clear-cart');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to clear your cart?')) {
                const cartItems = document.querySelectorAll('.cart-item');
                const itemCount = cartItems.length;
                
                cartItems.forEach(item => {
                    item.classList.add('removing');
                    setTimeout(() => {
                        item.remove();
                    }, 300);
                });
                
                setTimeout(() => {
                    showEmptyCartMessage();
                    updateCartCount(-itemCount);
                    showAlert('Cart cleared successfully!', 'success');
                }, 350);
            }
        });
    }
    
    // Continue shopping button
    const continueShoppingBtn = document.querySelector('.btn-continue-shopping');
    if (continueShoppingBtn) {
        continueShoppingBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'products.html';
        });
    }
    
    // Proceed to checkout button
    const checkoutBtn = document.querySelector('.btn-checkout');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'checkout.html';
        });
    }
    
    // Apply coupon button
    const applyCouponBtn = document.querySelector('.coupon-form button');
    if (applyCouponBtn) {
        applyCouponBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const couponInput = this.parentNode.querySelector('input');
            
            if (!couponInput.value) {
                showAlert('Please enter a coupon code', 'error');
                return;
            }
            
            // Simulate coupon application
            this.disabled = true;
            this.textContent = 'Applying...';
            
            setTimeout(() => {
                // Simulate successful coupon application
                showAlert('Coupon applied successfully! 10% discount applied.', 'success');
                this.disabled = false;
                this.textContent = 'Apply';
                
                // Update cart summary with discount
                const subtotal = document.querySelector('.summary-row:first-child span:last-child');
                const total = document.querySelector('.summary-row.total span:last-child');
                
                if (subtotal && total) {
                    const subtotalValue = parseFloat(subtotal.textContent.replace('KES ', '').replace(',', ''));
                    const discount = subtotalValue * 0.1;
                    const newTotal = subtotalValue - discount;
                    
                    // Add discount row if not already present
                    if (!document.querySelector('.summary-row.discount')) {
                        const discountRow = document.createElement('div');
                        discountRow.className = 'summary-row discount';
                        discountRow.innerHTML = `
                            <span>Discount (10%)</span>
                            <span>KES ${discount.toLocaleString()}</span>
                        `;
                        subtotal.parentNode.insertBefore(discountRow, subtotal.nextSibling);
                    }
                    
                    total.textContent = `KES ${newTotal.toLocaleString()}`;
                }
            }, 1500);
        });
    }
    
    // Helper function to update cart item
    function updateCartItem(cartItem) {
        const quantity = parseInt(cartItem.querySelector('.quantity-selector input').value);
        const price = parseFloat(cartItem.querySelector('.current-price').textContent.replace('KES ', '').replace(',', ''));
        const subtotal = cartItem.querySelector('.cart-item-subtotal');
        
        subtotal.textContent = `KES ${(quantity * price).toLocaleString()}`;
        updateCartSummary();
    }
    
    // Helper function to update cart summary
    function updateCartSummary() {
        const cartItems = document.querySelectorAll('.cart-item');
        let subtotal = 0;
        
        cartItems.forEach(item => {
            const quantity = parseInt(item.querySelector('.quantity-selector input').value);
            const price = parseFloat(item.querySelector('.current-price').textContent.replace('KES ', '').replace(',', ''));
            subtotal += quantity * price;
        });
        
        const subtotalElement = document.querySelector('.summary-row:first-child span:last-child');
        const totalElement = document.querySelector('.summary-row.total span:last-child');
        
        if (subtotalElement && totalElement) {
            subtotalElement.textContent = `KES ${subtotal.toLocaleString()}`;
            
            // Check if there's a discount applied
            const discountRow = document.querySelector('.summary-row.discount');
            if (discountRow) {
                const discount = parseFloat(discountRow.querySelector('span:last-child').textContent.replace('KES ', '').replace(',', ''));
                totalElement.textContent = `KES ${(subtotal - discount).toLocaleString()}`;
            } else {
                totalElement.textContent = `KES ${subtotal.toLocaleString()}`;
            }
        }
    }
    
    // Helper function to show empty cart message
    function showEmptyCartMessage() {
        const cartItemsContainer = document.querySelector('.cart-items');
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart">
                    <i class="fas fa-shopping-cart"></i>
                    <h3>Your cart is empty</h3>
                    <p>Looks like you haven't added any items to your cart yet</p>
                    <a href="products.html" class="btn">Continue Shopping</a>
                </div>
            `;
            
            // Hide cart summary if cart is empty
            const cartSummary = document.querySelector('.cart-summary');
            if (cartSummary) {
                cartSummary.style.display = 'none';
            }
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
    
    // Initialize cart summary
    updateCartSummary();
});