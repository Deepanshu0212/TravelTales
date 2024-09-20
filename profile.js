document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || {};
    const data = JSON.parse(localStorage.getItem('data')) || [];

    const userData = data.find(user => user.name === currentUser.name);
    const blogsContainer = document.getElementById('blogsContainer');
    const draftsContainer = document.getElementById('draftsContainer');

    // Populate user profile
    document.getElementById('userName').textContent = currentUser.name;
    document.getElementById('userDescription').textContent = userData?.description || "Traveler | Blogger";

    // Show blog and draft counts
    document.getElementById('blogCount').textContent = userData?.blogs.length || 0;

    // Display user's blogs
    if (userData && userData.blogs.length > 0) {
        userData.blogs.forEach((blog, index) => {
            blogsContainer.appendChild(createBlogCard(blog, index, 'blog'));
        });
    }

    // Display user's drafts
    if (userData && userData.drafts.length > 0) {
        userData.drafts.forEach((draft, index) => {
            draftsContainer.appendChild(createBlogCard(draft, index, 'draft'));
        });
    }

    // Function to create a blog card
    function createBlogCard(blog, index, type) {
        const card = document.createElement('div');
        card.classList.add('blog-card');
        card.innerHTML = `
            <img src="${blog.image}" alt="${blog.title}">
            <div>
            <h4>${blog.title}</h4>
            <p>${blog.content.substring(0, 100)}...</p>
            <small><i class="far fa-calendar-alt"></i> ${new Date(blog.date).toLocaleDateString()}</small>
            <div class="tags">
            ${blog.tags.map(tag => `<span class="tag"><i class="fas fa-tag"></i> ${tag}</span>`).join('')}
            </div>
            </div
            <div class="card-actions">
                <button onclick="editBlog(${index}, '${type}')">Edit</button>
                <button onclick="deleteBlog(${index}, '${type}')">Delete</button>
            </div>
        `;
        return card;
    }

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

    // Blog modal handling
    const blogModal = document.getElementById('blogModal');
    const closeBtn = document.querySelector('.close');
    const blogForm = document.getElementById('blogForm');

    function openBlogModal(blog, index, type) {
        blogModal.style.display = 'block';
        document.getElementById('blogTitle').value = blog.title;
        document.getElementById('blogContent').value = blog.content;
        
        blogForm.onsubmit = (e) => {
            e.preventDefault();
            const updatedBlog = {
                title: document.getElementById('blogTitle').value,
                content: document.getElementById('blogContent').value
            };
            if (type === 'blog') {
                userData.blogs[index] = updatedBlog;
            } else {
                userData.drafts[index] = updatedBlog;
            }
            updateLocalStorage();
            location.reload();
        };
    }

    closeBtn.onclick = () => {
        blogModal.style.display = 'none';
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
