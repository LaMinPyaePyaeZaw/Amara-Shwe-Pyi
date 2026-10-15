
/* =========================================
   AMARA SHWE PYI
   MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // -------------------------------------
    // 1. ELEMENTS
    // -------------------------------------

    const navbar = document.querySelector("#mainNavbar");

    const navLinks = document.querySelectorAll(
        ".site-header .navbar-nav > .nav-item > .nav-link"
    );

    const dropdownLinks = document.querySelectorAll(
        ".site-header .dropdown-item"
    );

    const mobileToggle = document.querySelector(
        ".site-header .navbar-toggler"
    );


    // -------------------------------------
    // 2. ACTIVE NAVIGATION
    // -------------------------------------

    function setActiveLink(selectedLink) {
        navLinks.forEach((link) => {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
        });

        if (selectedLink) {
            selectedLink.classList.add("active");
            selectedLink.setAttribute("aria-current", "page");
        }
    }

    // Handle main navigation clicks

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            setActiveLink(link);
        });
    });

    // Handle Services dropdown selections

    dropdownLinks.forEach((link) => {
        link.addEventListener("click", () => {
            const servicesLink = document.querySelector(
                '.site-header .nav-link[href="#services"]'
            );

            setActiveLink(servicesLink);
        });
    });


    // -------------------------------------
    // 3. CLOSE MOBILE MENU AFTER NAVIGATION
    // -------------------------------------

    function closeMobileMenu() {
        if (
            navbar &&
            navbar.classList.contains("show") &&
            window.bootstrap
        ) {
            const collapse = window.bootstrap.Collapse.getOrCreateInstance(
                navbar,
                { toggle: false }
            );

            collapse.hide();
        }
    }

    navLinks.forEach((link) => {
        link.addEventListener("click", closeMobileMenu);
    });

    dropdownLinks.forEach((link) => {
        link.addEventListener("click", closeMobileMenu);
    });


    // -------------------------------------
    // 4. ACCESSIBLE MOBILE TOGGLE STATE
    // -------------------------------------

    if (navbar && mobileToggle) {
        navbar.addEventListener("shown.bs.collapse", () => {
            mobileToggle.setAttribute("aria-expanded", "true");
        });

        navbar.addEventListener("hidden.bs.collapse", () => {
            mobileToggle.setAttribute("aria-expanded", "false");
        });
    }


    // -------------------------------------
    // 5. DYNAMIC COPYRIGHT YEAR
    // -------------------------------------

    const currentYear = document.querySelector("#currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }


    // -------------------------------------
    // 6. INITIALIZATION
    // -------------------------------------

    console.log("Amara Shwe Pyi website initialized.");

});
