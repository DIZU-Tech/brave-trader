/* =========================================================
   BRAVE TRADER
   DIZU LOADING EXPERIENCE
   v3.0
   Optimized Initial Load
========================================================= */

(function () {

    "use strict";


    /* =====================================================
       CONFIGURATION
    ===================================================== */

    const MINIMUM_LOAD_TIME = 3000;
    const MAXIMUM_LOAD_TIME = 10000;


    /* =====================================================
       START TIME
    ===================================================== */

    const startTime = Date.now();


    /* =====================================================
       CREATE LOADER
    ===================================================== */

    const loader = document.createElement("div");

    loader.id = "brave-loader";


    loader.innerHTML = `

        <div class="brave-loader-background">

            <div class="loader-glow loader-glow-one"></div>

            <div class="loader-glow loader-glow-two"></div>


            <div class="brave-loader-content">

                <div class="brave-loader-mark">

                    <div class="loader-ring"></div>

                    <div class="loader-symbol">

                        <span></span>
                        <span></span>
                        <span></span>

                    </div>

                </div>


                <div class="brave-loader-brand">

                    BRAVE TRADER

                </div>


                <div class="brave-loader-subtitle">

                    Professional Account Management

                </div>


                <div
                    class="brave-loader-status"
                    id="brave-loader-status"
                >

                    Initializing experience...

                </div>


                <div class="brave-loader-progress">

                    <div
                        class="brave-loader-progress-bar"
                        id="brave-loader-progress-bar"
                    ></div>

                </div>


                <div
                    class="brave-loader-percent"
                    id="brave-loader-percent"
                >
                    0%
                </div>


                <div class="brave-loader-footer">

                    STRUCTURE
                    <span>•</span>
                    DISCIPLINE
                    <span>•</span>
                    RISK AWARENESS

                </div>

            </div>

        </div>

    `;


    /* =====================================================
       INSERT IMMEDIATELY
    ===================================================== */

    document.documentElement.appendChild(loader);


    /* =====================================================
       LOADER STYLES
    ===================================================== */

    const style = document.createElement("style");

    style.textContent = `

        #brave-loader {

            position: fixed;

            inset: 0;

            width: 100%;
            height: 100vh;
            height: 100dvh;

            overflow: hidden;

            background: #f7f7f3;

            color: #0b1b33;

            font-family:
                "DM Sans",
                sans-serif;

            opacity: 1;

            visibility: visible;

            pointer-events: auto;

            transition:
                opacity 0.9s ease,
                visibility 0.9s ease;

        }


        #brave-loader.loader-finished {

            opacity: 0;

            visibility: hidden;

            pointer-events: none;

        }


        .brave-loader-background {

            position: relative;

            width: 100%;
            height: 100%;

            display: flex;

            align-items: center;
            justify-content: center;

            overflow: hidden;

        }


        .loader-glow {

            position: absolute;

            border-radius: 50%;

            pointer-events: none;

            filter: blur(5px);

            animation:
                loaderFloat 6s ease-in-out infinite;

            will-change:
                transform;

        }


        .loader-glow-one {

            width: 420px;
            height: 420px;

            top: -220px;
            right: -140px;

            background:
                radial-gradient(
                    circle,
                    rgba(178, 138, 60, 0.14),
                    transparent 70%
                );

        }


        .loader-glow-two {

            width: 360px;
            height: 360px;

            bottom: -220px;
            left: -150px;

            background:
                radial-gradient(
                    circle,
                    rgba(11, 27, 51, 0.07),
                    transparent 70%
                );

            animation-delay:
                -3s;

        }


        .brave-loader-content {

            position: relative;

            z-index: 2;

            width:
                min(340px, 82%);

            text-align: center;

            animation:
                loaderContentIn 0.8s ease both;

        }


        .brave-loader-mark {

            position: relative;

            width: 86px;
            height: 86px;

            margin:
                0 auto 28px;

            display: flex;

            align-items: center;
            justify-content: center;

        }


        .loader-ring {

            position: absolute;

            inset: 0;

            border-radius: 50%;

            border:
                1px solid
                rgba(178, 138, 60, 0.25);

            animation:
                loaderRotate 5s linear infinite;

            will-change:
                transform;

        }


        .loader-ring::before {

            content: "";

            position: absolute;

            width: 7px;
            height: 7px;

            top: -3px;
            left: 50%;

            transform:
                translateX(-50%);

            border-radius: 50%;

            background:
                #b28a3c;

            box-shadow:
                0 0 14px
                rgba(178, 138, 60, 0.45);

        }


        .loader-symbol {

            display: flex;

            align-items: center;
            justify-content: center;

            gap: 5px;

        }


        .loader-symbol span {

            display: block;

            width: 6px;
            height: 30px;

            border-radius: 10px;

            background:
                #b28a3c;

            animation:
                loaderBars 1.15s
                ease-in-out
                infinite;

            will-change:
                transform,
                opacity;

        }


        .loader-symbol span:nth-child(1) {

            animation-delay:
                0s;

        }


        .loader-symbol span:nth-child(2) {

            height: 44px;

            animation-delay:
                0.16s;

        }


        .loader-symbol span:nth-child(3) {

            animation-delay:
                0.32s;

        }


        .brave-loader-brand {

            color:
                #0b1b33;

            font-family:
                "Manrope",
                sans-serif;

            font-size: 15px;

            font-weight: 800;

            letter-spacing: 4px;

            margin-bottom: 8px;

        }


        .brave-loader-subtitle {

            color:
                #6c7480;

            font-size: 10px;

            letter-spacing: 0.8px;

            margin-bottom: 32px;

        }


        .brave-loader-status {

            min-height: 18px;

            color:
                #6c7480;

            font-size: 11px;

            letter-spacing: 0.3px;

            margin-bottom: 13px;

            transition:
                opacity 0.25s ease;

        }


        .brave-loader-progress {

            position: relative;

            width: 100%;

            height: 3px;

            overflow: hidden;

            border-radius: 10px;

            background:
                rgba(11, 27, 51, 0.08);

        }


        .brave-loader-progress-bar {

            width: 0%;

            height: 100%;

            border-radius: inherit;

            background:
                #b28a3c;

            box-shadow:
                0 0 12px
                rgba(178, 138, 60, 0.25);

            transition:
                width 0.25s ease;

        }


        .brave-loader-percent {

            margin-top: 9px;

            color:
                #0b1b33;

            font-size: 10px;

            font-weight: 700;

            letter-spacing: 1px;

        }


        .brave-loader-footer {

            margin-top: 34px;

            color:
                rgba(11, 27, 51, 0.38);

            font-size: 8px;

            font-weight: 700;

            letter-spacing: 1.5px;

        }


        .brave-loader-footer span {

            margin:
                0 6px;

            color:
                rgba(178, 138, 60, 0.65);

        }


        @keyframes loaderBars {

            0%,
            100% {

                transform:
                    scaleY(0.55);

                opacity: 0.45;

            }

            50% {

                transform:
                    scaleY(1);

                opacity: 1;

            }

        }


        @keyframes loaderRotate {

            from {

                transform:
                    rotate(0deg);

            }

            to {

                transform:
                    rotate(360deg);

            }

        }


        @keyframes loaderFloat {

            0%,
            100% {

                transform:
                    translate3d(0, 0, 0);

            }

            50% {

                transform:
                    translate3d(0, 18px, 0);

            }

        }


        @keyframes loaderContentIn {

            from {

                opacity: 0;

                transform:
                    translateY(12px);

            }

            to {

                opacity: 1;

                transform:
                    translateY(0);

            }

        }


        @media (max-width: 480px) {

            .brave-loader-content {

                width: 82%;

            }


            .brave-loader-mark {

                width: 76px;
                height: 76px;

                margin-bottom: 24px;

            }


            .brave-loader-brand {

                font-size: 13px;

                letter-spacing: 3px;

            }


            .brave-loader-subtitle {

                font-size: 9px;

                margin-bottom: 28px;

            }


            .brave-loader-status {

                font-size: 10px;

            }


            .brave-loader-footer {

                font-size: 7px;

                letter-spacing: 1.2px;

            }

        }


        @media (prefers-reduced-motion: reduce) {

            #brave-loader *,
            #brave-loader *::before,
            #brave-loader *::after {

                animation-duration:
                    0.01ms !important;

                animation-iteration-count:
                    1 !important;

                transition-duration:
                    0.01ms !important;

            }

        }

    `;


    document.head.appendChild(style);


    /* =====================================================
       STATUS MESSAGES
    ===================================================== */

    const statuses = [

        "Initializing experience...",

        "Preparing market environment...",

        "Loading Brave Trader...",

        "Preparing account management tools...",

        "Checking page resources...",

        "Establishing your experience...",

        "Almost ready..."

    ];


    const statusElement =
        document.getElementById(
            "brave-loader-status"
        );

    const progressElement =
        document.getElementById(
            "brave-loader-progress-bar"
        );

    const percentElement =
        document.getElementById(
            "brave-loader-percent"
        );


    let currentProgress = 0;
    let statusIndex = 0;


    /* =====================================================
       STATUS ROTATION
    ===================================================== */

    const statusTimer = setInterval(() => {

        if (!statusElement) return;

        statusElement.style.opacity = "0";

        setTimeout(() => {

            statusIndex =
                Math.min(
                    statusIndex + 1,
                    statuses.length - 1
                );

            statusElement.textContent =
                statuses[statusIndex];

            statusElement.style.opacity = "1";

        }, 180);

    }, 900);


    /* =====================================================
       PROGRESS
    ===================================================== */

    const progressTimer = setInterval(() => {

        const elapsed =
            Date.now() - startTime;

        const networkProgress =
            Math.min(
                elapsed / MAXIMUM_LOAD_TIME,
                1
            );

        let targetProgress =
            networkProgress * 100;

        targetProgress =
            Math.min(
                targetProgress,
                96
            );

        if (targetProgress > currentProgress) {

            currentProgress =
                Math.min(
                    currentProgress + 1.8,
                    targetProgress
                );

        }

        if (progressElement) {

            progressElement.style.width =
                currentProgress + "%";

        }

        if (percentElement) {

            percentElement.textContent =
                Math.floor(currentProgress) + "%";

        }

    }, 100);


    /* =====================================================
       RESOURCE PREPARATION
    ===================================================== */

    function prepareResources() {

        const importantImages =
            document.images;

        for (const image of importantImages) {

            if (
                image.loading !== "lazy" &&
                image.complete
            ) {
                continue;
            }

            image.decoding =
                "async";

        }


        /*
         * Tell the browser to decode
         * already-loaded images without
         * blocking the main page.
         */

        const decodePromises = [];

        for (const image of importantImages) {

            if (
                image.complete &&
                image.naturalWidth > 0 &&
                typeof image.decode === "function"
            ) {

                decodePromises.push(
                    image.decode().catch(() => {})
                );

            }

        }

        return Promise.all(
            decodePromises
        );

    }


    /* =====================================================
       PAGE READY
    ===================================================== */

    let pageReady = false;


    function markReady() {

        pageReady = true;

        prepareResources()
            .finally(() => {

                attemptFinish();

            });

    }


    if (
        document.readyState ===
        "complete"
    ) {

        markReady();

    } else {

        window.addEventListener(
            "load",
            markReady,
            { once: true }
        );

    }


    /* =====================================================
       FINISH CHECK
    ===================================================== */

    function attemptFinish() {

        if (!pageReady) return;

        const elapsed =
            Date.now() - startTime;

        const remaining =
            Math.max(
                0,
                MINIMUM_LOAD_TIME - elapsed
            );

        setTimeout(
            finishLoader,
            remaining
        );

    }


    /* =====================================================
       HARD LIMIT
    ===================================================== */

    const maximumTimer =
        setTimeout(() => {

            finishLoader();

        }, MAXIMUM_LOAD_TIME);


    /* =====================================================
       FINISH
    ===================================================== */

    let finished = false;


    function finishLoader() {

        if (finished) return;

        finished = true;

        clearInterval(statusTimer);

        clearInterval(progressTimer);

        clearTimeout(maximumTimer);


        if (progressElement) {

            progressElement.style.width =
                "100%";

        }


        if (percentElement) {

            percentElement.textContent =
                "100%";

        }


        if (statusElement) {

            statusElement.style.opacity =
                "0";

            setTimeout(() => {

                statusElement.textContent =
                    "Welcome.";

                statusElement.style.opacity =
                    "1";

            }, 150);

        }


        setTimeout(() => {

            loader.classList.add(
                "loader-finished"
            );


            document.documentElement
                .classList
                .remove(
                    "brave-loading"
                );


            setTimeout(() => {

                if (loader.parentNode) {

                    loader.parentNode
                        .removeChild(loader);

                }

            }, 1000);

        }, 450);

    }


})();