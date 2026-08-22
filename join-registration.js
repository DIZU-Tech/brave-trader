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

    const menuButton = document.querySelector(".menu-button");
    const navLinks = document.querySelector(".nav-links");

    if (!menuButton || !navLinks) return;

    menuButton.addEventListener("click", () => {

        const isOpen =
            navLinks.classList.toggle("mobile-open");

        menuButton.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        menuButton.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

    });


    /* Close menu after selecting a link */

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("mobile-open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

        });

    });

});