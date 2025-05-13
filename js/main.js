document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const navbar = document.querySelector('.navbar');
    
    if (mobileMenuBtn && navbar) {
        mobileMenuBtn.addEventListener('click', function() {
            navbar.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-times');
            this.querySelector('i').classList.toggle('fa-bars');
        });
    }
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbar.classList.remove('active');
            mobileMenuBtn.querySelector('i').classList.remove('fa-times');
            mobileMenuBtn.querySelector('i').classList.add('fa-bars');
        });
    });
    
    // Product tabs functionality
    const tabNavItems = document.querySelectorAll('.tabs-nav li');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabNavItems.length > 0 && tabPanes.length > 0) {
        tabNavItems.forEach(item => {
            item.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Remove active class from all tabs and panes
                tabNavItems.forEach(tab => tab.classList.remove('active'));
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Add active class to current tab and pane
                this.classList.add('active');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }
    
    // Product image thumbnail click
    const thumbnails = document.querySelectorAll('.thumbnail-images img');
    const mainImage = document.getElementById('mainProductImage');
    
    if (thumbnails.length > 0 && mainImage) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                mainImage.src = this.src.replace('-thumb', '');
            });
        });
    }
    
    // Product rating stars
    const ratingStars = document.querySelectorAll('.rating-input i');
    const ratingValue = document.getElementById('rating-value');
    
    if (ratingStars.length > 0 && ratingValue) {
        ratingStars.forEach(star => {
            star.addEventListener('click', function() {
                const rating = this.getAttribute('data-rating');
                ratingValue.value = rating;
                
                // Update star display
                ratingStars.forEach((s, index) => {
                    if (index < rating) {
                        s.classList.add('active');
                        s.classList.remove('far');
                        s.classList.add('fas');
                    } else {
                        s.classList.remove('active');
                        s.classList.remove('fas');
                        s.classList.add('far');
                    }
                });
            });
        });
    }
    
    // Quantity selector
    const quantityMinusBtns = document.querySelectorAll('.quantity-btn.minus');
    const quantityPlusBtns = document.querySelectorAll('.quantity-btn.plus');
    const quantityInputs = document.querySelectorAll('.quantity-selector input');
    
    quantityMinusBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentNode.querySelector('input');
            let value = parseInt(input.value);
            if (value > 1) {
                input.value = value - 1;
            }
        });
    });
    
    quantityPlusBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentNode.querySelector('input');
            let value = parseInt(input.value);
            input.value = value + 1;
        });
    });
    
    // Load featured products (simulated)
    const featuredProductsContainer = document.getElementById('featured-products');
    if (featuredProductsContainer) {
        const featuredProducts = [
            {
                id: 1,
                name: 'Samsung Galaxy S23 Ultra 5G',
                price: 159999,
                originalPrice: 179999,
                image: 'product1.jpg',
                rating: 4.5,
                reviews: 24,
                badge: 'Sale'
            },
            {
                id: 2,
                name: 'Apple Watch Series 8',
                price: 59999,
                originalPrice: 64999,
                image: 'product2.jpg',
                rating: 4.8,
                reviews: 18,
                badge: 'Popular'
            },
            {
                id: 3,
                name: 'Sony WH-1000XM5 Headphones',
                price: 34999,
                originalPrice: 39999,
                image: 'product3.jpg',
                rating: 4.7,
                reviews: 32,
                badge: ''
            },
            {
                id: 4,
                name: 'MacBook Air M2',
                price: 149999,
                originalPrice: 159999,
                image: 'product4.jpg',
                rating: 4.9,
                reviews: 15,
                badge: 'New'
            }
        ];
        
        featuredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
                    <span class="product-wishlist"><i class="far fa-heart"></i></span>
                    <img src="images/products/${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-price">
                        <span class="current-price">KES ${product.price.toLocaleString()}</span>
                        ${product.originalPrice ? `<span class="original-price">KES ${product.originalPrice.toLocaleString()}</span>` : ''}
                    </div>
                    <div class="product-rating">
                        ${getRatingStars(product.rating)} (${product.reviews})
                    </div>
                    <div class="product-actions">
                        <button class="add-to-cart">Add to Cart</button>
                        <button class="view-details">View Details</button>
                    </div>
                </div>
            `;
            featuredProductsContainer.appendChild(productCard);
        });
    }
    
    // Load related products (simulated)
    const relatedProductsContainer = document.getElementById('related-products');
    if (relatedProductsContainer) {
        const relatedProducts = [
            {
                id: 5,
                name: 'Samsung Galaxy S23+',
                price: 129999,
                originalPrice: 139999,
                image: 'product5.jpg',
                rating: 4.6,
                reviews: 12
            },
            {
                id: 6,
                name: 'Samsung Galaxy Buds2 Pro',
                price: 24999,
                originalPrice: 27999,
                image: 'product6.jpg',
                rating: 4.4,
                reviews: 8
            },
            {
                id: 7,
                name: 'Samsung Galaxy Watch5 Pro',
                price: 49999,
                originalPrice: 54999,
                image: 'product7.jpg',
                rating: 4.3,
                reviews: 14
            },
            {
                id: 8,
                name: 'Samsung 55" QLED Smart TV',
                price: 89999,
                originalPrice: 99999,
                image: 'product8.jpg',
                rating: 4.7,
                reviews: 21
            }
        ];
        
        relatedProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <span class="product-wishlist"><i class="far fa-heart"></i></span>
                    <img src="images/products/${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-price">
                        <span class="current-price">KES ${product.price.toLocaleString()}</span>
                        ${product.originalPrice ? `<span class="original-price">KES ${product.originalPrice.toLocaleString()}</span>` : ''}
                    </div>
                    <div class="product-rating">
                        ${getRatingStars(product.rating)} (${product.reviews})
                    </div>
                    <div class="product-actions">
                        <button class="add-to-cart">Add to Cart</button>
                        <button class="view-details">View Details</button>
                    </div>
                </div>
            `;
            relatedProductsContainer.appendChild(productCard);
        });
    }
    
    // Load recently viewed products (simulated)
    const recentlyViewedContainer = document.getElementById('recently-viewed');
    if (recentlyViewedContainer) {
        const recentlyViewed = [
            {
                id: 9,
                name: 'iPhone 14 Pro Max',
                price: 189999,
                originalPrice: 199999,
                image: 'product9.jpg',
                rating: 4.8,
                reviews: 27
            },
            {
                id: 10,
                name: 'iPad Pro 12.9" M2',
                price: 149999,
                originalPrice: 159999,
                image: 'product10.jpg',
                rating: 4.7,
                reviews: 19
            },
            {
                id: 11,
                name: 'AirPods Pro 2nd Gen',
                price: 34999,
                originalPrice: 39999,
                image: 'product11.jpg',
                rating: 4.6,
                reviews: 23
            },
            {
                id: 12,
                name: 'PlayStation 5 Console',
                price: 79999,
                originalPrice: 89999,
                image: 'product12.jpg',
                rating: 4.9,
                reviews: 31
            }
        ];
        
        recentlyViewed.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <span class="product-wishlist"><i class="far fa-heart"></i></span>
                    <img src="images/products/${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-price">
                        <span class="current-price">KES ${product.price.toLocaleString()}</span>
                        ${product.originalPrice ? `<span class="original-price">KES ${product.originalPrice.toLocaleString()}</span>` : ''}
                    </div>
                    <div class="product-rating">
                        ${getRatingStars(product.rating)} (${product.reviews})
                    </div>
                    <div class="product-actions">
                        <button class="add-to-cart">Add to Cart</button>
                        <button class="view-details">View Details</button>
                    </div>
                </div>
            `;
            recentlyViewedContainer.appendChild(productCard);
        });
    }
    
    // Add to cart buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('add-to-cart')) {
            e.preventDefault();
            updateCartCount(1);
            showAlert('Product added to cart!', 'success');
        }
        
        if (e.target.classList.contains('view-details')) {
            e.preventDefault();
            // In a real app, this would navigate to the product detail page
            showAlert('Navigating to product details...', 'info');
        }
        
        if (e.target.classList.contains('product-wishlist') || e.target.closest('.product-wishlist')) {
            e.preventDefault();
            const wishlistBtn = e.target.classList.contains('product-wishlist') ? e.target : e.target.closest('.product-wishlist');
            const icon = wishlistBtn.querySelector('i');
            
            if (icon.classList.contains('far')) {
                icon.classList.remove('far');
                icon.classList.add('fas');
                icon.style.color = '#e74c3c';
                showAlert('Added to wishlist!', 'success');
            } else {
                icon.classList.remove('fas');
                icon.classList.add('far');
                icon.style.color = '';
                showAlert('Removed from wishlist!', 'info');
            }
        }
    });
    
    // Helper function to generate rating stars
    function getRatingStars(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars += '<i class="fas fa-star"></i>';
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        
        return stars;
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
            cartCount.textContent = count;
            
            // Animate the cart icon
            const cartIcon = document.querySelector('.cart-icon');
            cartIcon.classList.add('animate');
            setTimeout(() => {
                cartIcon.classList.remove('animate');
            }, 500);
        }
    }
    
    // Initialize cart count from localStorage
    function initCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const count = localStorage.getItem('cartCount') || 0;
            cartCount.textContent = count;
        }
    }
    
    initCartCount();
});

// Checkout steps functionality
document.addEventListener('DOMContentLoaded', function() {
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
            
            // Simulate payment processing
            mpesaPayBtn.disabled = true;
            mpesaPayBtn.textContent = 'Processing...';
            
            setTimeout(() => {
                // Simulate successful payment
                goToStep(3);
                mpesaPayBtn.disabled = false;
                mpesaPayBtn.textContent = 'Pay with M-Pesa';
            }, 2000);
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
            
            // Simulate payment processing
            airtelPayBtn.disabled = true;
            airtelPayBtn.textContent = 'Processing...';
            
            setTimeout(() => {
                // Simulate successful payment
                goToStep(3);
                airtelPayBtn.disabled = false;
                airtelPayBtn.textContent = 'Pay with Airtel Money';
            }, 2000);
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
            
            // Simulate payment processing
            cardPayBtn.disabled = true;
            cardPayBtn.textContent = 'Processing...';
            
            setTimeout(() => {
                // Simulate successful payment
                goToStep(3);
                cardPayBtn.disabled = false;
                cardPayBtn.textContent = 'Pay with Card';
            }, 2000);
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
            
            setTimeout(() => {
                // Simulate successful payment
                goToStep(3);
                bankPayBtn.disabled = false;
                bankPayBtn.textContent = 'Confirm Bank Payment';
            }, 2000);
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
            
            setTimeout(() => {
                // Show order complete step
                goToStep(4);
                placeOrderBtn.disabled = false;
                placeOrderBtn.textContent = 'Place Order';
                
                // Update cart count
                updateCartCount(-getCartItemCount());
            }, 2000);
        });
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
});

// SEARCH FUNCTIONALITY (in main.js)
document.addEventListener('DOMContentLoaded', function() {
    // Search form submission
    const searchForm = document.querySelector('.search-box');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const searchInput = this.querySelector('input');
            const searchTerm = searchInput.value.trim();
            
            if (searchTerm) {
                // Store search term in localStorage to use on search results page
                localStorage.setItem('searchTerm', searchTerm);
                window.location.href = 'products.html?search=' + encodeURIComponent(searchTerm);
            }
        });
    }

    // Initialize search box with current search term
    const initializeSearch = () => {
        const searchInput = document.querySelector('.search-box input');
        if (searchInput) {
            const urlParams = new URLSearchParams(window.location.search);
            const searchTerm = urlParams.get('search') || localStorage.getItem('searchTerm') || '';
            searchInput.value = searchTerm;
        }
    };
    initializeSearch();
});

// USER AUTHENTICATION STATE
function updateAuthState() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    const userIcon = document.querySelector('.user-icon');
    
    if (currentUser) {
        // User is logged in
        if (loginLink && registerLink) {
            loginLink.textContent = currentUser.name.split(' ')[0];
            loginLink.href = 'account.html';
            registerLink.textContent = 'Logout';
            registerLink.href = '#';
            registerLink.onclick = function(e) {
                e.preventDefault();
                localStorage.removeItem('currentUser');
                window.location.href = 'index.html';
            };
        }
        
        if (userIcon) {
            userIcon.innerHTML = `<i class="fas fa-user-circle"></i>`;
            userIcon.title = `Logged in as ${currentUser.name}`;
        }
    } else {
        // User is logged out
        if (userIcon) {
            userIcon.innerHTML = `<i class="fas fa-user"></i>`;
            userIcon.title = 'Account';
        }
    }
}

// Initialize auth state on page load
updateAuthState();

// Check for auth redirect
const urlParams = new URLSearchParams(window.location.search);
const authAction = urlParams.get('action');
if (authAction === 'register' && window.location.pathname.includes('auth.html')) {
    document.getElementById('register-toggle').click();
}