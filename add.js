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