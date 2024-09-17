        let blogs = blogData;
        console.log(blogData);

        function renderBlogs(blogsToRender) {
            const blogGrid = document.getElementById('blogGrid');
            blogGrid.innerHTML = '';
            
            blogsToRender.forEach(blog => {
                const blogCard = document.createElement('div');
                blogCard.className = 'blog-card fade-in';
                blogCard.innerHTML = `
                    <img src="${blog.image}" alt="${blog.title}" class="blog-image">
                    <div class="blog-content">
                        <h2 class="blog-title">${blog.title}</h2>
                        <div class="blog-meta">
                            <span>${blog.destination}</span>
                            <span>${blog.date}</span>
                        </div>
                        <p>${blog.content.substring(0, 100)}...</p>
                        <div class="tags">
                            ${blog.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    </div>
                `;
                blogGrid.appendChild(blogCard);
            });
        }

        function filterBlogs() {
            const searchTerm = document.getElementById('searchInput').value.toLowerCase();
            const tagFilter = document.getElementById('tagFilter').value.toLowerCase();
            
            const filteredBlogs = blogs.filter(blog => 
                blog.destination.toLowerCase().includes(searchTerm) &&
                (tagFilter === '' || blog.tags.includes(tagFilter))
            );
            
            renderBlogs(filteredBlogs);
        }

        document.getElementById('searchInput').addEventListener('input', filterBlogs);
        document.getElementById('tagFilter').addEventListener('change', filterBlogs);

        // Initial render
        renderBlogs(blogs);