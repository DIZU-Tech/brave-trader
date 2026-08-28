/* =========================================================
   DIZU SCROLL CONTROL
   Brave Trader × DIZU
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const control = document.getElementById("dizu-scroll-control");
    const track = document.getElementById("dizu-scroll-track");
    const thumb = document.getElementById("dizu-scroll-thumb");

    const upButton = document.getElementById("dizu-scroll-up");
    const downButton = document.getElementById("dizu-scroll-down");


    if (!control || !track || !thumb) {
        return;
    }


    let hideTimer = null;
    let dragging = false;


    /* =====================================================
       SHOW CONTROL
    ===================================================== */

    function showControl() {

        control.classList.add("dizu-visible");

        clearTimeout(hideTimer);

        hideTimer = setTimeout(() => {

            if (!dragging) {
                control.classList.remove("dizu-visible");
            }

        }, 1800);
    }


    /* =====================================================
       UPDATE HANDLE POSITION
    ===================================================== */

    function updateThumb() {

        const scrollTop = window.scrollY;

        const pageHeight =
            document.documentElement.scrollHeight
            - window.innerHeight;


        if (pageHeight <= 0) {
            thumb.style.top = "0px";
            return;
        }


        const trackHeight = track.clientHeight;
        const thumbHeight = thumb.offsetHeight;

        const availableSpace =
            trackHeight - thumbHeight;


        const progress =
            scrollTop / pageHeight;


        thumb.style.top =
            `${progress * availableSpace}px`;
    }


    /* =====================================================
       SCROLL LISTENER
    ===================================================== */

    window.addEventListener(
        "scroll",
        () => {

            showControl();

            updateThumb();

        },
        { passive: true }
    );


    /* =====================================================
       CONVERT TRACK POSITION → PAGE POSITION
    ===================================================== */

    function movePageFromPointer(clientY) {

        const rect = track.getBoundingClientRect();

        const thumbHeight = thumb.offsetHeight;

        const availableSpace =
            rect.height - thumbHeight;


        let position =
            clientY
            - rect.top
            - thumbHeight / 2;


        position =
            Math.max(
                0,
                Math.min(
                    position,
                    availableSpace
                )
            );


        const progress =
            availableSpace > 0
                ? position / availableSpace
                : 0;


        const pageHeight =
            document.documentElement.scrollHeight
            - window.innerHeight;


        window.scrollTo({
            top: progress * pageHeight,
            behavior: "auto"
        });


        updateThumb();
        showControl();
    }


    /* =====================================================
       TRACK CLICK
    ===================================================== */

    track.addEventListener(
        "pointerdown",
        (event) => {

            dragging = true;

            track.setPointerCapture(event.pointerId);

            movePageFromPointer(event.clientY);
        }
    );


    /* =====================================================
       DRAG
    ===================================================== */

    track.addEventListener(
        "pointermove",
        (event) => {

            if (!dragging) {
                return;
            }

            movePageFromPointer(event.clientY);
        }
    );


    track.addEventListener(
        "pointerup",
        (event) => {

            dragging = false;

            try {
                track.releasePointerCapture(event.pointerId);
            } catch (error) {}

            showControl();
        }
    );


    track.addEventListener(
        "pointercancel",
        () => {

            dragging = false;

            showControl();
        }
    );


    /* =====================================================
       UP BUTTON
    ===================================================== */

    if (upButton) {

        upButton.addEventListener(
            "click",
            () => {

                window.scrollBy({
                    top: -window.innerHeight * 0.75,
                    behavior: "smooth"
                });

                showControl();
            }
        );

    }


    /* =====================================================
       DOWN BUTTON
    ===================================================== */

    if (downButton) {

        downButton.addEventListener(
            "click",
            () => {

                window.scrollBy({
                    top: window.innerHeight * 0.75,
                    behavior: "smooth"
                });

                showControl();
            }
        );

    }


    /* =====================================================
       INITIAL POSITION
    ===================================================== */

    updateThumb();

});