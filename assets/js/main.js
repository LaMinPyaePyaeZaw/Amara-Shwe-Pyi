
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


document.addEventListener("DOMContentLoaded", function () {
    const section = document.querySelector(".services-section");

    if (!section) return;

    const cards = section.querySelectorAll(".service-card");
    const panel = section.querySelector(".service-detail-panel");

    const image = section.querySelector("#serviceDetailImage");
    const imageLabel = section.querySelector("#serviceImageLabel");
    const imageNumber = section.querySelector("#serviceImageNumber");
    const eyebrow = section.querySelector("#serviceEyebrow");
    const title = section.querySelector("#serviceDetailTitle");
    const description = section.querySelector("#serviceDetailDescription");
    const benefits = section.querySelector("#serviceBenefits");
    const detailLink = section.querySelector("#serviceDetailLink");

    const serviceData = {
        ior: {
            number: "01",
            category: "TRADE SOLUTIONS",
            title: "Importer of Record",
            description:
                "Reliable Importer of Record support to help businesses navigate import responsibilities and trade requirements across markets.",
            image: "assets/images/ior.jpg",
            alt: "Importer of Record services",
            benefits: [
                "Import coordination and support",
                "Trade documentation assistance",
                "Market-specific compliance guidance"
            ],
            link: "#ior"
        },
        customs: {
            number: "02",
            category: "TRADE COMPLIANCE",
            title: "Customs Clearance",
            description:
                "Support with customs procedures and shipping documentation to help goods move through the clearance process efficiently.",
            image: "assets/images/customs-clearance.jpg",
            alt: "Customs clearance services",
            benefits: [
                "Customs documentation support",
                "Import and export coordination",
                "Clearance process assistance"
            ],
            link: "#customs"
        },
        "cross-border": {
            number: "03",
            category: "REGIONAL CONNECTIVITY",
            title: "Cross-Border Services",
            description:
                "Cross-border support connecting businesses and trade activities between Myanmar, Thailand, and regional markets.",
            image: "assets/images/cross-border.jpg",
            alt: "Cross-border trade services",
            benefits: [
                "Myanmar–Thailand coordination",
                "Regional trade support",
                "Cross-border shipment assistance"
            ],
            link: "#cross-border"
        },
        licensing: {
            number: "04",
            category: "REGULATORY SUPPORT",
            title: "Licensing Services",
            description:
                "Assistance navigating relevant licensing requirements and documentation for business and trade activities.",
            image: "assets/images/licensing.jpg",
            alt: "Licensing services",
            benefits: [
                "Licensing documentation support",
                "Application process coordination",
                "Regulatory requirement guidance"
            ],
            link: "#license"
        }
    };

    let activeService = "ior";
    let animationTimer;

    function showService(serviceKey) {
        const data = serviceData[serviceKey];

        if (!data || serviceKey === activeService) return;

        activeService = serviceKey;

        cards.forEach(function (card) {
            const isActive = card.dataset.service === serviceKey;

            card.classList.toggle("active", isActive);
            card.setAttribute("aria-pressed", String(isActive));
        });

        window.clearTimeout(animationTimer);
        panel.classList.remove("is-changing");

        // Restart the CSS transition.
        void panel.offsetWidth;

        image.src = data.image;
        image.alt = data.alt;
        imageLabel.textContent = data.category;
        imageNumber.textContent = data.number;
        eyebrow.textContent = data.number + " / " + data.category;
        title.textContent = data.title;
        description.textContent = data.description;
        detailLink.href = data.link;

        benefits.replaceChildren();

        data.benefits.forEach(function (benefit) {
            const item = document.createElement("li");
            item.textContent = benefit;
            benefits.appendChild(item);
        });

        panel.classList.add("is-changing");

        animationTimer = window.setTimeout(function () {
            panel.classList.remove("is-changing");
        }, 550);
    }

    cards.forEach(function (card) {
        // Desktop: preview the service on hover.
        card.addEventListener("mouseenter", function () {
            if (window.matchMedia("(hover: hover)").matches) {
                showService(card.dataset.service);
            }
        });

        // Keyboard and touch: select a service.
        card.addEventListener("focus", function () {
            showService(card.dataset.service);
        });

        card.addEventListener("click", function () {
            showService(card.dataset.service);
        });
    });
});


/* =========================================
   ASP SERVICES INTERACTION
   Existing service panel + Customs details
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    const section = document.querySelector(".services-section");

    if (!section) return;

    const cards = section.querySelectorAll(".service-card");
    const panel = section.querySelector(".service-detail-panel");

    const image = section.querySelector("#serviceDetailImage");
    const imageLabel = section.querySelector("#serviceImageLabel");
    const imageNumber = section.querySelector("#serviceImageNumber");

    const eyebrow = section.querySelector("#serviceEyebrow");
    const title = section.querySelector("#serviceDetailTitle");
    const description = section.querySelector("#serviceDetailDescription");
    const benefits = section.querySelector("#serviceBenefits");
    const detailLink = section.querySelector("#serviceDetailLink");

    const customsDetails = document.querySelector("#customs-details");
    const servicesSection = document.querySelector("#services");

    let activeService = "ior";
    let animationTimer;

    const serviceData = {
        ior: {
            number: "01",
            category: "TRADE SOLUTIONS",
            title: "Importer of Record",
            description:
                "Reliable Importer of Record support to help businesses navigate import responsibilities and trade requirements across markets.",
            image: "assets/images/ior.jpg",
            alt: "Importer of Record services",
            benefits: [
                "Import coordination and support",
                "Trade documentation assistance",
                "Market-specific compliance guidance"
            ],
            link: "#ior"
        },

        customs: {
            number: "02",
            category: "TRADE COMPLIANCE",
            title: "Customs Clearance",
            description:
                "Supporting businesses with customs clearance procedures and shipment coordination to facilitate the smooth movement of goods across borders.",
            image: "assets/images/custom1.jpg",
            alt: "Customs clearance support and shipment coordination",
            benefits: [
                "Customs documentation support",
                "Import and export coordination",
                "Clearance process assistance"
            ],
            link: "#customs-details"
        },

        "cross-border": {
            number: "03",
            category: "REGIONAL CONNECTIVITY",
            title: "Cross-Border Services",
            description:
                "Regional trade and coordination support to help businesses navigate cross-border operations between markets.",
            image: "assets/images/cross-border.jpg",
            alt: "Cross-border trade services",
            benefits: [
                "Regional coordination support",
                "Cross-border shipment assistance",
                "Trade process coordination"
            ],
            link: "#cross-border"
        },

        licensing: {
            number: "04",
            category: "REGULATORY SUPPORT",
            title: "Licensing Services",
            description:
                "Licensing and regulatory support to help businesses navigate applicable requirements for their trade activities.",
            image: "assets/images/licensing.jpg",
            alt: "Licensing and regulatory support services",
            benefits: [
                "Licensing process guidance",
                "Regulatory documentation support",
                "Requirements coordination"
            ],
            link: "#license"
        }
    };

    function showService(serviceKey) {

        const data = serviceData[serviceKey];

        if (!data || serviceKey === activeService) return;

        activeService = serviceKey;

        cards.forEach(function (card) {

            const isActive = card.dataset.service === serviceKey;

            card.classList.toggle("active", isActive);
            card.setAttribute("aria-pressed", String(isActive));

        });

        window.clearTimeout(animationTimer);

        panel.classList.remove("is-changing");

        // Restart the existing panel animation.
        void panel.offsetWidth;

        image.src = data.image;
        image.alt = data.alt;

        imageLabel.textContent = data.category;
        imageNumber.textContent = data.number;

        eyebrow.textContent = data.number + " / " + data.category;
        title.textContent = data.title;
        description.textContent = data.description;

        detailLink.href = data.link;

        benefits.replaceChildren();

        data.benefits.forEach(function (benefit) {

            const item = document.createElement("li");

            item.textContent = benefit;

            benefits.appendChild(item);

        });

        panel.classList.add("is-changing");

        animationTimer = window.setTimeout(function () {
            panel.classList.remove("is-changing");
        }, 550);

    }

    // Preserve the existing service-card hover and click behavior.
    cards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {

            if (window.matchMedia("(hover: hover)").matches) {
                showService(card.dataset.service);
            }

        });

        card.addEventListener("focus", function () {
            showService(card.dataset.service);
        });

        card.addEventListener("click", function () {
            showService(card.dataset.service);
        });

    });

    // Explore: open the full details only for Customs Clearance.
    detailLink.addEventListener("click", function (event) {

        if (activeService !== "customs") return;

        event.preventDefault();

        if (!customsDetails) return;

        customsDetails.hidden = false;

        customsDetails.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

    // Back to Services.
    if (customsDetails) {

        const backLink = customsDetails.querySelector(".customs-back-link");

        if (backLink) {

            backLink.addEventListener("click", function (event) {

                event.preventDefault();

                customsDetails.hidden = true;

                if (servicesSection) {
                    servicesSection.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }

            });

        }

    }

});
