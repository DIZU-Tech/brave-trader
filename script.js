/* =====================================================
   BRAVE TRADER — MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   1. MOBILE MENU
===================================================== */

const menuButton = document.querySelector(".menu-button");
const navLinks = document.querySelector(".nav-links");

if (menuButton && navLinks) {

    menuButton.addEventListener("click", () => {

        const isOpen =
            navLinks.classList.toggle("mobile-open");

        menuButton.classList.toggle("active");

        menuButton.setAttribute(
            "aria-expanded",
            isOpen
        );

        /* Change menu icon */

        menuButton.textContent = isOpen
            ? "✕"
            : "☰";

    });


    /* Close menu when a link is clicked */

    navLinks.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("mobile-open");

            menuButton.classList.remove("active");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.textContent = "☰";

        });

    });

}


/* =====================================================
   2. MARKET DASHBOARD
===================================================== */

const marketTabs = document.querySelectorAll(".market-tab");

const chartMarket = document.querySelector("#chart-market");
const chartStatus = document.querySelector("#chart-status");

const chartPath = document.querySelector("#chart-path");
const chartFill = document.querySelector("#chart-fill");

const chartPoint = document.querySelector("#chart-point");
const chartPointRing = document.querySelector("#chart-point-ring");


/* Market data */

const marketData = {

    gold: {
        name: "XAU/USD",
        status: "Focused",

        path: `
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

        pointY: 25
    },


    silver: {
        name: "XAG/USD",
        status: "Focused",

        path: `
            M0,190
            L45,175
            L90,185
            L135,160
            L180,175
            L225,135
            L270,150
            L315,125
            L360,135
            L405,105
            L450,120
            L495,90
            L540,105
            L600,70
        `,

        fill: `
            M0,190
            L45,175
            L90,185
            L135,160
            L180,175
            L225,135
            L270,150
            L315,125
            L360,135
            L405,105
            L450,120
            L495,90
            L540,105
            L600,70
            L600,260
            L0,260
            Z
        `,

        pointY: 70
    },


    indices: {
        name: "GLOBAL",
        status: "Focused",

        path: `
            M0,210
            L45,200
            L90,180
            L135,190
            L180,150
            L225,165
            L270,120
            L315,135
            L360,100
            L405,115
            L450,80
            L495,95
            L540,55
            L600,40
        `,

        fill: `
            M0,210
            L45,200
            L90,180
            L135,190
            L180,150
            L225,165
            L270,120
            L315,135
            L360,100
            L405,115
            L450,80
            L495,95
            L540,55
            L600,40
            L600,260
            L0,260
            Z
        `,

        pointY: 40
    }

};


/* =====================================================
   CHANGE MARKET
===================================================== */

marketTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        const selectedMarket = tab.dataset.market;

        const data = marketData[selectedMarket];

        if (!data) return;


        /* Remove active state */

        marketTabs.forEach(item => {

            item.classList.remove("active");

        });


        /* Activate selected market */

        tab.classList.add("active");


        /* Update text */

        chartMarket.textContent = data.name;

        chartStatus.textContent = data.status;


        /* Update chart */

        chartPath.setAttribute("d", data.path);

        chartFill.setAttribute("d", data.fill);

        chartPoint.setAttribute("cy", data.pointY);

        chartPointRing.setAttribute("cy", data.pointY);


        /* Restart chart animation */

        chartPath.style.animation = "none";

        void chartPath.offsetWidth;

        chartPath.style.animation = "drawChart 1.2s ease forwards";

    });

});


/* =====================================================
   3. SCROLL REVEAL
===================================================== */

const revealElements = document.querySelectorAll(
    ".service-card, .process-step, .feature, .section-heading, .cta"
);


/* Add initial state */

revealElements.forEach(element => {

    element.classList.add("reveal");

});


/* Observer */

const revealObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);


/* Watch elements */

revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =====================================================
   4. NAVBAR SCROLL EFFECT
===================================================== */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (!navbar) return;

    if (window.scrollY > 30) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});
