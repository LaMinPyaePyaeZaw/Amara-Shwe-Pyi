/* =========================================
   AMARA SHWE PYI
   MAIN JAVASCRIPT
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    /* -----------------------------------------------
       1. NAVIGATION
    ----------------------------------------------- */

    const navbar = document.getElementById("mainNavbar");
    const mobileToggle = document.querySelector(".navbar-toggler");

    const mainNavLinks = document.querySelectorAll(
        "#mainNavbar .navbar-nav > .nav-item > .nav-link"
    );

    const dropdownLinks = document.querySelectorAll(
        "#mainNavbar .dropdown-menu a"
    );

    function closeMobileMenu() {
        if (
            navbar &&
            navbar.classList.contains("show") &&
            window.bootstrap
        ) {
            window.bootstrap.Collapse
                .getOrCreateInstance(navbar, { toggle: false })
                .hide();
        }
    }

    function setActiveLink(selectedLink) {
        mainNavLinks.forEach((link) => {
            link.classList.remove("active");
            link.removeAttribute("aria-current");
        });

        if (selectedLink) {
            selectedLink.classList.add("active");
            selectedLink.setAttribute("aria-current", "page");
        }
    }

    mainNavLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (!link.classList.contains("dropdown-toggle")) {
                setActiveLink(link);
            }

            closeMobileMenu();
        });
    });

    dropdownLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");
            const targetId = href?.startsWith("#")
                ? href.slice(1)
                : null;

            const target = targetId
                ? document.getElementById(targetId)
                : null;

            if (target && target.matches(".service-card")) {
                event.preventDefault();
                target.click();

                document.getElementById("services")?.scrollIntoView({
                    behavior: reducedMotion ? "auto" : "smooth",
                    block: "start"
                });
            }

            const servicesLink = document.querySelector(
                '#mainNavbar .nav-link.dropdown-toggle'
            );

            setActiveLink(servicesLink);
            closeMobileMenu();
        });
    });

    if (navbar && mobileToggle) {
        navbar.addEventListener("shown.bs.collapse", () => {
            mobileToggle.setAttribute("aria-expanded", "true");
        });

        navbar.addEventListener("hidden.bs.collapse", () => {
            mobileToggle.setAttribute("aria-expanded", "false");
        });
    }

    /* -----------------------------------------------
       2. SERVICE DETAIL PANEL
    ----------------------------------------------- */

    const servicesSection = document.querySelector(".services-section");

    if (servicesSection) {
        const cards = servicesSection.querySelectorAll(".service-card");
        const panel = servicesSection.querySelector(".service-detail-panel");

        const image = servicesSection.querySelector("#serviceDetailImage");
        const imageLabel = servicesSection.querySelector("#serviceImageLabel");
        const imageNumber = servicesSection.querySelector("#serviceImageNumber");
        const eyebrow = servicesSection.querySelector("#serviceEyebrow");
        const title = servicesSection.querySelector("#serviceDetailTitle");
        const description = servicesSection.querySelector("#serviceDetailDescription");
        const benefits = servicesSection.querySelector("#serviceBenefits");
        const detailLink = servicesSection.querySelector("#serviceDetailLink");

        const customsDetails = document.getElementById("customs-details");

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
                    "Supporting businesses with customs clearance procedures and shipment coordination to facilitate the movement of goods across borders.",
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

        let activeService = "ior";
        let animationTimer;

        function showService(serviceKey) {
            const data = serviceData[serviceKey];

            if (
                !data ||
                serviceKey === activeService ||
                !panel ||
                !image ||
                !imageLabel ||
                !imageNumber ||
                !eyebrow ||
                !title ||
                !description ||
                !benefits ||
                !detailLink
            ) {
                return;
            }

            activeService = serviceKey;

            cards.forEach((card) => {
                const isActive = card.dataset.service === serviceKey;

                card.classList.toggle("active", isActive);
                card.setAttribute("aria-pressed", String(isActive));
            });

            window.clearTimeout(animationTimer);
            panel.classList.remove("is-changing");

            if (!reducedMotion) {
                void panel.offsetWidth;
            }

            image.src = data.image;
            image.alt = data.alt;
            imageLabel.textContent = data.category;
            imageNumber.textContent = data.number;
            eyebrow.textContent = `${data.number} / ${data.category}`;
            title.textContent = data.title;
            description.textContent = data.description;
            detailLink.href = data.link;

            benefits.replaceChildren();

            data.benefits.forEach((benefit) => {
                const item = document.createElement("li");
                item.textContent = benefit;
                benefits.appendChild(item);
            });

            panel.classList.add("is-changing");

            if (!reducedMotion) {
                animationTimer = window.setTimeout(() => {
                    panel.classList.remove("is-changing");
                }, 550);
            } else {
                panel.classList.remove("is-changing");
            }
        }

        cards.forEach((card) => {
            card.addEventListener("mouseenter", () => {
                if (
                    window.matchMedia(
                        "(hover: hover) and (pointer: fine)"
                    ).matches
                ) {
                    showService(card.dataset.service);
                }
            });

            card.addEventListener("focus", () => {
                showService(card.dataset.service);
            });

            card.addEventListener("click", () => {
                showService(card.dataset.service);
            });
        });

        if (detailLink) {
            detailLink.addEventListener("click", (event) => {
                if (activeService !== "customs") return;

                event.preventDefault();

                if (!customsDetails) return;

                customsDetails.hidden = false;

                customsDetails.scrollIntoView({
                    behavior: reducedMotion ? "auto" : "smooth",
                    block: "start"
                });
            });
        }

        const backLink = customsDetails?.querySelector(
            ".customs-back-link"
        );

        if (backLink) {
            backLink.addEventListener("click", (event) => {
                event.preventDefault();

                customsDetails.hidden = true;

                servicesSection.scrollIntoView({
                    behavior: reducedMotion ? "auto" : "smooth",
                    block: "start"
                });
            });
        }
    }

    /* -----------------------------------------------
       3. CUSTOMERS — VIEW ALL / SHOW LESS
       Only ONE click handler for this button.
    ----------------------------------------------- */

    const viewAllButton = document.getElementById("viewAllCustomers");
    const allCustomers = document.getElementById("allCustomers");

    if (viewAllButton && allCustomers) {
        // Match the button state to the initial HTML.
        const initiallyHidden = allCustomers.hidden;

        viewAllButton.setAttribute(
            "aria-expanded",
            String(!initiallyHidden)
        );

        viewAllButton.innerHTML = initiallyHidden
            ? 'View All Customers <i class="bi bi-arrow-up-right" aria-hidden="true"></i>'
            : 'Show Less Customers <i class="bi bi-arrow-up-right" aria-hidden="true"></i>';

        viewAllButton.addEventListener("click", () => {
            const shouldOpen = allCustomers.hidden;

            allCustomers.hidden = !shouldOpen;

            viewAllButton.setAttribute(
                "aria-expanded",
                String(shouldOpen)
            );

            viewAllButton.innerHTML = shouldOpen
                ? 'Show Less Customers <i class="bi bi-arrow-up-right" aria-hidden="true"></i>'
                : 'View All Customers <i class="bi bi-arrow-up-right" aria-hidden="true"></i>';

            if (shouldOpen) {
                allCustomers.scrollIntoView({
                    behavior: reducedMotion ? "auto" : "smooth",
                    block: "nearest"
                });
            }
        });
    }

    /* -----------------------------------------------
       4. CONTACT FORM — FORMSPREE
    ----------------------------------------------- */

    const form = document.getElementById("contactForm");
    const submitButton = document.getElementById("contactSubmitBtn");
    const statusMessage = document.getElementById("contactFormStatus");

    if (form && submitButton && statusMessage) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            if (!form.reportValidity()) return;

            const honeypot = form.querySelector('[name="_gotcha"]');

            if (honeypot && honeypot.value.trim() !== "") {
                form.reset();
                return;
            }

            const originalButtonHTML = submitButton.innerHTML;

            submitButton.disabled = true;
            submitButton.setAttribute("aria-busy", "true");
            submitButton.textContent = "Sending...";

            statusMessage.textContent = "";
            statusMessage.className = "contact-form-status";

            try {
                const response = await fetch(form.action, {
                    method: "POST",
                    body: new FormData(form),
                    headers: {
                        Accept: "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error("Form submission failed.");
                }

                statusMessage.textContent =
                    "Thank you! Your enquiry has been submitted successfully.";

                statusMessage.classList.add("is-success");
                form.reset();
            } catch (error) {
                statusMessage.textContent =
                    "Sorry, we couldn't send your enquiry. Please try again or contact us by email.";

                statusMessage.classList.add("is-error");
            } finally {
                submitButton.disabled = false;
                submitButton.removeAttribute("aria-busy");
                submitButton.innerHTML = originalButtonHTML;
            }
        });
    }

    /* -----------------------------------------------
       5. SCROLL REVEALS
    ----------------------------------------------- */

    const revealTargets = document.querySelectorAll([
        ".about-section .section-eyebrow",
        ".about-section .section-title",
        ".about-section .section-description",
        ".about-section .about-card",
        ".services-heading",
        ".services-list",
        ".service-detail-panel",
        ".services-bottom-line",
        ".customs-details-heading",
        ".customs-detail-card",
        ".customers-heading",
        ".customers-footer",
        ".contact-heading",
        ".contact-info-panel",
        ".contact-form-panel"
    ].join(","));

    if (
        !reducedMotion &&
        "IntersectionObserver" in window
    ) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealTargets.forEach((element, index) => {
            const rect = element.getBoundingClientRect();

            const alreadyVisible =
                rect.top < window.innerHeight && rect.bottom > 0;

            element.classList.add("asp-reveal");

            if (alreadyVisible) {
                element.classList.add("is-visible");
            } else {
                element.style.setProperty(
                    "--asp-reveal-delay",
                    `${Math.min(index % 4, 3) * 65}ms`
                );

                revealObserver.observe(element);
            }
        });
    }

    /* -----------------------------------------------
       6. DYNAMIC COPYRIGHT YEAR
    ----------------------------------------------- */

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    console.info("Amara Shwe Pyi initialized.");
});