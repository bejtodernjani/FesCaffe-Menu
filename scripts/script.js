document.addEventListener("DOMContentLoaded", function () {
  const preloader = document.getElementById("preloader");
  const preloaderVideo = document.getElementById("preloader-video");
  const mainContent = document.getElementById("main-content");
  const menuBtn = document.querySelector(".menu-btn");
  const navLinks = document.querySelector(".nav-links");

  // Sanitize user input or dynamic content if applicable
  function sanitizeHTML(html) {
    const template = document.createElement("template");
    template.innerHTML = html;
    return template.content.textContent || "";
  }

  // Securely handle preloader video
  if (preloaderVideo) {
    preloaderVideo.addEventListener("error", () => {
      console.error("Failed to load preloader video. Check the source URL.");
    });
  }

  // Function to handle reveal animations
  function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    reveals.forEach((reveal) => {
      const windowHeight = window.innerHeight;
      const revealTop = reveal.getBoundingClientRect().top;
      const revealPoint = 150;

      if (revealTop < windowHeight - revealPoint) {
        reveal.classList.add("active");
      }
    });
  }

  // Menu Button Toggle
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active"); // Toggle visibility of the menu
      console.info(
        "Menu button toggled. State:",
        navLinks.classList.contains("active")
      );
    });

    // Close menu when a link is clicked
    navLinks.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        navLinks.classList.remove("active"); // Hide the menu
        console.info("Menu link clicked. Navigation updated.");
      }
    });
  }

  // Preloader management
  if (sessionStorage.getItem("preloaderShown")) {
    // Skip preloader on subsequent visits
    preloader.style.display = "none";
    mainContent.style.display = "block";
    mainContent.style.opacity = "1";
    console.info("Main content displayed without preloader.");
    reveal(); // Trigger reveal animations if needed
  } else {
    const hidePreloader = () => {
      preloader.style.display = "none";
      mainContent.style.display = "block";
      mainContent.style.opacity = "1";
      console.info("Preloader hidden, main content revealed.");
      reveal(); // Trigger reveal animations on load

      // Mark preloader as shown
      sessionStorage.setItem("preloaderShown", "true");
    };

    // Hide preloader after timeout
    const timeoutId = setTimeout(() => {
      console.info("Preloader timeout reached.");
      hidePreloader();
    }, 6000);

    // Hide preloader when video ends
    if (preloaderVideo) {
      preloaderVideo.onended = () => {
        console.info("Preloader video ended.");
        clearTimeout(timeoutId);
        hidePreloader();
      };

      preloaderVideo.onerror = () => {
        console.error("Preloader video error.");
        clearTimeout(timeoutId);
        hidePreloader();
      };
    }
  }

  // Attach scroll event for reveal animations
  window.addEventListener("scroll", reveal);

  // Initial call for reveal on load
  reveal();

  // Disable logs in production
  if (window.location.hostname === "localhost") {
    console.log("Preloader script initialized.");
  }
});
