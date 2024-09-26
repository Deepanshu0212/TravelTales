document.addEventListener('DOMContentLoaded', () => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
        const data = JSON.parse(localStorage.getItem('data')) || [];
        let userData = data.find(user => user.name === currentUser.name) || {};

        const userName = document.getElementById('userName');
        const userDescription = document.getElementById('userDescription');
        const blogCount = document.getElementById('blogCount');
        const profileImage = document.getElementById('profileImage');
        const editProfileBtn = document.getElementById('editProfileBtn');
        const editForm = document.getElementById('editForm');
        const editName = document.getElementById('editName');
        const editDescription = document.getElementById('editDescription');
        const editImage = document.getElementById('editImage');

        function updateProfile() {
            userName.textContent = userData.name || currentUser.name;
            userDescription.textContent = userData.description || "Traveler | Blogger";
            blogCount.textContent = userData.blogs?.length || 0;
            profileImage.src = userData.image || "https://via.placeholder.com/150";
        }

        function toggleEditMode() {
            if (editForm.style.display === 'none' || editForm.style.display === '') {
                editForm.style.display = 'block';
                editProfileBtn.textContent = 'Cancel';
                editName.value = userData.name || currentUser.name;
                editDescription.value = userData.description || "";
            } else {
                editForm.style.display = 'none';
                editProfileBtn.textContent = 'Edit Profile';
            }
        }

        editProfileBtn.addEventListener('click', toggleEditMode);

        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const imageFile = editImage.files[0];
            if (imageFile) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    userData = {
                        ...userData,
                        name: editName.value,
                        description: editDescription.value,
                        image: event.target.result // Set the image as base64 string
                    };
                    saveUserData();
                };
                reader.readAsDataURL(imageFile);
            } else {
                userData = {
                    ...userData,
                    name: editName.value,
                    description: editDescription.value
                };
                saveUserData();
            }
        });

        function saveUserData() {
            // Update localStorage
            const userIndex = data.findIndex(user => user.name === currentUser.name);
            if (userIndex !== -1) {
                data[userIndex] = userData;
            } else {
                data.push(userData);
            }
            localStorage.setItem('data', JSON.stringify(data));
            
            updateProfile();
            toggleEditMode();
        }

        updateProfile();
    

    let blogs = userData.blogs || [];
    let drafts = userData.drafts || [];

   console.log(blogs);
   
    // Blog carousel elements
    const blogCarouselTrack = document.querySelector('.blogs-carousel-track');
    const blogPrevButton = document.querySelector('.blog-carousel-prev');
    const blogNextButton = document.querySelector('.blog-carousel-next');

    // Draft carousel elements
    const draftCarouselTrack = document.querySelector('.draft-carousel-track');
    const draftPrevButton = document.querySelector('.draft-carousel-prev');
    const draftNextButton = document.querySelector('.draft-carousel-next');

    const itemsPerView = 3; // Number of items visible in the carousel
    let blogIndex = 0;
    let draftIndex = 0;

    // Function to render the blog carousel
    function renderCarousel(items, container, type) {
        container.innerHTML = ''; // Clear existing items
        items.forEach((item, index) => {
            if (index < 5) {
                const carouselItem = document.createElement('div');
                carouselItem.classList.add('carousel-item');
                carouselItem.innerHTML = `
                    <img src="${item.image}" alt="${item.title}">
                    <div class="carousel-content">
                        <h3>${item.title}</h3>
                        <p>${item.content.substring(0, 100)}...</p>
                        <small><i class="far fa-calendar-alt"></i> ${new Date(item.createdAt).toLocaleDateString()}</small>
                        <div class="tags">
                            ${item.tags.map(tag => `<span class="tag"><i class="fas fa-tag"></i> ${tag}</span>`).join('')}
                        </div>
                        <div class="card-actions">
                            <button onclick="editBlog(${index}, '${type}')">Edit</button>
                            <button onclick="deleteBlog(${index}, '${type}')">Delete</button>
                        </div>
                    </div>
                `;
                container.appendChild(carouselItem);

            }
        });
    }

    // Function to update the carousel view
    function updateCarousel(items, container, index, prevButton, nextButton) {
        const totalItems = items.length;
        const visibleItems = Array.from(container.children);

        visibleItems.forEach((item, idx) => {
            if (idx >= index && idx < index + itemsPerView) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.classList.add('active');
                }, 50 * (idx - index));
            } else {
                item.classList.remove('active');
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });

        prevButton.style.display = index > 0 ? 'block' : 'none';
        nextButton.style.display = index + itemsPerView < totalItems ? 'block' : 'none';
    }

    // Event listeners for Blog Carousel
    blogNextButton.addEventListener('click', function () {
        if (blogIndex + itemsPerView < blogData.length) {
            blogIndex++;
            updateCarousel(blogData, blogCarouselTrack, blogIndex, blogPrevButton, blogNextButton);
        }
    });

    blogPrevButton.addEventListener('click', function () {
        if (blogIndex > 0) {
            blogIndex--;
            updateCarousel(blogData, blogCarouselTrack, blogIndex, blogPrevButton, blogNextButton);
        }
    });

    // Event listeners for Draft Carousel
    draftNextButton.addEventListener('click', function () {
        if (draftIndex + itemsPerView < draftData.length) {
            draftIndex++;
            updateCarousel(draftData, draftCarouselTrack, draftIndex, draftPrevButton, draftNextButton);
        }
    });

    draftPrevButton.addEventListener('click', function () {
        if (draftIndex > 0) {
            draftIndex--;
            updateCarousel(draftData, draftCarouselTrack, draftIndex, draftPrevButton, draftNextButton);
        }
    });

    // Initialize carousels with blog and draft data
    renderCarousel(blogs, blogCarouselTrack, 'blog');
    updateCarousel(blogs, blogCarouselTrack, blogIndex, blogPrevButton, blogNextButton);

    renderCarousel(drafts, draftCarouselTrack, 'draft');
    updateCarousel(drafts, draftCarouselTrack, draftIndex, draftPrevButton, draftNextButton);





    

    // Edit blog function
    // Edit blog function
window.editBlog = function (index, type) {
    const blog = (type === 'blog') ? userData.blogs[index] : userData.drafts[index];
    openBlogModal(blog, index, type);
};

// Delete blog function
window.deleteBlog = function (index, type) {
    if (confirm("Are you sure you want to delete this blog?")) {
        if (type === 'blog') {
            userData.blogs.splice(index, 1);
        } else {
            userData.drafts.splice(index, 1);
        }
        updateLocalStorage();
        location.reload();
    }
};

// Blog edit handling
const blogPopup = document.getElementById('blog-popup');
const closeBtn = document.querySelector('.close-btn');
const blogForm = document.getElementById('blog-form');

function openBlogModal(blog, index, type) {
    blogPopup.style.display = 'block';
    document.getElementById('blog-title').value = blog.title;
    document.getElementById('blog-content').value = blog.content;
    document.getElementById('blog-continent').value = blog.continent;
    document.getElementById('blog-country').value = blog.country;
    document.getElementById('blog-place').value = blog.place;

    // Uncheck all tags first
    const tagInputs = document.querySelectorAll('input[name="blog-tags"]');
    tagInputs.forEach(input => input.checked = false);

    // Check the appropriate tags
    blog.tags.forEach(tag => {
        const tagInput = document.querySelector(`input[name="blog-tags"][value="${tag}"]`);
        if (tagInput) {
            tagInput.checked = true;
        }
    });

    const publishBtn = document.getElementById('publish-btn');
    
    if (type === 'draft') {
        publishBtn.textContent = 'Publish Blog';
        publishBtn.onclick = (e) => {
            e.preventDefault();
            publishDraft(index);
        };
    } else {
        publishBtn.textContent = 'Update Blog';
        publishBtn.onclick = null;
    }

    blogForm.onsubmit = (e) => {
        e.preventDefault();
        
        const updatedBlog = {
            title: document.getElementById('blog-title').value,
            content: document.getElementById('blog-content').value,
            continent: document.getElementById('blog-continent').value,
            country: document.getElementById('blog-country').value,
            place: document.getElementById('blog-place').value,
            tags: Array.from(document.querySelectorAll('input[name="blog-tags"]:checked')).map(tag => tag.value),
            image: null,
            createdAt: new Date().toISOString()
        };
        
        const imageInput = document.getElementById('blog-image');
    
        if (imageInput.files[0]) {
            const reader = new FileReader();
    
            reader.onload = function (event) {
                updatedBlog.image = event.target.result;
    
                updateBlogData(type, index, updatedBlog);
            };
    
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            updateBlogData(type, index, updatedBlog);
        }

        blogPopup.style.display = 'none';
    };
}

function updateBlogData(type, index, updatedBlog) {
    if (type === 'blog') {
        userData.blogs[index] = updatedBlog;
    } else {
        userData.drafts[index] = updatedBlog;
    }

    updateLocalStorage();
    location.reload();
}

function publishDraft(index) {
    const draft = userData.drafts[index];
    userData.blogs.push(draft);
    userData.drafts.splice(index, 1);
    updateLocalStorage();
    location.reload();
}

closeBtn.onclick = () => {
    blogPopup.style.display = 'none';
};

window.onclick = (e) => {
    if (e.target === blogModal) {
        blogModal.style.display = 'none';
    }
};

// Update localStorage
function updateLocalStorage() {
    const updatedData = data.map(user => (user.name === currentUser.name) ? userData : user);
    localStorage.setItem('data', JSON.stringify(updatedData));
}
});
