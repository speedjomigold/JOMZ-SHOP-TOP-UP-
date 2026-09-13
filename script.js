let selectedPackage = "";
let selectedPrice = "";

let orderCreated = false;
let notificationShown = false;

// ==========================================
// CLEAR COMPLETED ORDER
// ==========================================

function clearCompletedOrder() {

localStorage.removeItem("jomzSelectedPackage");
localStorage.removeItem("jomzSelectedPrice");
localStorage.removeItem("jomzPlayerID");
localStorage.removeItem("jomzOrderId");
localStorage.removeItem("topupCompletedShown");
localStorage.removeItem("jomzPaymentStage");

selectedPackage = "";
selectedPrice = "";
orderCreated = false;
notificationShown = false;


const playerID =
    document.getElementById("playerID");

if (playerID) {

    playerID.value = "";

}


const displayID =
    document.getElementById("displayID");

if (displayID) {

    displayID.textContent =
        "Not entered";

}


const displayPackage =
    document.getElementById(
        "displayPackage"
    );

if (displayPackage) {

    displayPackage.textContent =
        "Not selected";

}


const displayPrice =
    document.getElementById(
        "displayPrice"
    );

if (displayPrice) {

    displayPrice.textContent =
        "₦0";

}


const payButton =
    document.getElementById(
        "payButton"
    );

if (payButton) {

    payButton.style.display =
        "none";

}


const paymentBox =
    document.getElementById(
        "paymentBox"
    );

if (paymentBox) {

    paymentBox.style.display =
        "none";

}

const transferButton =
    document.getElementById("confirmTransferButton");

if (transferButton) {
    transferButton.style.display = "none";
}

const pendingMessage =
    document.getElementById("paymentPendingMessage");

if (pendingMessage) {
    pendingMessage.style.display = "none";
}

const orderStatus =
    document.getElementById("orderStatus");

if (orderStatus) {
    orderStatus.remove();
}

const placeOrderButton =
    document.querySelector('.summary button[onclick="placeOrder()"]');

if (placeOrderButton) {
    placeOrderButton.style.display = "inline-block";
}

}

// ==========================================
// RESTORE CUSTOMER DATA
// ==========================================

document.addEventListener(
"DOMContentLoaded",
function () {

    const savedPackage =
        localStorage.getItem(
            "jomzSelectedPackage"
        );

    const savedPrice =
        localStorage.getItem(
            "jomzSelectedPrice"
        );

    const savedPlayerID =
        localStorage.getItem(
            "jomzPlayerID"
        );

    const savedOrderID =
        localStorage.getItem(
            "jomzOrderId"
        );


    if (
        savedPackage &&
        savedPrice
    ) {

        selectedPackage =
            savedPackage;

        selectedPrice =
            savedPrice;


        const displayPackage =
            document.getElementById(
                "displayPackage"
            );

        const displayPrice =
            document.getElementById(
                "displayPrice"
            );


        if (displayPackage) {

            displayPackage.textContent =
                savedPackage;

        }


        if (displayPrice) {

            displayPrice.textContent =
                savedPrice;

        }


        document.querySelectorAll(
            ".package"
        ).forEach(item => {

            item.classList.remove(
                "selected"
            );

            const itemText =
                item.textContent || "";

            if (
                itemText.includes(
                    savedPackage
                )
            ) {

                item.classList.add(
                    "selected"
                );

            }

        });

    }


    if (savedPlayerID) {

        const playerID =
            document.getElementById(
                "playerID"
            );

        const displayID =
            document.getElementById(
                "displayID"
            );


        if (playerID) {

            playerID.value =
                savedPlayerID;

        }


        if (displayID) {

            displayID.textContent =
                savedPlayerID;

        }

    }


    if (savedOrderID) {

        orderCreated = true;


        const payButton =
            document.getElementById(
                "payButton"
            );


        if (payButton) {

            payButton.style.display =
                "none";

        }

        const savedPaymentStage =
            localStorage.getItem("jomzPaymentStage") || "pay";

        setPaymentStage(savedPaymentStage);

        checkOrderStatus();

    }

}

);

// ==========================================
// SELECT PACKAGE
// ==========================================

function selectPackage(
element,
packageName,
price
) {

document.querySelectorAll(
    ".package"
).forEach(item => {

    item.classList.remove(
        "selected"
    );

});


if (element) {

    element.classList.add(
        "selected"
    );

}


selectedPackage =
    packageName;

selectedPrice =
    price;


localStorage.setItem(
    "jomzSelectedPackage",
    packageName
);


localStorage.setItem(
    "jomzSelectedPrice",
    price
);


localStorage.removeItem(
    "topupCompletedShown"
);


const displayPackage =
    document.getElementById(
        "displayPackage"
    );

const displayPrice =
    document.getElementById(
        "displayPrice"
    );


if (displayPackage) {

    displayPackage.textContent =
        packageName;

}


if (displayPrice) {

    displayPrice.textContent =
        price;

}

}

// ==========================================
// PLAYER ID
// ==========================================

document.addEventListener(
"DOMContentLoaded",
function () {

    const playerID =
        document.getElementById(
            "playerID"
        );


    if (playerID) {

        playerID.addEventListener(
            "input",
            function () {

                const displayID =
                    document.getElementById(
                        "displayID"
                    );


                if (displayID) {

                    displayID.textContent =
                        this.value ||
                        "Not entered";

                }


                localStorage.setItem(
                    "jomzPlayerID",
                    this.value
                );

            }
        );

    }

}

);

// ==========================================
// SCROLL TO TOP UP
// ==========================================

function scrollToTopUp() {

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

}
// ==========================================
// SHOW ORDER CONFIRMATION
// ==========================================

function placeOrder() {

    // Check if JOMZ SHOP is open
    if (!isPaymentActive()) {

        const payButton =
            document.getElementById("payButton");

        if (payButton) {
            payButton.style.display = "none";
        }

        showOrderClosedPopup();

        return;
    }


    const playerIDElement =
        document.getElementById("playerID");


    const playerID =
        playerIDElement.value.trim();


    if (!playerID) {

        alert(
            "Please enter your Free Fire Player ID."
        );

        return;

    }


    if (!selectedPackage) {

        alert(
            "Please select a diamond package."
        );

        return;

    }


    const details =
        document.getElementById(
            "orderConfirmDetails"
        );


    if (details) {

        details.innerHTML =
            "<p><strong>Player ID:</strong> " +
            playerID +
            "</p>" +

            "<p><strong>Package:</strong> " +
            selectedPackage +
            "</p>" +

            "<p><strong>Price:</strong> ₦" +
            selectedPrice +
            "</p>";

    }


    const popup =
        document.getElementById(
            "orderConfirmPopup"
        );


    if (popup) {

        popup.style.display = "flex";

    }

}
// ==========================================
// CLOSE CONFIRMATION POPUP
// ==========================================

function closeOrderConfirmPopup() {

    const popup =
        document.getElementById(
            "orderConfirmPopup"
        );

    if (popup) {

        popup.style.display = "none";

    }

}


// ==========================================
// CONFIRM ORDER
// ==========================================

function confirmOrder() {

    closeOrderConfirmPopup();

    submitOrder();

}

// ==========================================
// PLACE ORDER
// ==========================================

function submitOrder() {

    const payButton =
    document.getElementById("payButton");

if (payButton) {
    payButton.style.display = "none";
}

    // Check payment/order opening hours first
    if (!isPaymentActive()) {
        showOrderClosedPopup();
        return;
    }


    const playerIDElement =
        document.getElementById(
            "playerID"
        );


    if (!playerIDElement) {

        alert(
            "Player ID field not found."
        );

        return;

    }


    const playerID =
        playerIDElement.value.trim();


    if (!playerID) {

        alert(
            "Please enter your Free Fire Player ID."
        );

        return;

    }


    if (!selectedPackage) {

        alert(
            "Please select a diamond package."
        );

        return;

    }


    localStorage.setItem(
        "jomzPlayerID",
        playerID
    );


    fetch(
        "/api/orders",
        {

            method:
                "POST",

            headers: {

                "Content-Type":
                    "application/json"

            },

            body: JSON.stringify({

                name:
                    playerID,

                product:
                    selectedPackage,

                quantity:
                    1,

                price:
                    selectedPrice

            })

        }
    )

    .then(response => {

        if (!response.ok) {

            throw new Error(
                "Server error"
            );

        }

        return response.json();

    })

    .then(data => {

        if (data.success) {

            localStorage.setItem(
                "jomzOrderId",
                data.orderId
            );


            orderCreated = true;

            notificationShown = false;


            setPaymentStage("pay");


            alert(
                "Order received successfully!\n\n" +
                "Order ID: " +
                data.orderId +
                "\nStatus: Pending"
            );


            checkOrderStatus();

        }

        else {

            alert(
                data.message ||
                "Could not create order."
            );

        }

    })

    .catch(error => {

        console.error(error);

        alert(
            "Could not connect to the JOMZ SHOP server."
        );

    });

}

// ==========================================
// CHECK ORDER STATUS
// ==========================================

function checkOrderStatus() {

    const orderId =
        localStorage.getItem("jomzOrderId");

    if (!orderId) {
        return;
    }

    fetch(
        "/api/order-status/" +
        encodeURIComponent(orderId)
    )
    .then(response => {

        if (!response.ok) {
            throw new Error("Status request failed");
        }

        return response.json();

    })
    .then(data => {

        if (!data.success) {
            return;
        }

        const status = data.status || "Pending";

        if (status === "Payment Not Received") {
            setPaymentStage("payment");
            showOrderStatus(status);
            return;
        }

        if (status === "Completed") {
            handleCompletedOrder(orderId);
            return;
        }

        const paymentStage =
            localStorage.getItem("jomzPaymentStage") || "pay";

        setPaymentStage(paymentStage);
        showOrderStatus(status);

    })
    .catch(error => {
        console.log("Could not check order status.");
    });

}

// ==========================================
// PAYMENT UI STATE
// ==========================================

function setPaymentStage(stage) {

    localStorage.setItem(
        "jomzPaymentStage",
        stage
    );

    const placeOrderButton =
        document.querySelector(
            '.summary button[onclick="placeOrder()"]'
        );

    const payButton =
        document.getElementById("payButton");

    const paymentBox =
        document.getElementById("paymentBox");

    const transferButton =
        document.getElementById("confirmTransferButton");

    const pendingMessage =
        document.getElementById("paymentPendingMessage");

    if (stage === "order") {

        if (placeOrderButton) {
            placeOrderButton.style.display = "inline-block";
        }

        if (payButton) {
            payButton.style.display = "none";
        }

        if (paymentBox) {
            paymentBox.style.display = "none";
        }

        if (transferButton) {
            transferButton.style.display = "none";
        }

        if (pendingMessage) {
            pendingMessage.style.display = "none";
        }

        return;
    }

    if (stage === "pay") {

        if (placeOrderButton) {
            placeOrderButton.style.display = "none";
        }

        if (payButton) {
            payButton.style.display = "inline-block";
        }

        if (paymentBox) {
            paymentBox.style.display = "none";
        }

        if (transferButton) {
            transferButton.style.display = "none";
        }

        if (pendingMessage) {
            pendingMessage.style.display = "none";
        }

        return;
    }

    if (stage === "payment") {

        if (placeOrderButton) {
            placeOrderButton.style.display = "none";
        }

        if (payButton) {
            payButton.style.display = "none";
        }

        if (paymentBox) {
            paymentBox.style.display = "block";
        }

        if (transferButton) {
            transferButton.style.display = "inline-block";
        }

        if (pendingMessage) {
            pendingMessage.style.display = "none";
        }

        return;
    }

    if (stage === "pending") {

        if (placeOrderButton) {
            placeOrderButton.style.display = "none";
        }

        if (payButton) {
            payButton.style.display = "none";
        }

        if (paymentBox) {
            paymentBox.style.display = "block";
        }

        if (transferButton) {
            transferButton.style.display = "none";
        }

        if (pendingMessage) {
            pendingMessage.style.display = "block";
            pendingMessage.textContent =
                "⏳ Your top-up is still pending. Your payment is being checked.";
        }

    }

}

// ==========================================
// HANDLE COMPLETED ORDER
// ==========================================

function handleCompletedOrder(completedOrderId) {

    if (!completedOrderId) {
        completedOrderId =
            localStorage.getItem("jomzOrderId");
    }

    if (completedOrderId) {
        localStorage.setItem(
            "jomzCompletedOrderId",
            completedOrderId
        );
    }

    showOrderStatus("Completed");

    if (!localStorage.getItem("topupCompletedShown")) {

        showCustomerMessagePopup(
            "🎉 TOP-UP COMPLETED!\n\nYour Free Fire diamonds have been successfully added to your account. Thank you for shopping with JOMZ SHOP! ❤️"
        );

        localStorage.setItem(
            "topupCompletedShown",
            "true"
        );

        clearCompletedOrder();
    }

}

// ==========================================
// SHOW ORDER STATUS
// ==========================================

function showOrderStatus(status) {

    let statusBox =
        document.getElementById("orderStatus");

    if (!statusBox) {

        statusBox =
            document.createElement("div");

        statusBox.id = "orderStatus";
        statusBox.style.marginTop = "20px";
        statusBox.style.padding = "15px";
        statusBox.style.textAlign = "center";
        statusBox.style.fontSize = "18px";
        statusBox.style.borderRadius = "10px";

        const summary =
            document.querySelector(".summary");

        if (summary) {
            summary.appendChild(statusBox);
        }

    }

    if (!statusBox) {
        return;
    }

    if (status === "Payment Not Received") {

        setPaymentStage("payment");

        statusBox.innerHTML =
            "🔴 <b>Payment Not Received</b>" +
            "<br><br>" +
            "<span style='font-size:14px;color:#aaa;'>" +
            "Please check your payment and tap " +
            "<b>I HAVE MADE THE TRANSFER</b> again." +
            "</span>";

        return;
    }

    if (status === "Completed") {

        statusBox.innerHTML =
            "🟢 <b>Top-Up Completed!</b>" +
            "<br><br>" +
            "<button onclick=\"openReceipt()\" " +
            "style=\"padding:12px 18px;" +
            "border:none;" +
            "border-radius:8px;" +
            "cursor:pointer;" +
            "font-weight:bold;\">" +
            "🧾 View / Download Receipt" +
            "</button>";

        return;
    }

    if (status === "Pending") {

        statusBox.innerHTML =
            "🟡 <b>Top-Up Pending...</b>";

        return;
    }

    statusBox.innerHTML =
        "🟡 <b>Status: " +
        status +
        "</b>";

}

// ==========================================
// PAY NOW
// ==========================================

function startPayment() {

    const orderId =
        localStorage.getItem("jomzOrderId");

    if (!orderId) {
        alert("Please place an order first.");
        return;
    }

    setPaymentStage("payment");

}


// ==========================================
// PAYMENT NOTIFICATION
// ==========================================

function confirmTransfer() {

    const orderId =
        localStorage.getItem("jomzOrderId");

    if (!orderId) {
        alert("Please place an order first.");
        return;
    }


    const popup =
        document.getElementById(
            "whatsappPaymentPopup"
        );

    const notifyButton =
        document.getElementById(
            "notifyJomzButton"
        );

    const notNowButton =
        document.getElementById(
            "notNowButton"
        );


    if (!popup || !notifyButton || !notNowButton) {
        alert("Payment notification system is unavailable.");
        return;
    }


    // Show WhatsApp popup
    popup.style.display = "block";


    // YES, NOTIFY JOMZ
    notifyButton.onclick = function () {

        const message =
            "Hello JOMZ, I've made payment for my order.\n\n" +

            "Order ID: " +
            orderId +
            "\n" +

            "Player ID: " +
            document.getElementById("playerID").value +
            "\n" +

            "Package: " +
            selectedPackage +
            "\n" +

            "Amount: ₦" +
            Number(selectedPrice).toLocaleString() +
            "\n\n" +

            "Please confirm my payment and process my order. Thank you.";


        const whatsappURL =
            "https://wa.me/2349042529385?text=" +
            encodeURIComponent(message);


        window.open(
            whatsappURL,
            "_blank"
        );


        // Continue the existing payment notification
        sendPaymentNotification(orderId);

    };


    // NOT NOW
    notNowButton.onclick = function () {

        popup.style.display = "none";

        // Continue the existing payment notification
        sendPaymentNotification(orderId);

    };

}


// ==========================================
// SEND PAYMENT NOTIFICATION TO SERVER
// ==========================================

function sendPaymentNotification(orderId) {

    setPaymentStage("pending");


    fetch(
        "/api/orders/" +
        encodeURIComponent(orderId) +
        "/payment",
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
    .then(response => {

        if (!response.ok) {
            throw new Error(
                "Payment notification failed"
            );
        }

        return response.json();

    })
    .then(data => {

        if (data.success) {
            checkOrderStatus();
        }
        else {

            setPaymentStage("payment");

            alert(
                data.message ||
                "Could not send payment notification."
            );

        }

    })
    .catch(error => {

        console.error(error);

        setPaymentStage("payment");

        alert(
            "Could not send payment notification."
        );

    });

}
// ==========================================
// COPY ACCOUNT NUMBER
// ==========================================

function copyAccountNumber() {

    const accountNumber =
        document.getElementById(
            "accountNumber"
        );


    if (!accountNumber) {

        alert(
            "Account number not found."
        );

        return;

    }


    navigator.clipboard.writeText(
        accountNumber.textContent.trim()
    )

    .then(() => {

        alert(
            "Account number copied!"
        );

    })

    .catch(() => {

        alert(
            "Could not copy account number."
        );

    });

}
// ==========================================
// AUTOMATIC STATUS CHECK
// ==========================================

function checkPaymentConfirmation() {

if (!orderCreated) {

    return;

}


const orderId =
    localStorage.getItem(
        "jomzOrderId"
    );


if (!orderId) {

    return;

}


fetch(
    "/api/order-status/" +
    orderId
)

.then(response => {

    if (!response.ok) {

        throw new Error(
            "Status check failed"
        );

    }

    return response.json();

})

.then(data => {

    if (!data.success) {

        return;

    }

// ==========================================
// CUSTOMER NOTIFICATION
// ==========================================

if (data.notification) {

    const notificationKey =
        "jomzNotification_" + orderId;

    const alreadyShown =
        localStorage.getItem(notificationKey);

    if (alreadyShown !== data.notification) {

        showCustomerMessagePopup(data.notification);

        localStorage.setItem(
            notificationKey,
            data.notification
        );

    }

}

    // ORDER COMPLETED

    if (

        data.status ===
        "Completed"

    ) {

        handleCompletedOrder(
            orderId
        );

    }

    else {

        showOrderStatus(
            data.status
        );

    }

})

.catch(error => {

    console.log(
        "Unable to check order status."
    );

});

}

// ==========================================
// CHECK EVERY 5 SECONDS
// ==========================================

setInterval(

checkPaymentConfirmation,

5000

);

// ==========================================
// OPEN RECEIPT
// ==========================================

function openReceipt() {

const orderId =
    localStorage.getItem(
        "jomzCompletedOrderId"
    );


if (!orderId) {

    alert(
        "Completed order receipt not found."
    );

    return;

}


window.location.href =
    "receipt.html?id=" +
    encodeURIComponent(
        orderId
    );

}



// =================================
// ACTIVE NAVIGATION
// =================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const navLinks =
            document.querySelectorAll("nav a");


        navLinks.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    navLinks.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );


                    this.classList.add(
                        "active"
                    );

                }
            );

        });

    }
);

// =================================
// AUTOMATIC ACTIVE NAVIGATION
// =================================

window.addEventListener("scroll", function () {

    const sections =
        document.querySelectorAll("section[id]");

    const navLinks =
        document.querySelectorAll("nav a");

    let currentSection = "";

    const scrollPosition =
        window.scrollY +
        window.innerHeight / 2;


    sections.forEach(function (section) {

        const sectionTop =
            section.offsetTop;

        const sectionBottom =
            sectionTop +
            section.offsetHeight;


        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionBottom
        ) {

            currentSection =
                section.id;

        }

    });


    navLinks.forEach(function (link) {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            "#" + currentSection
        ) {

            link.classList.add("active");

        }

    });

});


// RUN ONCE WHEN PAGE LOADS

window.dispatchEvent(
    new Event("scroll")
);


// =================================
// SCROLL REVEAL ANIMATION
// =================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const revealElements =
            document.querySelectorAll(
                ".reveal"
            );


        function revealOnScroll() {

            revealElements.forEach(
                function (element) {

                    const position =
                        element.getBoundingClientRect();

                    const screenHeight =
                        window.innerHeight;


                    if (
                        position.top <
                        screenHeight - 80
                    ) {

                        element.classList.add(
                            "show"
                        );

                    }

                }
            );

        }


        window.addEventListener(
            "scroll",
            revealOnScroll
        );


        revealOnScroll();

    }
);

// =================================
// JOMZ SCROLL TO TOP
// =================================

const scrollTopBtn =
    document.getElementById("scrollTopBtn");

window.addEventListener("scroll", function () {

    if (window.scrollY > 400) {
        scrollTopBtn.classList.add("show");
    } else {
        scrollTopBtn.classList.remove("show");
    }

});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// JOMZ SHOP LOADING + PAYMENT SCHEDULE

document.addEventListener("DOMContentLoaded", function () {

    const loader =
        document.getElementById("jomzLoader");

    const paymentPopup =
        document.getElementById(
            "paymentSchedulePopup"
        );

    if (!loader) {
        console.log(
            "JOMZ LOADER NOT FOUND"
        );
        return;
    }

    console.log(
        "JOMZ LOADER FOUND"
    );


    setTimeout(function () {

        // Hide the loader
        loader.classList.add("hide");

        setTimeout(() => {

            const popup =
                document.getElementById(
                    "paymentSchedulePopup"
                );

            if (popup) {
                popup.style.display =
                    "flex";
            }

        }, 500);


        // Show payment schedule
        // immediately after loader finishes
        if (paymentPopup) {

            paymentPopup.style.display =
                "flex";

        }

    }, 3000);

});


// ===============================
// JOMZ SHOP PAYMENT SCHEDULE
// ===============================

function isPaymentActive() {

    const now = new Date();

    // Nigeria time (WAT)
    const nigeriaTime =
        new Date(
            now.toLocaleString(
                "en-US",
                {
                    timeZone:
                        "Africa/Lagos"
                }
            )
        );

    const day =
        nigeriaTime.getDay();

    const hour =
        nigeriaTime.getHours();

    // Sunday = 0
    // Monday = 1
    // Saturday = 6

    // Monday - Saturday, 8 AM - 8 PM
    return (
        day >= 1 &&
        day <= 6 &&
        hour >= 8 &&
        hour < 20
    );

}


// ===============================
// CLOSE PAYMENT POPUP
// ===============================

function closePaymentPopup() {

    const popup =
        document.getElementById(
            "paymentSchedulePopup"
        );

    if (popup) {

        popup.style.display =
            "none";

    }

}


// ===============================
// SHOW ORDER CLOSED POPUP
// ===============================

function showOrderClosedPopup() {

    const popup =
        document.getElementById(
            "orderClosedPopup"
        );

    const message =
        document.getElementById(
            "orderClosedMessage"
        );

    if (
        !popup ||
        !message
    ) {
        return;
    }


    const now =
        new Date();

    const nigeriaTime =
        new Date(
            now.toLocaleString(
                "en-US",
                {
                    timeZone:
                        "Africa/Lagos"
                }
            )
        );


    const day =
        nigeriaTime.getDay();

    const hour =
        nigeriaTime.getHours();


    let nextOpening;


    // Monday - Friday before 8 AM
    if (
        day >= 1 &&
        day <= 5 &&
        hour < 8
    ) {

        nextOpening =
            "today at 8:00 AM";

    }

    // Monday - Friday after 8 PM
    else if (
        day >= 1 &&
        day <= 5 &&
        hour >= 20
    ) {

        nextOpening =
            "tomorrow at 8:00 AM";

    }

    // Saturday before 8 AM
    else if (
        day === 6 &&
        hour < 8
    ) {

        nextOpening =
            "today at 8:00 AM";

    }

    // Saturday after 8 PM
    else if (
        day === 6 &&
        hour >= 20
    ) {

        nextOpening =
            "Monday at 8:00 AM";

    }

    // Sunday
    else {

        nextOpening =
            "Monday at 8:00 AM";

    }


    message.innerHTML =
        "Orders are currently closed.<br><br>" +
        "Payment is active Monday – Saturday, " +
        "8:00 AM – 8:00 PM.<br><br>" +
        "<strong>Next available: " +
        nextOpening +
        ".</strong>";


    popup.style.display =
        "flex";

}


// ===============================
// CLOSE ORDER CLOSED POPUP
// ===============================

function closeOrderClosedPopup() {

    const popup =
        document.getElementById(
            "orderClosedPopup"
        );

    if (popup) {

        popup.style.display =
            "none";

    }

}


// ==========================================
// SHOW PAYMENT SCHEDULE AFTER LOADER
// ==========================================

function showPaymentScheduleAfterLoader() {

    const popup =
        document.getElementById(
            "paymentSchedulePopup"
        );

    if (popup) {

        popup.style.display =
            "flex";

    }

}


// ==========================================
// JOMZ SHOP CUSTOMER MESSAGE SYSTEM
// ==========================================

function showCustomerMessagePopup(message) {

    const popup =
        document.getElementById(
            "jomzCustomerMessagePopup"
        );

    const messageText =
        document.getElementById(
            "jomzCustomerMessageText"
        );

    if (!popup || !messageText) {

        return;

    }

    messageText.textContent =
        message;

    popup.style.display =
        "flex";

}


function closeCustomerMessagePopup() {

    const popup =
        document.getElementById(
            "jomzCustomerMessagePopup"
        );

    if (popup) {

        popup.style.display =
            "none";

    }

}


// ==========================================
// CHECK CUSTOMER ORDER MESSAGE
// ==========================================

async function checkCustomerMessage() {

    const orderId =
        localStorage.getItem(
            "jomzOrderId"
        );

    if (!orderId) {

        return;

    }

    try {

        const response =
            await fetch(
                "/api/order-status/" +
                orderId
            );

        if (!response.ok) {

            return;

        }

        const data =
            await response.json();

        if (
            !data.success ||
            !data.order
        ) {

            return;

        }


        const notification =
            data.order.notification;


        if (!notification) {

            return;

        }


        // Check if this is a new message
        const lastMessage =
            localStorage.getItem(
                "jomzLastCustomerMessage"
            );


        if (
            notification ===
            lastMessage
        ) {

            return;

        }


        // Save the message so it
        // doesn't keep appearing
        localStorage.setItem(
            "jomzLastCustomerMessage",
            notification
        );


        showCustomerMessagePopup(
            notification
        );

    }

    catch (error) {

        console.error(
            "Customer message check error:",
            error
        );

    }

}


// ==========================================
// CHECK EVERY 5 SECONDS
// ==========================================

setInterval(
    checkCustomerMessage,
    5000
);


// Check once when page loads
checkCustomerMessage();


// ==========================================
// JOMZ SHOP CUSTOMER NOTIFICATION BELL
// ==========================================

let customerNotifications = [];


// ==========================================
// GET CURRENT ORDER ID
// ==========================================

function getCustomerOrderId() {

    return (
        localStorage.getItem(
            "jomzOrderId"
        ) ||
        localStorage.getItem(
            "orderId"
        ) ||
        null
    );

}


// ==========================================
// LOAD CUSTOMER NOTIFICATIONS
// ==========================================

async function loadCustomerNotifications() {

    const orderId =
        getCustomerOrderId();

    if (!orderId) {

        return;

    }


    try {

        const response =
            await fetch(
                "/api/customer-notifications/" +
                encodeURIComponent(
                    orderId
                )
            );


        if (!response.ok) {

            return;

        }


        const data =
            await response.json();


        if (!data.success) {

            return;

        }


        customerNotifications =
            data.notifications || [];


        updateNotificationBell();

        displayCustomerNotifications();

    }

    catch (error) {

        console.error(
            "Notification error:",
            error
        );

    }

}

// ==========================================
// UPDATE BELL
// ==========================================

function updateNotificationBell() {

    const badge =
        document.getElementById(
            "notificationBadge"
        );


    if (!badge) {

        return;

    }


    const unreadCount =
        customerNotifications.filter(
            notification =>
                !notification.read_at
        ).length;


    if (unreadCount > 0) {

        badge.textContent =
            unreadCount > 99
                ? "99+"
                : unreadCount;

        badge.style.display =
            "flex";

    }

    else {

        badge.textContent =
            "0";

        badge.style.display =
            "none";

    }

}


// ==========================================
// DISPLAY NOTIFICATIONS
// ==========================================

function displayCustomerNotifications() {

    const list =
        document.getElementById(
            "notificationList"
        );


    if (!list) {

        return;

    }


    if (
        !customerNotifications ||
        customerNotifications.length === 0
    ) {

        list.innerHTML = `
            <div class="notification-empty">
                No notifications yet.
            </div>
        `;

        return;

    }


    list.innerHTML =
        "";


    customerNotifications.forEach(
        function(notification) {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                notification.read_at
                    ? "notification-item read"
                    : "notification-item unread";


            const date =
                notification.created_at
                    ? new Date(
                        notification.created_at
                    ).toLocaleString()
                    : "Unknown date";


            item.innerHTML = `

                <strong>
                    ${notification.read_at
                        ? "✓ READ"
                        : "🔴 UNREAD"}
                </strong>

                <p>
                    ${escapeNotificationHTML(
                        notification.message || ""
                    )}
                </p>

                <small>
                    ${date}
                </small>

            `;


            item.onclick =
                function() {

                    markNotificationAsRead(
                        notification.id
                    );

                };


            list.appendChild(
                item
            );

        }
    );

}


// ==========================================
// MARK NOTIFICATION AS READ
// ==========================================

async function markNotificationAsRead(
    notificationId
) {

    if (!notificationId) {

        return;

    }


    try {

        const response =
            await fetch(
                "/api/customer-notifications/" +
                notificationId +
                "/read",
                {
                    method:
                        "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    }
                }
            );


        const data =
            await response.json();


        if (
            response.ok &&
            data.success
        ) {

            const notification =
                customerNotifications.find(
                    item =>
                        Number(item.id) ===
                        Number(notificationId)
                );


            if (notification) {

                notification.read_at =
                    data.notification &&
                    data.notification.read_at
                        ? data.notification.read_at
                        : new Date().toISOString();

            }


            updateNotificationBell();

            displayCustomerNotifications();

        }

    }

    catch (error) {

        console.error(
            "Mark notification read error:",
            error
        );

    }

}


// ==========================================
// OPEN NOTIFICATION PANEL
// ==========================================

function openNotificationPanel() {

    const panel =
        document.getElementById(
            "notificationPanel"
        );


    if (!panel) {

        return;

    }


    panel.style.display =
        "block";


    loadCustomerNotifications();

}


// ==========================================
// CLOSE NOTIFICATION PANEL
// ==========================================

function closeNotificationPanel() {

    const panel =
        document.getElementById(
            "notificationPanel"
        );


    if (panel) {

        panel.style.display =
            "none";

    }

}


// ==========================================
// CLOSE WHEN CLICKING OUTSIDE
// ==========================================

document.addEventListener(
    "click",
    function(event) {

        const panel =
            document.getElementById(
                "notificationPanel"
            );

        const bell =
            document.getElementById(
                "notificationBell"
            );


        if (
            !panel ||
            !bell
        ) {

            return;

        }


        if (
            panel.style.display === "block" &&
            !panel.contains(event.target) &&
            !bell.contains(event.target)
        ) {

            closeNotificationPanel();

        }

    }
);


// ==========================================
// ESCAPE NOTIFICATION HTML
// ==========================================

function escapeNotificationHTML(text) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        text;

    return div.innerHTML;

}


// ==========================================
// START NOTIFICATION SYSTEM
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadCustomerNotifications();


        setInterval(
            loadCustomerNotifications,
            60000
        );

    }
);