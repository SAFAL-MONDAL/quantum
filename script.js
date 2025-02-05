document.addEventListener("DOMContentLoaded", () => {
    // Sidebar toggle functionality
    const menuBtn = document.querySelector(".menu-btn");
    const sidebar = document.querySelector(".sidebar");
    const mainContainer = document.querySelector(".content"); // Update to target the main content area

    menuBtn.addEventListener("click", () => {
        sidebar.classList.toggle("active");
        mainContainer.classList.toggle("sidebar-active");
    });

    // Collapsible sections in sidebar
    const collapsibleSections = document.querySelectorAll(".nav-section");
    collapsibleSections.forEach((section) => {
        const title = section.querySelector(".section-title");
        title.addEventListener("click", () => {
            section.classList.toggle("collapsed");
        });
    });

    // Like button functionality
    const likeBtn = document.querySelector(".like-btn");
    let likeCount = 982; // Initial like count

    likeBtn.addEventListener("click", () => {
        likeCount++;
        likeBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            ${likeCount}
        `;
        likeBtn.classList.add("liked");
    });

    // Share button functionality
    const shareBtn = document.querySelector(".share-btn");
    shareBtn.addEventListener("click", () => {
        if (navigator.share) {
            navigator
                .share({
                    title: "Blender 3D Fundamentals",
                    text: "Check out this awesome Blender 3D course!",
                    url: window.location.href,
                })
                .then(() => {
                    console.log("Thanks for sharing!");
                })
                .catch(console.error);
        } else {
            // Fallback for browsers that don't support Web Share API
            alert("Share this page: " + window.location.href);
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth",
            });
        });
    });

    // Lazy loading for images
    const images = document.querySelectorAll("img[data-src]");
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute("data-src");
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach((img) => imageObserver.observe(img));
});