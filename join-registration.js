/* =========================================================
   JOIN-REGISTRATION.JS
   BRAVE TRADER — REGISTRATION + AGE VERIFICATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       BROKER REGISTRATION URL
       ===================================================== */

    const BROKER_REGISTRATION_URL =
        "https://direct-fxpro.com/en/partner/2UP8VLCkq?platform=web";


    /* =====================================================
       ELEMENTS
    ===================================================== */

    const registerButton =
        document.getElementById("register-button");

    const ageModal =
        document.getElementById("age-modal");

    const ageOverlay =
        document.getElementById("age-modal-overlay");

    const ageClose =
        document.getElementById("age-close");

    const ageYes =
        document.getElementById("age-yes");

    const ageNo =
        document.getElementById("age-no");


    /* =====================================================
       OPEN MODAL
    ===================================================== */

    function openAgeModal() {

        if (!ageModal) return;

        ageModal.style.display = "flex";
        ageModal.style.opacity = "1";
        ageModal.style.visibility = "visible";
        ageModal.style.pointerEvents = "auto";

        ageModal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";
    }


    /* =====================================================
       CLOSE MODAL
    ===================================================== */

    function closeAgeModal() {

        if (!ageModal) return;

        ageModal.style.display = "none";
        ageModal.style.opacity = "0";
        ageModal.style.visibility = "hidden";
        ageModal.style.pointerEvents = "none";

        ageModal.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.style.overflow = "";
    }


    /* =====================================================
       REGISTER BUTTON → OPEN WARNING
    ===================================================== */

    if (registerButton) {

        registerButton.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                openAgeModal();

            }
        );

    }


    /* =====================================================
       CLOSE BUTTON
    ===================================================== */

    if (ageClose) {

        ageClose.addEventListener(
            "click",
            closeAgeModal
        );

    }


    /* =====================================================
       CANCEL BUTTON
    ===================================================== */

    if (ageNo) {

        ageNo.addEventListener(
            "click",
            closeAgeModal
        );

    }


    /* =====================================================
       CLICK OUTSIDE MODAL
    ===================================================== */

    if (ageOverlay) {

        ageOverlay.addEventListener(
            "click",
            closeAgeModal
        );

    }


    /* =====================================================
       18+ → BROKER REGISTRATION
    ===================================================== */

    if (ageYes) {

        ageYes.addEventListener(
            "click",
            () => {

                if (
                    !BROKER_REGISTRATION_URL ||
                    BROKER_REGISTRATION_URL ===
                    "PASTE-YOUR-ACTUAL-BROKER-URL-HERE"
                ) {

                    console.error(
                        "Broker registration URL is missing."
                    );

                    return;
                }


                window.location.href =
                    BROKER_REGISTRATION_URL;

            }
        );

    }


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                closeAgeModal();

            }

        }
    );


    /* =====================================================
       INITIAL MODAL STATE
    ===================================================== */

    if (ageModal) {

        ageModal.style.display = "none";
        ageModal.style.opacity = "0";
        ageModal.style.visibility = "hidden";
        ageModal.style.pointerEvents = "none";

        ageModal.setAttribute(
            "aria-hidden",
            "true"
        );

    }

});

/* =========================================================
   MOBILE NAVIGATION
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const menuButton =
        document.querySelector(".menu-button");

    const navLinks =
        document.querySelector(".nav-links");

    if (!menuButton || !navLinks) return;


    /* =====================================================
       OPEN / CLOSE MENU
    ===================================================== */

    function closeMenu() {

        navLinks.classList.remove("mobile-open");

        menuButton.classList.remove("menu-open");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        menuButton.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    }


    function openMenu() {

        navLinks.classList.add("mobile-open");

        menuButton.classList.add("menu-open");

        menuButton.setAttribute(
            "aria-expanded",
            "true"
        );

        menuButton.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

    }


    /* =====================================================
       HAMBURGER BUTTON
    ===================================================== */

    menuButton.addEventListener("click", (event) => {

        event.stopPropagation();

        const isOpen =
            navLinks.classList.contains("mobile-open");

        if (isOpen) {

            closeMenu();

        } else {

            openMenu();

        }

    });


    /* =====================================================
       CLICK ANYWHERE OUTSIDE MENU
    ===================================================== */

    document.addEventListener("click", (event) => {

        const clickedInsideMenu =
            navLinks.contains(event.target);

        const clickedMenuButton =
            menuButton.contains(event.target);

        if (
            !clickedInsideMenu &&
            !clickedMenuButton
        ) {

            closeMenu();

        }

    });


    /* =====================================================
       CLOSE AFTER SELECTING A LINK
    ===================================================== */

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            closeMenu();

        });

    });


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            closeMenu();

        }

    });

});

/* =========================================================
   BRAVE TRADER — SMART NAVBAR
   Hide on scroll down / show on scroll up
========================================================= */

(function () {

    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateNavbar() {

        const currentScrollY = window.scrollY;

        /* Always show navbar near the top */
        if (currentScrollY <= 20) {

            navbar.classList.remove("navbar-hidden");

            lastScrollY = currentScrollY;

            ticking = false;

            return;
        }


        /* Scrolling down */
        if (currentScrollY > lastScrollY) {

            navbar.classList.add("navbar-hidden");

        }


        /* Scrolling up */
        else if (currentScrollY < lastScrollY) {

            navbar.classList.remove("navbar-hidden");

        }


        lastScrollY = currentScrollY;

        ticking = false;
    }


    window.addEventListener("scroll", function () {

        if (!ticking) {

            window.requestAnimationFrame(updateNavbar);

            ticking = true;

        }

    }, { passive: true });

})();