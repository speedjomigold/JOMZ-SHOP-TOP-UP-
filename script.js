/* ==========================================
   JOMZ SHOP
   FRONTEND ONLY
========================================== */


/* ==========================================
   WHATSAPP NUMBER
========================================== */

const WHATSAPP_NUMBER = "2349042529385";


/* ==========================================
   PAGE LOADED
========================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {


        /* ======================================
           ELEMENTS
        ====================================== */

        const loader =
            document.getElementById(
                "jomzLoader"
            );


        const loaderProgress =
            document.getElementById(
                "loaderProgress"
            );


        const playerIDInput =
            document.getElementById(
                "playerID"
            );


        const packageCards =
            document.querySelectorAll(
                ".package-card"
            );


        const displayID =
            document.getElementById(
                "displayID"
            );


        const displayPackage =
            document.getElementById(
                "displayPackage"
            );


        const displayPrice =
            document.getElementById(
                "displayPrice"
            );


        const orderButton =
            document.getElementById(
                "whatsappOrder"
            );


        /* ======================================
           SELECTED PACKAGE
        ====================================== */

        let selectedPackage = "";

        let selectedPrice = 0;


        /* ======================================
           CUSTOM MESSAGE POPUP ELEMENTS
        ====================================== */

        const jomzMessageModal =
            document.getElementById(
                "jomzMessageModal"
            );


        const jomzMessageClose =
            document.getElementById(
                "jomzMessageClose"
            );


        const jomzMessageButton =
            document.getElementById(
                "jomzMessageButton"
            );


        const jomzMessageTitle =
            document.getElementById(
                "jomzMessageTitle"
            );


        const jomzMessageText =
            document.getElementById(
                "jomzMessageText"
            );


        const jomzMessageIcon =
            document.getElementById(
                "jomzMessageIcon"
            );


        /* ======================================
           SHOW CUSTOM MESSAGE
        ====================================== */

        function showJomzMessage(
            title,
            message,
            icon = "⚠️"
        ) {

            if (!jomzMessageModal) {
                return;
            }


            if (jomzMessageTitle) {

                jomzMessageTitle.textContent =
                    title;

            }


            if (jomzMessageText) {

                jomzMessageText.textContent =
                    message;

            }


            if (jomzMessageIcon) {

                jomzMessageIcon.textContent =
                    icon;

            }


            jomzMessageModal.classList.add(
                "active"
            );


            document.body.style.overflow =
                "hidden";

        }


        /* ======================================
           CLOSE CUSTOM MESSAGE
        ====================================== */

        function closeJomzMessage() {

            if (!jomzMessageModal) {
                return;
            }


            jomzMessageModal.classList.remove(
                "active"
            );


            document.body.style.overflow =
                "";

        }


        if (jomzMessageClose) {

            jomzMessageClose.addEventListener(
                "click",
                closeJomzMessage
            );

        }


        if (jomzMessageButton) {

            jomzMessageButton.addEventListener(
                "click",
                closeJomzMessage
            );

        }


        if (jomzMessageModal) {

            jomzMessageModal.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target ===
                        jomzMessageModal
                    ) {

                        closeJomzMessage();

                    }

                }
            );

        }


        /* ======================================
           SAVE CUSTOMER PROGRESS
        ====================================== */

        function saveProgress() {

            if (playerIDInput) {

                localStorage.setItem(
                    "jomzPlayerID",
                    playerIDInput.value.trim()
                );

            }


            localStorage.setItem(
                "jomzSelectedPackage",
                selectedPackage
            );


            localStorage.setItem(
                "jomzSelectedPrice",
                String(selectedPrice)
            );

        }


        /* ======================================
           RESTORE CUSTOMER PROGRESS
        ====================================== */

        function restoreProgress() {

            const savedPlayerID =
                localStorage.getItem(
                    "jomzPlayerID"
                );


            const savedPackage =
                localStorage.getItem(
                    "jomzSelectedPackage"
                );


            const savedPrice =
                localStorage.getItem(
                    "jomzSelectedPrice"
                );


            /* =================================
               RESTORE PLAYER ID
            ================================= */

            if (
                savedPlayerID &&
                playerIDInput
            ) {

                const cleanPlayerID =
                    savedPlayerID
                        .replace(
                            /\D/g,
                            ""
                        )
                        .slice(
                            0,
                            11
                        );


                playerIDInput.value =
                    cleanPlayerID;


                if (displayID) {

                    displayID.textContent =
                        cleanPlayerID ||
                        "Not entered";

                }

            }


            /* =================================
               RESTORE PACKAGE
            ================================= */

            if (
                savedPackage &&
                savedPrice &&
                Number(savedPrice) > 0
            ) {

                selectedPackage =
                    savedPackage;


                selectedPrice =
                    Number(savedPrice);


                /* Update summary */

                if (displayPackage) {

                    displayPackage.textContent =
                        Number(
                            selectedPackage
                        ).toLocaleString()
                        +
                        " Diamonds";

                }


                if (displayPrice) {

                    displayPrice.textContent =
                        "₦"
                        +
                        selectedPrice.toLocaleString();

                }


                /* Restore selected card */

                packageCards.forEach(
                    function (card) {

                        const cardPackage =
                            card.getAttribute(
                                "data-package"
                            );


                        if (
                            cardPackage ===
                            selectedPackage
                        ) {

                            card.classList.add(
                                "selected"
                            );

                        } else {

                            card.classList.remove(
                                "selected"
                            );

                        }

                    }
                );

            }

        }


        /* ======================================
           LOADER
        ====================================== */

        let loaderProgressValue = 0;


        const loaderInterval =
            setInterval(
                function () {

                    loaderProgressValue += 5;


                    if (
                        loaderProgressValue >
                        100
                    ) {

                        loaderProgressValue =
                            100;

                    }


                    if (loaderProgress) {

                        loaderProgress.style.width =
                            loaderProgressValue +
                            "%";

                    }


                    if (
                        loaderProgressValue >=
                        100
                    ) {

                        clearInterval(
                            loaderInterval
                        );


                        setTimeout(
                            function () {

                                if (loader) {

                                    loader.classList.add(
                                        "hide"
                                    );

                                }

                            },
                            300
                        );

                    }

                },
                45
            );


        /* ======================================
           MODAL ELEMENTS
        ====================================== */

        const howModal =
            document.getElementById(
                "howModal"
            );


        const openHowTo =
            document.getElementById(
                "openHowTo"
            );


        const closeHowTo =
            document.getElementById(
                "closeHowTo"
            );


        const navHowTo =
            document.getElementById(
                "navHowTo"
            );


        const modalStartButton =
            document.getElementById(
                "modalStartButton"
            );


        /* ======================================
           OPEN HOW-TO MODAL
        ====================================== */

        function openModal() {

            if (!howModal) {
                return;
            }


            howModal.classList.add(
                "active"
            );


            howModal.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.style.overflow =
                "hidden";

        }


        /* ======================================
           CLOSE HOW-TO MODAL
        ====================================== */

        function closeModal() {

            if (!howModal) {
                return;
            }


            howModal.classList.remove(
                "active"
            );


            howModal.setAttribute(
                "aria-hidden",
                "true"
            );


            document.body.style.overflow =
                "";

        }


        /* ======================================
           HOW-TO BUTTON
        ====================================== */

        if (openHowTo) {

            openHowTo.addEventListener(
                "click",
                openModal
            );

        }


        if (navHowTo) {

            navHowTo.addEventListener(
                "click",
                openModal
            );

        }


        if (closeHowTo) {

            closeHowTo.addEventListener(
                "click",
                closeModal
            );

        }


        /* ======================================
           CLICK OUTSIDE HOW-TO MODAL
        ====================================== */

        if (howModal) {

            howModal.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target ===
                        howModal
                    ) {

                        closeModal();

                    }

                }
            );

        }


        /* ======================================
           ESCAPE KEY
        ====================================== */

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key ===
                    "Escape"
                ) {

                    closeModal();

                    closeJomzMessage();

                }

            }
        );


        /* ======================================
           MODAL START TOP UP
        ====================================== */

        if (modalStartButton) {

            modalStartButton.addEventListener(
                "click",
                function () {

                    closeModal();


                    setTimeout(
                        function () {

                            const topup =
                                document.getElementById(
                                    "topup"
                                );


                            if (topup) {

                                topup.scrollIntoView({
                                    behavior:
                                        "smooth"
                                });

                            }

                        },
                        150
                    );

                }
            );

        }


        /* ======================================
           PACKAGE SELECTION
        ====================================== */

        packageCards.forEach(
            function (card) {

                card.addEventListener(
                    "click",
                    function () {


                        /* Remove old selection */

                        packageCards.forEach(
                            function (item) {

                                item.classList.remove(
                                    "selected"
                                );

                            }
                        );


                        /* Select current package */

                        card.classList.add(
                            "selected"
                        );


                        /* Get package */

                        selectedPackage =
                            card.getAttribute(
                                "data-package"
                            );


                        /* Get price */

                        selectedPrice =
                            Number(
                                card.getAttribute(
                                    "data-price"
                                )
                            );


                        /* Update package summary */

                        if (displayPackage) {

                            displayPackage.textContent =
                                Number(
                                    selectedPackage
                                ).toLocaleString()
                                +
                                " Diamonds";

                        }


                        /* Update price summary */

                        if (displayPrice) {

                            displayPrice.textContent =
                                "₦"
                                +
                                selectedPrice.toLocaleString();

                        }


                        /* Save progress */

                        saveProgress();

                    }
                );

            }
        );


        /* ======================================
           PLAYER ID INPUT
        ====================================== */

        if (playerIDInput) {

            playerIDInput.addEventListener(
                "input",
                function () {


                    /* Numbers only */

                    this.value =
                        this.value
                            .replace(
                                /\D/g,
                                ""
                            )
                            .slice(
                                0,
                                11
                            );


                    /* Update summary */

                    if (
                        this.value.length >
                        0
                    ) {

                        if (displayID) {

                            displayID.textContent =
                                this.value;

                        }

                    } else {

                        if (displayID) {

                            displayID.textContent =
                                "Not entered";

                        }

                    }


                    /* Save progress */

                    saveProgress();

                }
            );

        }


        /* ======================================
           WHATSAPP ORDER
        ====================================== */

        if (orderButton) {

            orderButton.addEventListener(
                "click",
                function () {


                    const playerID =
                        playerIDInput ?
                        playerIDInput.value.trim() :
                        "";


                    /* =================================
                       CHECK PLAYER ID
                    ================================= */

                    if (
                        playerID.length !==
                        11
                    ) {

                        showJomzMessage(
                            "Invalid Player ID",
                            "Please enter your complete 11-digit Free Fire Player ID.",
                            "⚠️"
                        );


                        if (playerIDInput) {

                            playerIDInput.focus();

                        }


                        return;

                    }


                    /* =================================
                       CHECK PACKAGE
                    ================================= */

                    if (
                        selectedPackage ===
                        ""
                    ) {

                        showJomzMessage(
                            "Select a Package",
                            "Please select a Diamond package before placing your order.",
                            "💎"
                        );


                        return;

                    }


                    /* =================================
                       REDIRECT POPUP
                    ================================= */

                    const redirectModal =
                        document.getElementById(
                            "redirectModal"
                        );


                    const redirectProgress =
                        document.getElementById(
                            "redirectProgress"
                        );


                    const redirectPercent =
                        document.getElementById(
                            "redirectPercent"
                        );


                   /* =================================
                       CREATE ORDER MESSAGE
                    ================================= */

                    const message =
`🔥 JOMZ SHOP — FREE FIRE TOP UP

🎮 Player ID: ${playerID}
💎 Package: ${Number(selectedPackage).toLocaleString()} Diamonds
💰 Price: ₦${selectedPrice.toLocaleString()}

Hello JOMZ SHOP, I want to order this Free Fire top up. Please confirm my order.`;


                    /* =================================
                       CREATE WHATSAPP URL
                    ================================= */

                    const whatsappURL =
                        "https://wa.me/"
                        +
                        WHATSAPP_NUMBER
                        +
                        "?text="
                        +
                        encodeURIComponent(
                            message
                        );


                    /* =================================
                       SHOW REDIRECT POPUP
                    ================================= */

                    if (redirectModal) {

                        redirectModal.classList.add(
                            "active"
                        );

                    }


                    /* =================================
                       RESET REDIRECT PROGRESS
                    ================================= */

                    let redirectValue = 0;


                    if (
                        redirectProgress
                    ) {

                        redirectProgress.style.width =
                            "0%";

                    }


                    if (
                        redirectPercent
                    ) {

                        redirectPercent.textContent =
                            "0";

                    }


                    /* =================================
                       START REDIRECT LOADER
                    ================================= */

                    const redirectInterval =
                        setInterval(
                            function () {


                                redirectValue +=
                                    2;


                                if (
                                    redirectValue >
                                    100
                                ) {

                                    redirectValue =
                                        100;

                                }


                                /* Progress bar */

                                if (
                                    redirectProgress
                                ) {

                                    redirectProgress.style.width =
                                        redirectValue +
                                        "%";

                                }


                                /* Percentage */

                                if (
                                    redirectPercent
                                ) {

                                    redirectPercent.textContent =
                                        redirectValue;

                                }


                                /* Finished */

                                if (
                                    redirectValue >=
                                    100
                                ) {

                                    clearInterval(
                                        redirectInterval
                                    );


                                    setTimeout(
                                        function () {

                                            window.location.href =
                                                whatsappURL;

                                        },
                                        300
                                    );

                                }

                            },
                            20
                        );

                }
            );

        }


        /* ======================================
           DEFAULT SUMMARY
        ====================================== */

        if (displayID) {

            displayID.textContent =
                "Not entered";

        }


        if (displayPackage) {

            displayPackage.textContent =
                "Select package";

        }


        if (displayPrice) {

            displayPrice.textContent =
                "₦0";

        }


        /* ======================================
           RESTORE SAVED PROGRESS
           
           IMPORTANT:
           This must happen AFTER
           the default summary is set.
        ====================================== */

        restoreProgress();


    }
);