
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


// for login signup
const loginButton = document.getElementById('loginButton');
const closeButton = document.getElementById('closeButton');
const container = document.getElementById('container');
const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const signupForm = document.getElementById('signupForm');
const signinForm = document.getElementById('signinForm');
const logoutButton = document.getElementById('logoutButton');

// Check if users and current user are already in localStorage
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = JSON.parse(localStorage.getItem('currentUser'));

loginButton.addEventListener('click', () => {
    if (loginButton.textContent == "Login") {
        container.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        userDropdown.style.display = userDropdown.style.display === 'none' ? 'block' : 'none';
    }
});

logoutButton.addEventListener('click',()=>{
    localStorage.removeItem("currentUser"); // Remove current user
    currentUser = null;
    // Change button text to "Login"
    loginButton.textContent = "Login";
    alert("User logged out");
    userDropdown.style.display= 'none';
    window.location.href = '../index.html';
});


closeButton.addEventListener('click', () => {
    container.classList.remove('active');
    document.body.style.overflow = 'auto';
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

    // Check if the email already exists
    const userExists = users.some(user => user.email === email);
    if (userExists) {
        alert('Email is already registered. Please sign in.');
    } else {
        // Add new user to the array of users
        const newUser = { name, email, password };
        users.push(newUser);

        // Update the users array in local storage
        localStorage.setItem('users', JSON.stringify(users));
        alert('Account created successfully!');
        container.classList.remove("right-panel-active");
    }

    document.getElementById('signupName').value = "";
    document.getElementById('signupName').value = "";
    document.getElementById('signupName').value = "";

});

signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('signinEmail').value;
    const password = document.getElementById('signinPassword').value;

    // Find the user in the array of users
    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        alert('Logged in successfully!');
        container.classList.remove('active');

        // Set the current user in local storage and update button text
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        loginButton.textContent = user.name; // Change login button text to user's name
    } else {
        alert('Invalid email or password');
    }

    document.getElementById('signinEmail').value= "";
    document.getElementById('signinPassword').value = "";
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
    if (currentUser) {
        loginButton.textContent = currentUser.name; // Change login button text to user's name
    } else {
        loginButton.textContent = "Login"; // Default to "Login"
    }
});



    document.addEventListener('DOMContentLoaded', function carousel() {
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

                const currentUser = localStorage.getItem('currentUser');
                const container = document.getElementById('container');
                console.log(currentUser);
                if (currentUser) {
                    console.log("hii");
                    window.location.href = '../Blog/blog.html';
                } else {
                    container.classList.add('active'); 
                    document.body.style.overflow = 'hidden';
                }

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
   



    



document.getElementById('blogLink').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default action of navigating to blog.html
    
    // Check if the current user is logged in
    const currentUser = localStorage.getItem('currentUser');
    
    if (currentUser) {
        window.location.href = '../Blog/blog.html';
    } else {
        container.classList.add('active'); 
        document.body.style.overflow = 'hidden';
    }
});

document.getElementById('guideLink').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default action of navigating to blog.html
    
    // Check if the current user is logged in
    const currentUser = localStorage.getItem('currentUser');
    
    if (currentUser) {
        window.location.href = '../Guide/guide.html';
    } else {
        container.classList.add('active'); 
        document.body.style.overflow = 'hidden';
    }
});

document.getElementById('aboutLink').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default action of navigating to blog.html
    
    // Check if the current user is logged in
    const currentUser = localStorage.getItem('currentUser');
    
    if (currentUser) {
        window.location.href = '../AboutUs/about.html';
    } else {
        container.classList.add('active'); 
        document.body.style.overflow = 'hidden';
    }
});






document.addEventListener('DOMContentLoaded', function() {
    const writeBlogBtn = document.getElementById('write-blog-btn');
    const blogPopup = document.getElementById('blog-popup');
    const closeBtn = document.querySelector('.close-btn');
    const blogForm = document.getElementById('blog-form');
    const saveDraftBtn = document.getElementById('save-draft-btn');

    // Initialize data array from localStorage or an empty array
    let data = JSON.parse(localStorage.getItem('data')) || [];
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    writeBlogBtn.addEventListener('click', function() {
        if (currentUser) {

            console.log(currentUser);
            blogPopup.style.display = 'block';
            document.body.style.overflow = 'hidden';
        } else {
            console.log("Hello");
            container.classList.add('active'); 
            document.body.style.overflow = 'hidden';
        }
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
        saveBlog(false); // Publish blog
    });

    saveDraftBtn.addEventListener('click', function() {
        saveBlog(true); // Save blog as draft
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
        image: null,
        createdAt: new Date().toISOString()
    };

    const imageInput = document.getElementById('blog-image');
    
    // If an image file is selected, read it as Data URL
    if (imageInput.files[0]) {
        const reader = new FileReader();
        
        reader.onload = function(event) {
            blog.image = event.target.result; // Set the image as base64 string
            
            // Find the current user object in the data array
            let userIndex = data.findIndex(user => user.name === currentUser.name);

            if (userIndex === -1) {
                // If the user doesn't exist in the data array, create a new entry for them
                data.push({
                    name: currentUser.name,
                    drafts: [],
                    blogs: []
                });
                userIndex = data.length - 1; // Set index to the newly added user
            }

            // Save the blog to drafts or blogs array based on isDraft
            if (isDraft) {
                data[userIndex].drafts.push(blog);
                alert('Blog saved as draft!');
            } else {
                data[userIndex].blogs.push(blog);
                alert('Blog published successfully!');
            }

            // Store updated data in localStorage
            localStorage.setItem('data', JSON.stringify(data));

            blogForm.reset();
            blogPopup.style.display = 'none';
            document.body.style.overflow = 'auto';
        };

        reader.readAsDataURL(imageInput.files[0]); // Read the image file
    } else {
        // Handle the case where no image is selected
        // Proceed with saving the blog without an image
        // (this will be done when the reader.onload function executes)
        // Call the image save logic directly if no image is selected
        // to prevent user from getting blocked
        saveBlog(isDraft);
    }
}
});

class DestinationCarousel {
    constructor(containerId, destinations) {
        this.container = document.getElementById(containerId);
        this.destinations = destinations;
        this.currentDestination = 0;
        this.currentImage = 0;
        this.init();
    }

    init() {
        this.container.innerHTML = `
            <div class="carousel-dest">
                <h1>Some Top Destinations</h1>
                <div class="destination-display" id="destinationDisplay"></div>
                <div class="destination-list" id="destinationList"></div>
            </div>
        `;
        this.displayElement = this.container.querySelector('#destinationDisplay');
        this.listElement = this.container.querySelector('#destinationList');
        this.createDestinationElements();
        this.startCarousel();
    }

    createDestinationElements() {
        this.destinations.forEach((dest, index) => {
            const destElement = document.createElement('div');
            destElement.className = `destination ${index === 0 ? 'active' : ''}`;
            destElement.innerHTML = `
                <img src="${dest.images[0]}" alt="${dest.name}">
                <h2>${dest.name}</h2>
            `;
            this.displayElement.appendChild(destElement);

            const listItem = document.createElement('div');
            listItem.className = `destination-item ${index === 0 ? 'active' : ''}`;
            listItem.textContent = dest.name;
            listItem.onclick = () => this.jumpToDestination(index);
            this.listElement.appendChild(listItem);
        });
    }

    nextDestination() {
        const current = this.displayElement.children[this.currentDestination];
        current.classList.remove('active');
        this.listElement.children[this.currentDestination].classList.remove('active');

        this.currentDestination = (this.currentDestination + 1) % this.destinations.length;
        this.currentImage = 0;

        const next = this.displayElement.children[this.currentDestination];
        next.classList.add('active');
        this.listElement.children[this.currentDestination].classList.add('active');
    }

    nextImage() {
        const dest = this.destinations[this.currentDestination];
        this.currentImage = (this.currentImage + 1) % dest.images.length;
        const imgElement = this.displayElement.children[this.currentDestination].querySelector('img');
        imgElement.src = dest.images[this.currentImage];
    }

    jumpToDestination(index) {
        if (index === this.currentDestination) return;

        this.displayElement.children[this.currentDestination].classList.remove('active');
        this.listElement.children[this.currentDestination].classList.remove('active');

        this.currentDestination = index;
        this.currentImage = 0;

        this.displayElement.children[this.currentDestination].classList.add('active');
        this.listElement.children[this.currentDestination].classList.add('active');

        const imgElement = this.displayElement.children[this.currentDestination].querySelector('img');
        imgElement.src = this.destinations[this.currentDestination].images[this.currentImage];
    }

    startCarousel() {
        setInterval(() => this.nextImage(), 3000);
        setInterval(() => this.nextDestination(), 6000);
    }

}

// Usage
const destinations = [
    { name: "Paris", images: ["/images/Paris1.jpg", "/images/Paris2.jpg"] },
    { name: "Tokyo", images: ["/images/Tokyo1.jpg", "/images/Tokyo2.jpeg"] },
    { name: "New York", images: ["/images/NewYork1.jpg", "/images/NewYork2.jpeg"] },
    { name: "Sydney", images: ["/images/Sydney1.jpg", "/images/Sydney2.jpg"] },
    { name: "Rio de Janeiro", images: ["/images/Rio1.jpg", "/images/Rio2.jpg"] }
];

new DestinationCarousel('carouselContainer', destinations);