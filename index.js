
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
