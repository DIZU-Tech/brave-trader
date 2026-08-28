/* =========================================================
   BRAVE TRADER — DIZU WEATHER EXPERIENCE
   Optimized Weather Engine
========================================================= */

(function () {

    "use strict";


    const WEATHER_DELAY = 30000;

    const SUNNY_DURATION = 30000;
    const RAIN_DURATION = 30000;
    const CLEAR_DURATION = 30000;


    let weatherStarted = false;
    let weatherPaused = false;
    let weatherTimers = [];


    /* =====================================================
       CREATE WEATHER
    ===================================================== */

    function createWeather() {

        if (
            document.getElementById(
                "dizu-weather"
            )
        ) {
            return;
        }


        const weather =
            document.createElement("div");


        weather.id =
            "dizu-weather";


        weather.className =
            "dizu-weather";


        weather.innerHTML = `

            <div class="weather-sky"></div>

            <div class="weather-sun">

                <div class="sun-core"></div>

                <div class="sun-glow"></div>

            </div>


            <div class="weather-cloud cloud-one"></div>

            <div class="weather-cloud cloud-two"></div>

            <div class="weather-cloud cloud-three"></div>


            <div class="weather-mist"></div>


            <div
                class="weather-rain"
                id="weather-rain"
            ></div>


            <div class="weather-glass"></div>


            <div
                class="weather-lightning"
                id="weather-lightning"
            ></div>

        `;


        document.body.appendChild(
            weather
        );


        createRain(
            weather
        );


        requestAnimationFrame(() => {

            weather.classList.add(
                "weather-active"
            );

        });


        return weather;

    }


    /* =====================================================
       RAIN
    ===================================================== */

    function createRain(weather) {

        const rain =
            weather.querySelector(
                "#weather-rain"
            );


        if (!rain) return;


        const mobile =
            window.innerWidth <= 600;


        const dropCount =
            mobile ? 28 : 42;


        const fragment =
            document.createDocumentFragment();


        for (
            let i = 0;
            i < dropCount;
            i++
        ) {

            const drop =
                document.createElement(
                    "span"
                );


            drop.className =
                "rain-drop";


            drop.style.left =
                Math.random() * 100 +
                "%";


            drop.style.animationDelay =
                Math.random() * 2 +
                "s";


            drop.style.animationDuration =
                (
                    0.85 +
                    Math.random() * 0.65
                ) + "s";


            drop.style.height =
                (
                    18 +
                    Math.random() * 14
                ) + "px";


            drop.style.opacity =
                (
                    0.3 +
                    Math.random() * 0.4
                ).toFixed(2);


            fragment.appendChild(
                drop
            );

        }


        rain.appendChild(
            fragment
        );

    }


    /* =====================================================
       TIMER MANAGEMENT
    ===================================================== */

    function clearWeatherTimers() {

        weatherTimers.forEach(
            timer => clearTimeout(timer)
        );


        weatherTimers = [];

    }


    function addTimer(
        callback,
        delay
    ) {

        weatherTimers.push(
            setTimeout(
                callback,
                delay
            )
        );

    }


    /* =====================================================
       WEATHER CYCLE
    ===================================================== */

    function startCycle(weather) {

        clearWeatherTimers();


        /*
         * SUNNY
         */

        weather.className =
            "dizu-weather weather-active weather-sunny";


        /*
         * SUN → CLOUD
         */

        addTimer(() => {

            if (weatherPaused) return;

            weather.classList.remove(
                "weather-sunny"
            );

            weather.classList.add(
                "weather-clouding"
            );

        }, SUNNY_DURATION);


        /*
         * RAIN
         */

        addTimer(() => {

            if (weatherPaused) return;

            weather.classList.add(
                "weather-raining"
            );

            triggerLightning(
                weather
            );

        }, SUNNY_DURATION + 2500);


        /*
         * CLEAR
         */

        addTimer(() => {

            if (weatherPaused) return;

            weather.classList.remove(
                "weather-raining"
            );

            weather.classList.add(
                "weather-clearing"
            );

        }, SUNNY_DURATION + RAIN_DURATION);


        /*
         * SUN RETURNS
         */

        addTimer(() => {

            if (weatherPaused) return;

            weather.classList.remove(
                "weather-clouding"
            );

            weather.classList.remove(
                "weather-clearing"
            );

            weather.classList.add(
                "weather-sunny"
            );

        },
        SUNNY_DURATION +
        RAIN_DURATION +
        CLEAR_DURATION);


        /*
         * REPEAT
         */

        addTimer(() => {

            if (weatherPaused) return;

            startCycle(
                weather
            );

        },
        SUNNY_DURATION +
        RAIN_DURATION +
        CLEAR_DURATION +
        1000);

    }


    /* =====================================================
       LIGHTNING
    ===================================================== */

    function triggerLightning(
        weather
    ) {

        const lightning =
            weather.querySelector(
                "#weather-lightning"
            );


        if (!lightning) return;


        let flashes = 0;


        function flash() {

            if (
                weatherPaused ||
                flashes >= 3
            ) {
                return;
            }


            flashes++;


            lightning.classList.add(
                "lightning-flash"
            );


            setTimeout(() => {

                lightning.classList.remove(
                    "lightning-flash"
                );

            }, 120);


            setTimeout(
                flash,
                1800 + Math.random() * 2500
            );

        }


        setTimeout(
            flash,
            700 + Math.random() * 1600
        );

    }


    /* =====================================================
       START
    ===================================================== */

    function startWeather() {

        if (weatherStarted) return;


        /*
         * Don't compete with loader.
         */

        if (
            document.getElementById(
                "brave-loader"
            )
        ) {

            setTimeout(
                startWeather,
                1000
            );

            return;

        }


        weatherStarted = true;


        const weather =
            createWeather();


        if (!weather) return;


        startCycle(
            weather
        );

    }


    /* =====================================================
       DELAY
    ===================================================== */

    setTimeout(() => {

        startWeather();

    }, WEATHER_DELAY);


    /* =====================================================
       TAB VISIBILITY
    ===================================================== */

    document.addEventListener(
        "visibilitychange",
        () => {

            const weather =
                document.getElementById(
                    "dizu-weather"
                );


            if (!weather) return;


            weatherPaused =
                document.hidden;


            if (weatherPaused) {

                weather.classList.add(
                    "weather-paused"
                );

                clearWeatherTimers();

            } else {

                weather.classList.remove(
                    "weather-paused"
                );

                startCycle(
                    weather
                );

            }

        }
    );


    /* =====================================================
       CLEANUP
    ===================================================== */

    window.addEventListener(
        "pagehide",
        () => {

            clearWeatherTimers();

            const weather =
                document.getElementById(
                    "dizu-weather"
                );


            if (weather) {

                weather.remove();

            }

        }
    );


})();