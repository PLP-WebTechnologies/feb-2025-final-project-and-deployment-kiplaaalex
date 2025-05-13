document.addEventListener('DOMContentLoaded', function() {
    // Product data (in a real app, this would come from an API based on URL parameter)
    const product = {
        id: 1,
        name: 'Samsung Galaxy S23 Ultra 5G (12GB RAM, 256GB Storage)',
        price: 159999,
        originalPrice: 179999,
        description: 'The Samsung Galaxy S23 Ultra 5G features a massive 6.8-inch Dynamic AMOLED 2X display, 200MP camera system, and the powerful Snapdragon 8 Gen 2 processor. With 12GB RAM and 256GB storage, this phone delivers exceptional performance for gaming, photography, and productivity.',
        specifications: [
            { name: 'Display', value: '6.8-inch Dynamic AMOLED 2X, 3088×1440 resolution, 120Hz refresh rate' },
            { name: 'Processor', value: 'Qualcomm Snapdragon 8 Gen 2' },
            { name: 'Memory', value: '12GB RAM' },
            { name: 'Storage', value: '256GB/512GB/1TB (no microSD slot)' },
            { name: 'Rear Cameras', value: '200MP wide (f/1.7) + 12MP ultra-wide (f/2.2) + 10MP telephoto (3x, f/2.4) + 10MP telephoto (10x, f/4.9)' },
            { name: 'Front Camera', value: '12MP (f/2.2)' },
            { name: 'Battery', value: '5,000mAh with 45W wired charging, 15W wireless charging, 4.5W reverse wireless charging' },
            { name: 'Operating System', value: 'Android 13 with One UI 5.1' },
            { name: 'Dimensions', value: '163.4 x 78.1 x 8.9 mm' },
            { name: 'Weight', value: '234g' },
            { name: 'Connectivity', value: '5G, Wi-Fi 6E, Bluetooth 5.3, NFC, USB-C' },
            { name: 'Other Features', value: 'IP68 water/dust resistance, Under-display fingerprint sensor, Stereo speakers, S Pen support' }
        ],
        colors: [
            { id: 'color-black', name: 'Phantom Black', code: '#000000' },
            { id: 'color-green', name: 'Green', code: '#6B8E23' },
            { id: 'color-cream', name: 'Cream', code: '#F5F5DC' },
            { id: 'color-lavender', name: 'Lavender', code: '#E6E6FA' }
        ],
        storageOptions: [
            { id: 'storage-256', size: '256GB', price: 0 },
            { id: 'storage-512', size: '512GB', price: 20000 },
            { id: 'storage-1tb', size: '1TB', price: 40000 }
        ],
        images: [
            'product1.jpg',
            'product1-thumb1.jpg',
            'product1-thumb2.jpg',
            'product1-thumb3.jpg',
            'product1-thumb4.jpg'
        ],
        reviews: [
            {
                author: 'John Kamau',
                rating: 5,
                date: 'March 15, 2023',
                title: 'Best phone I\'ve ever owned',
                text: 'The camera on this phone is absolutely incredible. The 200MP sensor captures so much detail, and the 10x optical zoom is perfect for wildlife photography. Battery life is excellent, easily lasting a full day with heavy use. The S Pen integration is seamless and very useful for taking notes during meetings.'
            },
            {
                author: 'Sarah Wanjiku',
                rating: 4.5,
                date: 'March 10, 2023',
                title: 'Great but expensive',
                text: 'The phone is fantastic with amazing performance and camera quality. However, it\'s very expensive and quite heavy compared to other phones. The curved edges sometimes make it difficult to use with one hand. But if you can afford it and don\'t mind the size, it\'s definitely one of the best Android phones available.'
            }
        ],
        relatedProducts: [2, 3, 4, 5] // IDs of related products
    };

    // Initialize product details
    initProductDetails(product);

    // Color selection
    const colorRadios = document.querySelectorAll('input[name="color"]');
    colorRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                // Update main image to show selected color
                const mainImage = document.getElementById('mainProductImage');
                const colorName = this.nextElementSibling.getAttribute('title').toLowerCase().replace(' ', '-');
                mainImage.src = `images/products/product1-${colorName}.jpg`;
            }
        });
    });

    // Storage selection
    const storageRadios = document.querySelectorAll('input[name="storage"]');
    storageRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.checked) {
                const storageOption = product.storageOptions.find(opt => opt.id === this.id);
                updatePrice(storageOption.price);
            }
        });
    });

    // Quantity adjustment
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');
    const quantityInput = document.querySelector('.quantity-selector input');

    minusBtn.addEventListener('click', function() {
        let value = parseInt(quantityInput.value);
        if (value > 1) {
            quantityInput.value = value - 1;
        }
    });

    plusBtn.addEventListener('click', function() {
        let value = parseInt(quantityInput.value);
        quantityInput.value = value + 1;
    });

    // Add to cart button
    const addToCartBtn = document.querySelector('.btn-add-to-cart');
    addToCartBtn.addEventListener('click', function() {
        const selectedColor = document.querySelector('input[name="color"]:checked').nextElementSibling.getAttribute('title');
        const selectedStorage = document.querySelector('input[name="storage"]:checked').nextElementSibling.textContent;
        const quantity = parseInt(quantityInput.value);

        // In a real app, this would add to cart in localStorage or send to server
        addToCart(product.id, product.name, selectedColor, selectedStorage, product.price, quantity);
        
        showAlert('Product added to cart!', 'success');
        updateCartCount(quantity);
    });

    // Buy now button
    const buyNowBtn = document.querySelector('.btn-buy-now');
    buyNowBtn.addEventListener('click', function() {
        const selectedColor = document.querySelector('input[name="color"]:checked').nextElementSibling.getAttribute('title');
        const selectedStorage = document.querySelector('input[name="storage"]:checked').nextElementSibling.textContent;
        const quantity = parseInt(quantityInput.value);

        // In a real app, this would add to cart and redirect to checkout
        addToCart(product.id, product.name, selectedColor, selectedStorage, product.price, quantity);
        updateCartCount(quantity);
        
        window.location.href = 'checkout.html';
    });

    // Wishlist button
    const wishlistBtn = document.querySelector('.btn-wishlist');
    wishlistBtn.addEventListener('click', function() {
        const icon = this.querySelector('i');
        
        if (icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            showAlert('Added to wishlist!', 'success');
            // In a real app, would add to wishlist in localStorage or send to server
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            showAlert('Removed from wishlist!', 'info');
            // In a real app, would remove from wishlist
        }
    });

    // Review form submission
    const reviewForm = document.querySelector('.review-form form');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('review-name').value;
            const email = document.getElementById('review-email').value;
            const title = document.getElementById('review-title').value;
            const text = document.getElementById('review-text').value;
            const rating = parseInt(document.getElementById('rating-value').value);

            if (rating === 0) {
                showAlert('Please select a rating', 'error');
                return;
            }

            // In a real app, this would send to server
            const newReview = {
                author: name,
                rating: rating,
                date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
                title: title,
                text: text
            };

            // Add to reviews list
            addReview(newReview);
            
            // Reset form
            this.reset();
            resetRatingStars();
            
            showAlert('Thank you for your review!', 'success');
        });
    }

    // Rating stars interaction
    const ratingStars = document.querySelectorAll('.rating-input i');
    ratingStars.forEach(star => {
        star.addEventListener('click', function() {
            const rating = parseInt(this.getAttribute('data-rating'));
            document.getElementById('rating-value').value = rating;
            updateRatingStars(rating);
        });
    });

    // Thumbnail image click
    const thumbnails = document.querySelectorAll('.thumbnail-images img');
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            const mainImage = document.getElementById('mainProductImage');
            mainImage.src = this.src.replace('-thumb', '');
            
            // Update active thumbnail
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Initialize first thumbnail as active
    if (thumbnails.length > 0) {
        thumbnails[0].classList.add('active');
    }

    // Load related products
    loadRelatedProducts(product.relatedProducts);

    // Helper function to initialize product details
    function initProductDetails(product) {
        document.getElementById('productName').textContent = product.name;
        document.querySelector('.current-price').textContent = `KES ${product.price.toLocaleString()}`;
        
        if (product.originalPrice) {
            document.querySelector('.original-price').textContent = `KES ${product.originalPrice.toLocaleString()}`;
            const discount = product.originalPrice - product.price;
            document.querySelector('.discount').textContent = `(Save KES ${discount.toLocaleString()})`;
        } else {
            document.querySelector('.original-price').style.display = 'none';
            document.querySelector('.discount').style.display = 'none';
        }

        // Set product description
        document.querySelector('#description .tab-pane').innerHTML = `
            <h3>Product Description</h3>
            <p>${product.description}</p>
        `;

        // Set specifications
        const specsTable = document.querySelector('#specifications table');
        product.specifications.forEach(spec => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <th>${spec.name}</th>
                <td>${spec.value}</td>
            `;
            specsTable.appendChild(row);
        });

        // Set reviews
        const reviewsList = document.querySelector('.review-list');
        product.reviews.forEach(review => {
            const reviewItem = document.createElement('div');
            reviewItem.className = 'review-item';
            reviewItem.innerHTML = `
                <div class="review-header">
                    <div class="review-author">${review.author}</div>
                    <div class="review-rating">
                        ${getRatingStars(review.rating)}
                    </div>
                    <div class="review-date">${review.date}</div>
                </div>
                <h5 class="review-title">${review.title}</h5>
                <div class="review-text">
                    <p>${review.text}</p>
                </div>
            `;
            reviewsList.appendChild(reviewItem);
        });

        // Update rating summary
        updateRatingSummary(product.reviews);
    }

    // Helper function to update price based on storage option
    function updatePrice(additionalPrice) {
        const basePrice = product.price;
        const currentPriceElement = document.querySelector('.current-price');
        currentPriceElement.textContent = `KES ${(basePrice + additionalPrice).toLocaleString()}`;
    }

    // Helper function to add to cart (simulated)
    function addToCart(id, name, color, storage, price, quantity) {
        // In a real app, this would add to localStorage or send to server
        console.log(`Added to cart: ${name} (${color}, ${storage}) x${quantity} at KES ${price}`);
    }

    // Helper function to add review
    function addReview(review) {
        const reviewsList = document.querySelector('.review-list');
        const reviewItem = document.createElement('div');
        reviewItem.className = 'review-item';
        reviewItem.innerHTML = `
            <div class="review-header">
                <div class="review-author">${review.author}</div>
                <div class="review-rating">
                    ${getRatingStars(review.rating)}
                </div>
                <div class="review-date">${review.date}</div>
            </div>
            <h5 class="review-title">${review.title}</h5>
            <div class="review-text">
                <p>${review.text}</p>
            </div>
        `;
        reviewsList.prepend(reviewItem);
        
        // Update rating summary
        const allReviews = [...product.reviews, review];
        updateRatingSummary(allReviews);
    }

    // Helper function to update rating summary
    function updateRatingSummary(reviews) {
        const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
        const ratingCount = reviews.length;
        
        document.querySelector('.rating-value').textContent = averageRating.toFixed(1);
        document.querySelector('.rating-stars').innerHTML = getRatingStars(averageRating);
        document.querySelector('.rating-count').textContent = `Based on ${ratingCount} reviews`;
        
        // Update rating distribution
        const ratingDistribution = [0, 0, 0, 0, 0]; // 1-5 stars
        reviews.forEach(review => {
            ratingDistribution[Math.floor(review.rating) - 1]++;
        });
        
        const ratingBars = document.querySelectorAll('.rating-bar .bar');
        ratingBars.forEach((bar, index) => {
            const percentage = (ratingDistribution[index] / ratingCount) * 100;
            bar.style.width = `${percentage}%`;
            bar.parentNode.nextElementSibling.textContent = ratingDistribution[index];
        });
    }

    // Helper function to update rating stars display
    function updateRatingStars(rating) {
        const stars = document.querySelectorAll('.rating-input i');
        stars.forEach((star, index) => {
            if (index < rating) {
                star.classList.remove('far');
                star.classList.add('fas');
                star.style.color = '#f39c12';
            } else {
                star.classList.remove('fas');
                star.classList.add('far');
                star.style.color = '#e0e0e0';
            }
        });
    }

    // Helper function to reset rating stars
    function resetRatingStars() {
        const stars = document.querySelectorAll('.rating-input i');
        stars.forEach(star => {
            star.classList.remove('fas');
            star.classList.add('far');
            star.style.color = '#e0e0e0';
        });
        document.getElementById('rating-value').value = 0;
    }

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

    // Helper function to load related products
    function loadRelatedProducts(relatedIds) {
        // In a real app, this would fetch from API
        const relatedProducts = [
            {
                id: 2,
                name: 'Samsung Galaxy S23+',
                price: 129999,
                originalPrice: 139999,
                image: 'product5.jpg',
                rating: 4.6,
                reviews: 12
            },
            {
                id: 3,
                name: 'Samsung Galaxy Buds2 Pro',
                price: 24999,
                originalPrice: 27999,
                image: 'product6.jpg',
                rating: 4.4,
                reviews: 8
            },
            {
                id: 4,
                name: 'Samsung Galaxy Watch5 Pro',
                price: 49999,
                originalPrice: 54999,
                image: 'product7.jpg',
                rating: 4.3,
                reviews: 14
            },
            {
                id: 5,
                name: 'Samsung 55" QLED Smart TV',
                price: 89999,
                originalPrice: 99999,
                image: 'product8.jpg',
                rating: 4.7,
                reviews: 21
            }
        ].filter(p => relatedIds.includes(p.id));
        
        const relatedContainer = document.getElementById('related-products');
        if (relatedContainer) {
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
                            <a href="product-detail.html?id=${product.id}" class="view-details">View Details</a>
                        </div>
                    </div>
                `;
                relatedContainer.appendChild(productCard);
            });
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
            cartCount.textContent = count;
            
            // Animate the cart icon
            const cartIcon = document.querySelector('.cart-icon');
            cartIcon.classList.add('animate');
            setTimeout(() => {
                cartIcon.classList.remove('animate');
            }, 500);
        }
    }

    // Initialize product from URL parameter (simulated)
    function initProductFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        
        // In a real app, would fetch product details from API based on ID
        console.log(`Loading product with ID: ${productId}`);
    }

    initProductFromURL();
});