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


gsap.registerPlugin(ScrollTrigger);

        const rungs = document.querySelectorAll('.rung');
        const contents = document.querySelectorAll('.content');

        contents.forEach((content, index) => {
            // Position rung based on content section's top position
            const rung = document.getElementById(`rung-${index + 1}`);
            const contentTop = content.offsetTop;
            rung.style.top = contentTop + "px";

            // Animate rung when the corresponding content is in view
            gsap.to(rung, {
                scaleX: 1,
                duration: 0.5,
                scrollTrigger: {
                    trigger: content,
                    start: "top center",
                    end: "bottom center",
                    toggleActions: "play none none reverse"
                }
            });

            // Slide content into view when scrolled into view
            gsap.to(content, {
                opacity: 1,
                x: 0,
                duration: 0.5,
                scrollTrigger: {
                    trigger: content,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });
        });