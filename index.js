
document.addEventListener('scroll', function() {
    const aboutSection = document.querySelector('.about_section');
    const imageSection = document.querySelector('.image_section');
    const contentSection = document.querySelector('.content_section');
    
    // Get the position of the about section relative to the viewport
    const sectionPosition = aboutSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3; // Adjust as necessary

    // When section is scrolled into view, make the sections visible
    if (sectionPosition < screenPosition) {
        imageSection.classList.add('visible');
        contentSection.classList.add('visible');
    }
});


    document.addEventListener('DOMContentLoaded', function() {
        const carouselTrack = document.querySelector('.carousel-track');
        const prevButton = document.querySelector('.carousel-prev');
        const nextButton = document.querySelector('.carousel-next');
        let blogs = blogData; 

        const itemsPerView = 4;
        let currentIndex = 0;

        function renderCarousel(blogs, container) {
            container.innerHTML = '';
            blogs.forEach((blog, index) => {
                if (index < 5) {
                    const blogItem = document.createElement('div');
                    blogItem.classList.add('carousel-item');
                    blogItem.innerHTML = `
                        <img src="${blog.image}" alt="${blog.title}">
                        <div class="carousel-content">
                            <h3>${blog.title}</h3>
                            <p>${blog.content}</p>
                            <small><i class="far fa-calendar-alt"></i> ${new Date(blog.date).toLocaleDateString()}</small>
                            <div class="tags">
                                ${blog.tags.map(tag => `<span class="tag"><i class="fas fa-tag"></i> ${tag}</span>`).join('')}
                            </div>
                        </div>
                    `;
                    container.appendChild(blogItem);
                }
            });

            const seeAllCard = document.createElement('div');
            seeAllCard.classList.add('carousel-item', 'see-all-card');
            seeAllCard.innerHTML = `
                <div class="carousel-content">
                    <h3><i class="fas fa-book-open"></i> See All Blogs</h3>
                    <p>Explore our entire collection</p>
                    <div class="see-all-arrow"><i class="fas fa-arrow-right"></i></div>
                </div>
            `;
            seeAllCard.addEventListener('click', function() {
                console.log('Navigate to all blogs page');
            });
            container.appendChild(seeAllCard);

            updateCarousel();
        }

        function updateCarousel() {
            const items = document.querySelectorAll('.carousel-item');
            const totalItems = items.length;
            
            items.forEach((item, index) => {
                if (index >= currentIndex && index < currentIndex + itemsPerView) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.classList.add('active');
                    }, 50 * (index - currentIndex));
                } else {
                    item.classList.remove('active');
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });

            prevButton.style.display = currentIndex > 0 ? 'block' : 'none';
            nextButton.style.display = currentIndex + itemsPerView < totalItems ? 'block' : 'none';
        }

        nextButton.addEventListener('click', function() {
            const items = document.querySelectorAll('.carousel-item');
            if (currentIndex + itemsPerView < items.length) {
                currentIndex++;
                updateCarousel();
            }
        });

        prevButton.addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
        });

        renderCarousel(blogs, carouselTrack);
    
    });



    document.addEventListener('DOMContentLoaded', function() {
        const writeBlogBtn = document.getElementById('write-blog-btn');
        const blogPopup = document.getElementById('blog-popup');
        const closeBtn = document.querySelector('.close-btn');
        const blogForm = document.getElementById('blog-form');
        const saveDraftBtn = document.getElementById('save-draft-btn');
    
        let blogs = JSON.parse(localStorage.getItem('blogs')) || [];
        let drafts = JSON.parse(localStorage.getItem('drafts')) || [];
    
        writeBlogBtn.addEventListener('click', function() {
            blogPopup.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    
        closeBtn.addEventListener('click', function() {
            blogPopup.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    
        window.addEventListener('click', function(event) {
            if (event.target == blogPopup) {
                blogPopup.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    
        blogForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveBlog(false);
        });
    
        saveDraftBtn.addEventListener('click', function() {
            saveBlog(true);
        });
    
        function saveBlog(isDraft) {
            const selectedTags = Array.from(document.querySelectorAll('input[name="blog-tags"]:checked'))
            .map(checkbox => checkbox.value);
    
        const blog = {
            title: document.getElementById('blog-title').value,
            content: document.getElementById('blog-content').value,
            continent: document.getElementById('blog-continent').value,
            country: document.getElementById('blog-country').value,
            place: document.getElementById('blog-place').value,
            tags: selectedTags,
            image: document.getElementById('blog-image').files[0] ? URL.createObjectURL(document.getElementById('blog-image').files[0]) : null,
            createdAt: new Date().toISOString()
        };
    
            if (isDraft) {
                drafts.push(blog);
                localStorage.setItem('drafts', JSON.stringify(drafts));
                alert('Blog saved as draft!');
            } else {
                blogs.push(blog);
                localStorage.setItem('blogs', JSON.stringify(blogs));
                alert('Blog published successfully!');
            }
    
            blogForm.reset();
            blogPopup.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });



    

    // login-signup javascript:-
    const loginButton = document.getElementById('loginButton');
        const closeButton = document.getElementById('closeButton');
        const container = document.getElementById('container');
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const signupForm = document.getElementById('signupForm');
        const signinForm = document.getElementById('signinForm');

        loginButton.addEventListener('click', () => {
            container.classList.add('active');
        });

        closeButton.addEventListener('click', () => {
            container.classList.remove('active');
        });

        signUpButton.addEventListener('click', () => {
            container.classList.add("right-panel-active");
        });

        signInButton.addEventListener('click', () => {
            container.classList.remove("right-panel-active");
        });

        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            
            // Store user data in local storage
            localStorage.setItem('user', JSON.stringify({ name, email, password }));
            alert('Account created successfully!');
            container.classList.remove("right-panel-active");
        });

        signinForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('signinEmail').value;
            const password = document.getElementById('signinPassword').value;
            
            // Retrieve user data from local storage
            const user = JSON.parse(localStorage.getItem('user'));
            
            if (user && user.email === email && user.password === password) {
                alert('Logged in successfully!');
                container.classList.remove('active');
                loginButton.textContent = user.name; // Change login button text to user's name
            } else {
                alert('Invalid email or password');
            }
        });

        // Add floating animation to form inputs
        const inputs = document.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.style.transform = 'translateY(-5px)';
            });
            input.addEventListener('blur', () => {
                input.style.transform = 'translateY(0)';
            });
        });

        // Add pulse animation to buttons
        const buttons = document.querySelectorAll('button');
        buttons.forEach(button => {
            button.addEventListener('mouseover', () => {
                button.style.animation = 'pulse 0.5s';
            });
            button.addEventListener('animationend', () => {
                button.style.animation = '';
            });
        });

        // Add keyframe animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);

        // Check if user is already logged in
        window.addEventListener('load', () => {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                loginButton.textContent = user.name;
            }
        });