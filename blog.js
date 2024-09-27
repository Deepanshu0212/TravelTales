

let currentUser = JSON.parse(localStorage.getItem('currentUser'));

const loginButton = document.getElementById('loginButton');
if(currentUser){
    loginButton.textContent = currentUser.name;
}

loginButton.addEventListener('click', () => {
    
    userDropdown.style.display = userDropdown.style.display === 'none' ? 'block' : 'none';
});

logoutButton.addEventListener('click',()=>{
    localStorage.removeItem("currentUser"); // Remove current user
    currentUser = null;
    // Change button text to "Login"
    loginButton.textContent = "Login";
    alert("User logged out");
    userDropdown.style.display= 'none';
    window.location.href = './index.html';
});



const continents = [
    { name: 'Africa', image: '/images/africa.jpg' },
    { name: 'America', image: '/images/americas.jpg' },
    { name: 'Asia', image: '/images/asia.jpg' },
    { name: 'Europe', image: '/images/europe.jpg' },
    { name: 'Oceania', image: '/images/oceania.jpeg' }
];


// Tags for filtering blogs
const tags = ['Adventure', 'Culture', 'Food', 'Nature', 'Beach', 'City', 'Mountain'];

// Fetch and combine all blogs (from localStorage and blogData from data.js)
function getAllBlogs() {
    const storedData = JSON.parse(localStorage.getItem('data')) || [];
    let allBlogs = [];

    // Collect blogs from localStorage
    storedData.forEach(user => {
        allBlogs = allBlogs.concat(user.blogs.map(blog => ({
            title: blog.title,
            content: blog.content,
            continent: blog.continent,
            country: blog.country,
            tags: blog.tags,
            image: blog.image,
            createdAt: blog.createdAt
        })));
    });

    // Combine with blogs from data.js
    allBlogs = allBlogs.concat(blogData);

    return allBlogs;
}

// Get countries that have blogs in localStorage or data.js
    function getCountriesWithBlogs() {
    const allBlogs = getAllBlogs();
    const continentCountries = {};

    // Collect countries with blogs and their associated continents
    allBlogs.forEach(blog => {
        const { continent, country } = blog;

        if (!continentCountries[continent]) {
            continentCountries[continent] = new Set();
        }

        // Add the country to its respective continent set
        continentCountries[continent].add(country);
    });

    // Convert Set to an array for rendering
    const filteredCountries = {};
    Object.keys(continentCountries).forEach(continent => {
        filteredCountries[continent] = Array.from(continentCountries[continent]);
    });

    return filteredCountries;
}


// Toggle the visibility of search content sections
function toggleSearchContent(id) {
    const content = document.getElementById(id);
    if (content.classList.contains('active')) {
        content.classList.remove('active');
    } else {
        document.querySelectorAll('.search-content').forEach(el => el.classList.remove('active'));
        content.classList.add('active');
    }
}

// Create continent grid for displaying continents
function createContinentGrid() {
    const grid = document.getElementById('continentGrid');
    grid.innerHTML = ''; // Clear previous content if any

    continents.forEach(continent => {
        const item = document.createElement('div');
        item.className = 'continent-item';
        item.innerHTML = `
            <img src="${continent.image}" alt="${continent.name}">
            <span>${continent.name}</span>
        `;
        item.addEventListener('click', () => showCountries(continent.name));
        grid.appendChild(item);
    });
}

// Display countries based on selected continent and filter countries with blogs
function showCountries(continent) {
    const list = document.getElementById('countriesList');
    list.innerHTML = ''; // Clear previous content

    // Get filtered countries with blogs
    const filteredCountries = getCountriesWithBlogs();


    // Render countries with blogs for the selected continent
    if (filteredCountries[continent]) {
        filteredCountries[continent].forEach(country => {
            const tag = document.createElement('span');
            tag.className = 'country-tag';
            tag.textContent = country;
            tag.addEventListener('click', () => toggleTag(country, 'country'));
            list.appendChild(tag);
        });
    }
}

// Create tag list for filtering blogs
function createTagsList() {
    const container = document.getElementById('tagsList');
    container.innerHTML = ''; // Clear previous content if any

    tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'tag';
        tagElement.textContent = tag;
        tagElement.addEventListener('click', () => toggleTag(tag, 'tag'));
        container.appendChild(tagElement);
    });
}

// Toggle selected tags for filtering blogs
function toggleTag(value, type) {
    const selectedTags = document.getElementById('selectedTags');
    const existingTag = Array.from(selectedTags.children).find(tag => tag.textContent.includes(value));
     
    if (existingTag) {
        selectedTags.removeChild(existingTag); // Remove tag if already selected
    } else {
        const tag = document.createElement('span');
        tag.className = 'selected-tag';
        tag.textContent = `${value}`;
        tag.addEventListener('click', () => selectedTags.removeChild(tag)); // Remove tag on click
        selectedTags.appendChild(tag);
    }

    updateBlogGrid(); // Update blog grid based on selected tags
}

// Update blog grid based on search input and selected tags
function updateBlogGrid() {
    const selectedTags = Array.from(document.getElementById('selectedTags').children).map(tag => tag.textContent.slice(0)); // Remove first character (🏴 or #)
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const grid = document.getElementById('blogGrid');
    grid.innerHTML = ''; // Clear previous content
    
    console.log("Selected Tags:", selectedTags);
    console.log("Search Term:", searchTerm);

    const allBlogs = getAllBlogs();
    
    console.log(allBlogs);
    // Filter blogs based on search input (can match title, content, or country) and selected tags
    const filteredBlogs = allBlogs.filter(blog => {
        const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => 
            blog.tags.includes(tag.toLowerCase()) || blog.country.toLowerCase().includes(tag.toLowerCase())
        );
        const matchesSearch = blog.title.toLowerCase().includes(searchTerm) ||
                              blog.content.toLowerCase().includes(searchTerm) ||
                              blog.country.toLowerCase().includes(searchTerm);
        return matchesTags && matchesSearch;
    });

    console.log("Filtered Blogs:", filteredBlogs);

    // Render the filtered blogs
    if (filteredBlogs.length > 0) {
        filteredBlogs.forEach(blog => {
            const item = document.createElement('div');
            item.className = 'blog-item';
            item.innerHTML = `
                <img src="${blog.image}" alt="${blog.title}">
                <div class="blog-content">
                    <h3>${blog.title}</h3>
                    <p>${blog.content}</p>
                    <div class="blog-tags">
                        ${blog.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="blog-country">
                        <span>🏴 ${blog.country}</span>
                    </div>
                </div>
            `;
            grid.appendChild(item);
        });
    } else {
        const noResultsMessage = document.createElement('p');
        noResultsMessage.textContent = 'No blogs found.';
        grid.appendChild(noResultsMessage);
    }
}


// Initialize the page
createContinentGrid();
createTagsList();
updateBlogGrid();

// Add event listener for search input
document.getElementById('searchInput').addEventListener('input', updateBlogGrid);