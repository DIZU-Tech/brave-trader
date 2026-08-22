/* =========================================================
   BRAVE TRADER
   MAIN JAVASCRIPT
   Works with:
   - index.html
   - faq.html
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menuButton = document.querySelector(".menu-button");
    const navLinks = document.querySelector(".nav-links");

    if (menuButton && navLinks) {

        menuButton.addEventListener("click", () => {

            const isOpen =
                navLinks.classList.toggle("mobile-open");

            menuButton.classList.toggle("active", isOpen);

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

            menuButton.textContent = isOpen ? "×" : "☰";

        });


        /* ---------------------------------------------
           CLOSE MENU WHEN A NORMAL LINK IS CLICKED
        --------------------------------------------- */

        const navigationItems =
            navLinks.querySelectorAll("a");

        navigationItems.forEach((link) => {

            link.addEventListener("click", () => {

                /*
                   Don't immediately close if the link
                   is the mobile Home dropdown trigger.
                */
                if (
                    link.classList.contains("nav-home") &&
                    document.querySelector(".nav-dropdown")
                ) {
                    return;
                }

                navLinks.classList.remove("mobile-open");

                menuButton.classList.remove("active");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                menuButton.textContent = "☰";

            });

        });


        /* ---------------------------------------------
           CLOSE MENU WHEN CLICKING OUTSIDE
        --------------------------------------------- */

        document.addEventListener("click", (event) => {

            if (
                navLinks.classList.contains("mobile-open") &&
                !navLinks.contains(event.target) &&
                !menuButton.contains(event.target)
            ) {

                navLinks.classList.remove("mobile-open");

                menuButton.classList.remove("active");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                menuButton.textContent = "☰";
            }

        });


        /* ---------------------------------------------
           RESET MOBILE MENU ON DESKTOP
        --------------------------------------------- */

        window.addEventListener("resize", () => {

            if (window.innerWidth > 768) {

                navLinks.classList.remove("mobile-open");

                menuButton.classList.remove("active");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                menuButton.textContent = "☰";

            }

        });

    }



    /* =====================================================
       HOME DROPDOWN
    ===================================================== */

    const navDropdown =
        document.querySelector(".nav-dropdown");

    const homeLink =
        document.querySelector(".nav-home");

    if (navDropdown && homeLink) {

        homeLink.addEventListener("click", (event) => {

            /*
               On mobile, Home opens the dropdown
               instead of immediately navigating.
            */
            if (window.innerWidth <= 768) {

                event.preventDefault();

                navDropdown.classList.toggle("open");

            }

        });


        /* ---------------------------------------------
           CLOSE DROPDOWN WHEN CLICKING ELSEWHERE
        --------------------------------------------- */

        document.addEventListener("click", (event) => {

            if (
                !navDropdown.contains(event.target)
            ) {

                navDropdown.classList.remove("open");

            }

        });

    }



    /* =====================================================
       MARKET DASHBOARD
       GOLD / SILVER / INDICES
    ===================================================== */

    const marketTabs =
        document.querySelectorAll(".market-tab");

    const chartMarket =
        document.getElementById("chart-market");

    const chartStatus =
        document.getElementById("chart-status");

    const chartPath =
        document.getElementById("chart-path");

    const chartFill =
        document.getElementById("chart-fill");

    const chartPoint =
        document.getElementById("chart-point");

    const chartPointRing =
        document.getElementById("chart-point-ring");


    /*
       The chart is deliberately illustrative.
       It is NOT live financial data.
    */

    const marketData = {

        gold: {

            symbol: "XAU/USD",

            status: "Focused",

            points: `
                M0,205
                L45,185
                L90,195
                L135,145
                L180,160
                L225,120
                L270,140
                L315,95
                L360,110
                L405,72
                L450,88
                L495,50
                L540,65
                L600,25
            `,

            fill: `
                M0,205
                L45,185
                L90,195
                L135,145
                L180,160
                L225,120
                L270,140
                L315,95
                L360,110
                L405,72
                L450,88
                L495,50
                L540,65
                L600,25
                L600,260
                L0,260
                Z
            `,

            point: {
                x: 600,
                y: 25
            }

        },


        silver: {

            symbol: "XAG/USD",

            status: "Focused",

            points: `
                M0,190
                L45,205
                L90,175
                L135,185
                L180,135
                L225,150
                L270,115
                L315,128
                L360,88
                L405,105
                L450,65
                L495,78
                L540,42
                L600,58
            `,

            fill: `
                M0,190
                L45,205
                L90,175
                L135,185
                L180,135
                L225,150
                L270,115
                L315,128
                L360,88
                L405,105
                L450,65
                L495,78
                L540,42
                L600,58
                L600,260
                L0,260
                Z
            `,

            point: {
                x: 600,
                y: 58
            }

        },


        indices: {

            symbol: "GLOBAL",

            status: "Focused",

            points: `
                M0,210
                L45,190
                L90,200
                L135,170
                L180,180
                L225,135
                L270,150
                L315,118
                L360,132
                L405,82
                L450,98
                L495,60
                L540,72
                L600,38
            `,

            fill: `
                M0,210
                L45,190
                L90,200
                L135,170
                L180,180
                L225,135
                L270,150
                L315,118
                L360,132
                L405,82
                L450,98
                L495,60
                L540,72
                L600,38
                L600,260
                L0,260
                Z
            `,

            point: {
                x: 600,
                y: 38
            }

        }

    };


    /* ---------------------------------------------
       UPDATE CHART
    --------------------------------------------- */

    function updateMarket(market) {

        const data = marketData[market];

        if (!data) return;


        /* -----------------------------------------
           Fade chart
        ----------------------------------------- */

        if (chartPath) {
            chartPath.style.opacity = "0";
        }

        if (chartFill) {
            chartFill.style.opacity = "0";
        }

        if (chartPoint) {
            chartPoint.style.opacity = "0";
        }

        if (chartPointRing) {
            chartPointRing.style.opacity = "0";
        }


        /* -----------------------------------------
           Update text slightly after fade begins
        ----------------------------------------- */

        setTimeout(() => {

            if (chartMarket) {
                chartMarket.textContent =
                    data.symbol;
            }

            if (chartStatus) {
                chartStatus.textContent =
                    data.status;
            }


            if (chartPath) {
                chartPath.setAttribute(
                    "d",
                    data.points
                );
            }

            if (chartFill) {
                chartFill.setAttribute(
                    "d",
                    data.fill
                );
            }


            if (chartPoint) {

                chartPoint.setAttribute(
                    "cx",
                    data.point.x
                );

                chartPoint.setAttribute(
                    "cy",
                    data.point.y
                );

            }


            if (chartPointRing) {

                chartPointRing.setAttribute(
                    "cx",
                    data.point.x
                );

                chartPointRing.setAttribute(
                    "cy",
                    data.point.y
                );

            }


            /* -------------------------------------
               Bring chart back
            ------------------------------------- */

            requestAnimationFrame(() => {

                if (chartPath) {
                    chartPath.style.opacity = "1";
                }

                if (chartFill) {
                    chartFill.style.opacity = "1";
                }

                if (chartPoint) {
                    chartPoint.style.opacity = "1";
                }

                if (chartPointRing) {
                    chartPointRing.style.opacity = "1";
                }

            });

        }, 180);

    }


    /* ---------------------------------------------
       MARKET TAB CLICK
    --------------------------------------------- */

    marketTabs.forEach((tab) => {

        tab.addEventListener("click", () => {

            const market =
                tab.dataset.market;

            if (!market) return;


            /* Remove active state */

            marketTabs.forEach((item) => {
                item.classList.remove("active");
            });


            /* Activate selected tab */

            tab.classList.add("active");


            /* Update dashboard */

            updateMarket(market);

        });

    });



    /* =====================================================
       TEXT FADE-IN
    ===================================================== */

    const fadeElements = document.querySelectorAll(
        ".hero-content, " +
        ".section-heading, " +
        ".approach-content, " +
        ".process-step, " +
        ".feature, " +
        ".service-card, " +
        ".faq-item, " +
        ".faq-contact, " +
        ".cta-content"
    );


    /*
       IntersectionObserver allows content to appear
       naturally as the user scrolls.
    */

    if ("IntersectionObserver" in window) {

        const fadeObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "is-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        fadeElements.forEach((element) => {

            element.classList.add("fade-in-element");

            fadeObserver.observe(element);

        });

    } else {

        fadeElements.forEach((element) => {
            element.classList.add("is-visible");
        });

    }



    /* =====================================================
       INTERACTIVE PAD / CARD TOUCH EFFECT
    ===================================================== */

    const interactivePads = document.querySelectorAll(
        ".service-card, " +
        ".feature, " +
        ".process-step, " +
        ".faq-item, " +
        ".market-item, " +
        ".market-card, " +
        ".join-point"
    );


    interactivePads.forEach((pad) => {

        /* Touch / press */

        pad.addEventListener(
            "pointerdown",
            () => {

                pad.classList.add("pad-active");

            }
        );


        /* Release */

        const removeActive = () => {

            pad.classList.remove("pad-active");

        };


        pad.addEventListener(
            "pointerup",
            removeActive
        );

        pad.addEventListener(
            "pointercancel",
            removeActive
        );

        pad.addEventListener(
            "pointerleave",
            removeActive
        );

    });



    /* =====================================================
       FAQ ACCORDION
    ===================================================== */

    const faqItems =
        document.querySelectorAll(".faq-item");


    faqItems.forEach((item) => {

        item.addEventListener("toggle", () => {

            /*
               Keep the FAQ clean:
               opening one closes the others.
            */

            if (item.open) {

                faqItems.forEach((otherItem) => {

                    if (otherItem !== item) {

                        otherItem.open = false;

                    }

                });

            }

        });

    });



    /* =====================================================
       SMOOTH INTERNAL NAVIGATION
    ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (!target) {
                return;
            }


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });



    /* =====================================================
       INITIAL MARKET
    ===================================================== */

    /*
       Make absolutely sure the dashboard starts
       on Gold when index.html loads.
    */

    if (
        marketTabs.length &&
        chartMarket
    ) {

        updateMarket("gold");

    }



    /* =====================================================
       SAFETY — PREVENT BROKEN # LINKS
    ===================================================== */

    const emptyLinks =
        document.querySelectorAll(
            'a[href="#"]'
        );


    emptyLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            event.preventDefault();

        });

    });


});