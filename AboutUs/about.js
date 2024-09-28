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
    window.location.href = '..Index/index.html';
});


document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});