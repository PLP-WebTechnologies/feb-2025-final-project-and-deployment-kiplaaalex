document.addEventListener('DOMContentLoaded', function() {
    // Product filtering functionality
    const categoryLinks = document.querySelectorAll('.category-list a');
    const priceRangeSlider = document.getElementById('priceRange');
    const brandCheckboxes = document.querySelectorAll('input[name="brand"]');
    const applyFiltersBtn = document.querySelector('.apply-filters');
    const resetFiltersBtn = document.querySelector('.reset-filters');
    const sortSelect = document.getElementById('sortProducts');
    const viewButtons = document.querySelectorAll('.view-btn');
    const productsGrid = document.getElementById('products-grid');
    
    // Sample product data (in a real app, this would come from an API)
    const products = [
        {
            id: 1,
            name: 'Samsung Galaxy S23 Ultra 5G',
            price: 159999,
            originalPrice: 179999,
            category: 'electronics',
            brand: 'samsung',
            rating: 4.5,
            reviews: 24,
            image: 'product1.jpg'
        },
        {
            id: 2,
            name: 'Apple Watch Series 8',
            price: 59999,
            originalPrice: 64999,
            category: 'electronics',
            brand: 'apple',
            rating: 4.8,
            reviews: 18,
            image: 'product2.jpg'
        },
        {
            id: 3,
            name: 'Sony WH-1000XM5 Headphones',
            price: 34999,
            originalPrice: 39999,
            category: 'electronics',
            brand: 'sony',
            rating: 4.7,
            reviews: 32,
            image: 'product3.jpg'
        },
        {
            id: 4,
            name: 'Nike Air Max 270',
            price: 12999,
            originalPrice: 14999,
            category: 'fashion',
            brand: 'nike',
            rating: 4.6,
            reviews: 45,
            image: 'product4.jpg'
        },
        {
            id: 5,
            name: 'Adidas Ultraboost 21',
            price: 13999,
            originalPrice: 15999,
            category: 'fashion',
            brand: 'adidas',
            rating: 4.5,
            reviews: 38,
            image: 'product5.jpg'
        },
        {
            id: 6,
            name: 'Tecno Camon 19 Pro',
            price: 29999,
            originalPrice: 32999,
            category: 'electronics',
            brand: 'tecno',
            rating: 4.2,
            reviews: 15,
            image: 'product6.jpg'
        },
        {
            id: 7,
            name: 'Infinix Hot 12 Play',
            price: 16999,
            originalPrice: 18999,
            category: 'electronics',
            brand: 'infinix',
            rating: 4.0,
            reviews: 22,
            image: 'product7.jpg'
        },
        {
            id: 8,
            name: 'Dettol Antiseptic Liquid',
            price: 499,
            originalPrice: 599,
            category: 'groceries',
            brand: 'dettol',
            rating: 4.8,
            reviews: 126,
            image: 'product8.jpg'
        }
    ];
    
    // Load products on page load
    loadProducts(products);
    
    // Category filter
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active state
            categoryLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
            
            // Filter products
            const category = this.getAttribute('data-category');
            filterProducts(category);
        });
    });
    
    // Price range filter
    priceRangeSlider.addEventListener('input', function() {
        document.querySelector('.price-values span:last-child').textContent = 
            `KES ${parseInt(this.value).toLocaleString()}`;
    });
    
    // Apply filters button
    applyFiltersBtn.addEventListener('click', function() {
        filterProducts();
    });
    
    // Reset filters button
    resetFiltersBtn.addEventListener('click', function() {
        // Reset category
        categoryLinks.forEach(l => l.classList.remove('active'));
        document.querySelector('.category-list a[data-category="all"]').classList.add('active');
        
        // Reset price range
        priceRangeSlider.value = priceRangeSlider.max;
        document.querySelector('.price-values span:last-child').textContent = 
            `KES ${parseInt(priceRangeSlider.max).toLocaleString()}`;
        
        // Reset brand filters
        brandCheckboxes.forEach(cb => cb.checked = false);
        
        // Reset sort
        sortSelect.value = 'default';
        
        // Reset view
        viewButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector('.view-btn.grid-view').classList.add('active');
        productsGrid.classList.remove('list-view');
        
        // Show all products
        loadProducts(products);
    });
    
    // Sort products
    sortSelect.addEventListener('change', function() {
        sortProducts(this.value);
    });
    
    // View toggle
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            viewButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            if (this.classList.contains('grid-view')) {
                productsGrid.classList.remove('list-view');
            } else {
                productsGrid.classList.add('list-view');
            }
        });
    });
    
    // Filter products based on selected filters
    function filterProducts(category = 'all') {
        const maxPrice = parseInt(priceRangeSlider.value);
        const selectedBrands = Array.from(brandCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        
        let filteredProducts = products;
        
        // Filter by category
        if (category !== 'all') {
            filteredProducts = filteredProducts.filter(
                product => product.category === category
            );
        }
        
        // Filter by price
        filteredProducts = filteredProducts.filter(
            product => product.price <= maxPrice
        );
        
        // Filter by brand
        if (selectedBrands.length > 0) {
            filteredProducts = filteredProducts.filter(
                product => selectedBrands.includes(product.brand)
            );
        }
        
        // Load filtered products
        loadProducts(filteredProducts);
    }
    
    // Sort products
    function sortProducts(sortBy) {
        const currentProducts = Array.from(
            document.querySelectorAll('.product-card')
        ).map(el => {
            return {
                element: el,
                price: parseInt(el.querySelector('.current-price').textContent.replace('KES ', '').replace(',', '')),
                name: el.querySelector('h3').textContent,
                rating: parseFloat(el.querySelector('.product-rating').getAttribute('data-rating'))
            };
        });
        
        currentProducts.sort((a, b) => {
            switch (sortBy) {
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                case 'name-asc':
                    return a.name.localeCompare(b.name);
                case 'name-desc':
                    return b.name.localeCompare(a.name);
                case 'rating':
                    return b.rating - a.rating;
                default:
                    return 0;
            }
        });
        
        // Reattach sorted products
        productsGrid.innerHTML = '';
        currentProducts.forEach(item => {
            productsGrid.appendChild(item.element);
        });
    }
    
    // Load products into the grid
    function loadProducts(productsToLoad) {
        productsGrid.innerHTML = '';
        
        if (productsToLoad.length === 0) {
            productsGrid.innerHTML = `
                <div class="no-products">
                    <i class="fas fa-search"></i>
                    <h3>No products found</h3>
                    <p>Try adjusting your filters to find what you're looking for</p>
                    <button class="btn reset-filters">Reset Filters</button>
                </div>
            `;
            return;
        }
        
        productsToLoad.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    ${product.originalPrice ? '<span class="product-badge">Sale</span>' : ''}
                    <span class="product-wishlist"><i class="far fa-heart"></i></span>
                    <img src="images/products/${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-price">
                        <span class="current-price">KES ${product.price.toLocaleString()}</span>
                        ${product.originalPrice ? `<span class="original-price">KES ${product.originalPrice.toLocaleString()}</span>` : ''}
                    </div>
                    <div class="product-rating" data-rating="${product.rating}">
                        ${getRatingStars(product.rating)} (${product.reviews})
                    </div>
                    <div class="product-actions">
                        <button class="add-to-cart">Add to Cart</button>
                        <a href="product-detail.html?id=${product.id}" class="view-details">View Details</a>
                    </div>
                </div>
            `;
            productsGrid.appendChild(productCard);
        });
        
        // Add event listeners to new elements
        addProductEventListeners();
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
    
    // Add event listeners to product cards
    function addProductEventListeners() {
        // Add to cart buttons
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                updateCartCount(1);
                showAlert('Product added to cart!', 'success');
            });
        });
        
        // Wishlist buttons
        document.querySelectorAll('.product-wishlist').forEach(btn => {
            btn.addEventListener('click', function() {
                const icon = this.querySelector('i');
                
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
            });
        });
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
    
    // Initialize filters from URL parameters
    function initFiltersFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        
        if (category) {
            const categoryLink = document.querySelector(`.category-list a[data-category="${category}"]`);
            if (categoryLink) {
                categoryLink.click();
            }
        }
    }
    
    initFiltersFromURL();
});

// Add this at the beginning of products.js (after the product data)
function filterProductsBySearch(products, searchTerm) {
    if (!searchTerm) return products;
    
    const searchTerms = searchTerm.toLowerCase().split(' ');
    return products.filter(product => {
        const productText = (
            product.name.toLowerCase() + ' ' + 
            product.category.toLowerCase() + ' ' + 
            product.brand.toLowerCase()
        );
        return searchTerms.every(term => productText.includes(term));
    });
}

// Modify the existing filterProducts function to include search
function filterProducts(category = 'all') {
    const maxPrice = parseInt(priceRangeSlider.value);
    const selectedBrands = Array.from(brandCheckboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
    
    // Get search term from URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchTerm = urlParams.get('search') || '';
    
    let filteredProducts = products;
    
    // Apply search filter first
    filteredProducts = filterProductsBySearch(filteredProducts, searchTerm);
    
    // Then apply other filters
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(
            product => product.category === category
        );
    }
    
    filteredProducts = filteredProducts.filter(
        product => product.price <= maxPrice
    );
    
    if (selectedBrands.length > 0) {
        filteredProducts = filteredProducts.filter(
            product => selectedBrands.includes(product.brand)
        );
    }
    
    loadProducts(filteredProducts);
    
    // Update search results header
    updateSearchHeader(searchTerm, filteredProducts.length);
}

// Add this helper function
function updateSearchHeader(searchTerm, resultCount) {
    const searchHeader = document.querySelector('.search-results-header');
    if (!searchHeader) return;
    
    if (searchTerm) {
        searchHeader.innerHTML = `
            <h2>Search Results for "${searchTerm}"</h2>
            <p>${resultCount} ${resultCount === 1 ? 'item' : 'items'} found</p>
        `;
    } else {
        searchHeader.innerHTML = '';
    }
}