// ==========================================
// JOMZ SHOP BACKEND
// SUPABASE VERSION
// ==========================================
const path = require("path");

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const rateLimit = require("express-rate-limit");
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,

    message: {
        success: false,
        message: "Too many login attempts. Please try again later."
    }
});
const {
    createClient
} = require("@supabase/supabase-js");


// ==========================================
// SUPABASE
// ==========================================

const supabase = createClient(

    process.env.SUPABASE_URL,

    process.env.SUPABASE_SECRET_KEY,

    {

        auth: {

            persistSession: false,

            autoRefreshToken: false,

            detectSessionInUrl: false

        }

    }

);


// ==========================================
// APP
// ==========================================

const app = express();

app.set("trust proxy", 1);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.use(express.static(__dirname));

const PORT =
    process.env.PORT || 3000;


// ==========================================
// MIDDLEWARE
// ==========================================

app.use(cors());

app.use(express.json());

app.use(

    express.urlencoded({

        extended: true

    })

);

console.log(
    "SESSION_SECRET exists:",
    !!process.env.SESSION_SECRET
);



app.use(
    cookieSession({
        name: "jomz-session",
        keys: [
            process.env.SESSION_SECRET
        ],
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000
    })
);


// ==========================================
// SERVE WEBSITE FILES
// ==========================================
app.get("/admin.html", (req, res) => {
    if (!req.session || !req.session.admin) {
        return res.redirect("/login.html");
    }

    res.sendFile(__dirname + "/admin.html");
});


app.use(

    express.static(__dirname)

);


// ==========================================
// ADMIN LOGIN DETAILS
// ==========================================

const ADMIN_USERNAME =
    process.env.ADMIN_USERNAME;

const ADMIN_PASSWORD =
    process.env.ADMIN_PASSWORD;


// ==========================================
// PACKAGE PRICES
// ==========================================

const prices = {
    "50 Diamonds": "₦800",
    "100 Diamonds": "₦1,600",
    "310 Diamonds": "₦4,800",
    "520 Diamonds": "₦8,000",
    "1060 Diamonds": "₦16,000",
    "2180 Diamonds": "₦32,000"
};


// ==========================================
// FORMAT SUPABASE ORDER
// FOR YOUR FRONTEND
// ==========================================

function formatOrder(order) {

    return {

        id:
            order.id,

        playerID:
            order.player_id,

        product:
            order.product,

        quantity:
            order.quantity,

        price:
            order.price,

        paymentStatus:
            order.payment_status,

        paymentConfirmed:
            order.payment_confirmed,

        notification:
            order.notification,

        status:
            order.status,

        date:
            order.created_at

    };

}


// ==========================================
// ADMIN PROTECTION
// ==========================================

function requireAdmin(

    req,

    res,

    next

) {

    if (

        req.session &&

        req.session.admin

    ) {

        next();

    }

    else {

        res.status(401).json({

            success: false,

            message:
                "Unauthorized. Please login as admin."

        });

    }

}
// ==========================================
// ADMIN STATUS CHECK
// ==========================================

app.get("/api/admin-status", (req, res) => {

    res.json({
        loggedIn: req.session.admin === true
    });

});

// ==========================================
// ADMIN LOGIN
// ==========================================


    app.post(

    "/api/login",

    loginLimiter,

    (

        req,

        res

    ) => {
        
        const {

            username,

            password

        } = req.body;


        if (

            username ===
            ADMIN_USERNAME &&

            password ===
            ADMIN_PASSWORD

        ) {

            req.session.admin =
                true;


            return res.json({

                success: true,

                message:
                    "Login successful."

            });

        }


        res.status(401).json({

            success: false,

            message:
                "Invalid username or password."

        });

    }

);


// ==========================================
// ADMIN LOGOUT
// ==========================================

app.post(

    "/api/logout",

    (

        req,

        res

    ) => {
        
        req.session = null;

res.json({

    success: true,

    message:
        "Logged out successfully."

});

 
            }

        );
        


// ==========================================
// CHECK ADMIN LOGIN
// ==========================================

app.get(

    "/api/admin-status",

    (

        req,

        res

    ) => {

        res.json({

            loggedIn:

                !!(

                    req.session &&

                    req.session.admin

                )

        });

    }

);


// ==========================================
// CREATE ORDER
// ==========================================

app.post(

    "/api/orders",

    async (

        req,

        res

    ) => {

        try {

            const {

                name,

                product,

                quantity

            } = req.body;


            if (

                !name ||

                !product

            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Player ID and package are required."

                });

            }


            if (

                !prices[product]

            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid package selected."

                });

            }


            const newOrder = {

                id:
                    Date.now(),

                player_id:
                    name,

                product:
                    product,

                quantity:
                    quantity || 1,

                price:
                    prices[product],

                payment_status:
                    "Pending",

                payment_confirmed:
                    false,

                notification:
                    "",

                status:
                    "Pending"

            };


            const {

                data,

                error

            } = await supabase

                .from("orders")

                .insert(

                    newOrder

                )

                .select()

                .single();


            if (error) {

                console.error(

                    error

                );


                return res.status(500).json({

                    success: false,

                    message:
                        "Could not create order."

                });

            }


            res.json({

                success: true,

                message:
                    "Order created successfully.",

                orderId:
                    data.id,

                order:
                    formatOrder(data)

            });

        }

        catch (error) {

            console.error(error);


            res.status(500).json({

                success: false,

                message:
                    "Could not create order."

            });

        }

    }

);


// ==========================================
// GET ALL ORDERS
// ADMIN ONLY
// ==========================================

app.get(

    "/api/orders",

    requireAdmin,

    async (

        req,

        res

    ) => {

        try {

            const {

                data,

                error

            } = await supabase

                .from("orders")

                .select("*")

                .order(

                    "created_at",

                    {

                        ascending: true

                    }

                );


            if (error) {

                console.error(error);


                return res.status(500).json({

                    success: false,

                    message:
                        "Could not load orders."

                });

            }


            const formattedOrders =

                data.map(

                    formatOrder

                );


            res.json(

                formattedOrders

            );

        }

        catch (error) {

            console.error(error);


            res.status(500).json({

                success: false,

                message:
                    "Could not load orders."

            });

        }

    }

);


// ==========================================
// CUSTOMER:
// I HAVE MADE THE TRANSFER
// ==========================================

app.put(

    "/api/orders/:id/payment",

    async (

        req,

        res

    ) => {

        const orderId =
            Number(req.params.id);


        try {

            const {

                data,

                error

            } = await supabase

                .from("orders")

                .update({

                    payment_status:

                        "Awaiting Confirmation"

                })

                .eq(

                    "id",

                    orderId

                )

                .select()

                .single();


            if (error || !data) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Order not found."

                });

            }


            res.json({

                success: true,

                message:
                    "Payment notification received."

            });

        }

        catch (error) {

            console.error(error);


            res.status(500).json({

                success: false,

                message:
                    "Could not update payment."

            });

        }

    }

);


// ==========================================
// ADMIN:
// CONFIRM PAYMENT
// ==========================================

app.put(

    "/api/orders/:id/payment-confirm",

    requireAdmin,

    async (

        req,

        res

    ) => {

        const orderId =
            Number(req.params.id);


        try {

            const {

                data,

                error

            } = await supabase

                .from("orders")

                .update({

                    payment_status:
                        "Paid",

                    payment_confirmed:
                        true,

                    notification:

                        "Payment confirmed! Your Free Fire top-up will take approximately 5–10 minutes."

                })

                .eq(

                    "id",

                    orderId

                )

                .select()

                .single();


            if (error || !data) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Order not found."

                });

            }


            res.json({

                success: true,

                message:
                    "Payment confirmed successfully."

            });

        }

        catch (error) {

            console.error(error);


            res.status(500).json({

                success: false,

                message:
                    "Could not confirm payment."

            });

        }

    }

);
// ==========================================
// ADMIN:
// PAYMENT NOT RECEIVED
// ==========================================

app.put(

    "/api/orders/:id/payment-not-received",

    requireAdmin,

    async (

        req,

        res

    ) => {

        const orderId =
            Number(req.params.id);


        try {

            const {

                data,

                error

            } = await supabase

                .from("orders")

                .update({

                    payment_status:
                        "Payment Not Received",

                    payment_confirmed:
                        false,

                    notification:

                        "Payment has not been received yet. Please check your payment and resend the money if necessary."

                })

                .eq(

                    "id",

                    orderId

                )

                .select()

                .single();


            if (error || !data) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Order not found."

                });

            }


            res.json({

                success: true,

                message:
                    "Customer has been notified."

            });

        }

        catch (error) {

            console.error(error);


            res.status(500).json({

                success: false,

                message:
                    "Could not update payment status."

            });

        }

    }

);

// ==========================================
// ADMIN:
// UPDATE ORDER STATUS
// ==========================================

app.put(

    "/api/orders/:id",

    requireAdmin,

    async (

        req,

        res

    ) => {

        const orderId =
            Number(req.params.id);


        const {

            status

        } = req.body;


        try {

            const {

                data,

                error

            } = await supabase

                .from("orders")

                .update({

                    status:

                        status || "Pending"

                })

                .eq(

                    "id",

                    orderId

                )

                .select()

                .single();


            if (error || !data) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Order not found."

                });

            }


            res.json({

                success: true,

                message:
                    "Order updated successfully.",

                order:
                    formatOrder(data)

            });

        }

        catch (error) {

            console.error(error);


            res.status(500).json({

                success: false,

                message:
                    "Could not update order."

            });

        }

    }

);


// ==========================================
// ADMIN:
// DELETE ORDER
// ==========================================

app.delete(

    "/api/orders/:id",

    requireAdmin,

    async (

        req,

        res

    ) => {

        const orderId =
            Number(req.params.id);


        try {

            const {

                data,

                error

            } = await supabase

                .from("orders")

                .delete()

                .eq(

                    "id",

                    orderId

                )

                .select()


            if (error) {

                console.error(error);


                return res.status(500).json({

                    success: false,

                    message:
                        "Could not delete order."

                });

            }


            if (

                !data ||

                data.length === 0

            ) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Order not found."

                });

            }


            res.json({

                success: true,

                message:
                    "Order deleted successfully."

            });

        }

        catch (error) {

            console.error(error);


            res.status(500).json({

                success: false,

                message:
                    "Could not delete order."

            });

        }

    }

);


// ==========================================
// CUSTOMER:
// CHECK ORDER STATUS
// ==========================================

app.get(

    "/api/order-status/:id",

    async (

        req,

        res

    ) => {

        const orderId =
            Number(req.params.id);


        try {

            const {

                data,

                error

            } = await supabase

                .from("orders")

                .select("*")

                .eq(

                    "id",

                    orderId

                )

                .single();


            if (

                error ||

                !data

            ) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Order not found."

                });

            }


            const order =

                formatOrder(data);


            res.json({

                success: true,

                orderId:
                    order.id,

                status:
                    order.status,

                paymentStatus:
                    order.paymentStatus,

                paymentConfirmed:
                    order.paymentConfirmed || false,

                notification:
                    order.notification || "",

                order:
                    order

            });

        }

        catch (error) {

            console.error(error);


            res.status(500).json({

                success: false,

                message:
                    "Could not check order status."

            });

        }

    }

);

// ==========================================
// ADMIN:
// SEND MESSAGE TO CUSTOMER
// ==========================================

app.put(

    "/api/orders/:id/message",

    requireAdmin,

    async (

        req,

        res

    ) => {

        const orderId =
            Number(req.params.id);

        const message =
            String(req.body.message || "").trim();


        // Check message
        if (!message) {

            return res.status(400).json({

                success: false,

                message:
                    "Message cannot be empty."

            });

        }


        try {

            // Check if order exists
            const {

                data: existingOrder,

                error: findError

            } = await supabase

                .from("orders")

                .select("id")

                .eq(

                    "id",

                    orderId

                )

                .single();


            if (

                findError ||

                !existingOrder

            ) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Order not found."

                });

            }


            // Save message to the order
            const {

                data,

                error

            } = await supabase

                .from("orders")

                .update({

                    notification:
                        message

                })

                .eq(

                    "id",

                    orderId

                )

                .select()

                .single();


            if (error) {

                console.error(
                    "Send message error:",
                    error
                );

                return res.status(500).json({

                    success: false,

                    message:
                        "Could not send message."

                });

            }


            res.json({

                success: true,

                message:
                    "Message sent successfully.",

                order:
                    formatOrder(data)

            });

        }

        catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    "Could not send message."

            });

        }

    }

);


// ==========================================
// ADMIN: SEND CUSTOMER MESSAGE
// ==========================================

app.post(
    "/api/customer-messages",
    requireAdmin,
    async (req, res) => {

        try {

            const orderId =
                Number(req.body.orderId);

            const message =
                String(req.body.message || "").trim();


            if (!orderId || !message) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Order ID and message are required."

                });

            }


            // Make sure the order exists
            const {
                data: order,
                error: orderError
            } = await supabase

                .from("orders")

                .select("id")

                .eq("id", orderId)

                .single();


            if (orderError || !order) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Order not found."

                });

            }


            // Save message
            const {
                data,
                error
            } = await supabase

                .from("customer_messages")

                .insert({

                    order_id: orderId,

                    message: message

                })

                .select()

                .single();


            if (error) {

                console.error(error);

                return res.status(500).json({

                    success: false,

                    message:
                        "Could not save message."

                });

            }


            // Also put the latest message
            // into the customer's order
            await supabase

                .from("orders")

                .update({

                    notification: message

                })

                .eq("id", orderId);
            // ==========================================
// SAVE CUSTOMER NOTIFICATION
// ==========================================

const {
    error: notificationError
} = await supabase
    .from("customer_notifications")
    .insert({
        order_id: orderId,
        message: message
    });

if (notificationError) {

    console.error(
        "Notification save error:",
        notificationError
    );

}
            


            res.json({

                success: true,

                message:
                    "Message sent successfully.",

                data: data

            });

        }

        catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    "Could not send message."

            });

        }

    }
);



// ==========================================
// ADMIN: GET MESSAGE HISTORY
// ==========================================

app.get(
    "/api/customer-messages/:orderId",
    requireAdmin,
    async (req, res) => {

        try {

            const orderId =
                Number(req.params.orderId);


            if (!orderId) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid Order ID."

                });

            }


            const {
                data,
                error
            } = await supabase

                .from("customer_messages")

                .select("*")

                .eq("order_id", orderId)

                .order(
                    "created_at",
                    {
                        ascending: false
                    }
                );


            if (error) {

                console.error(error);

                return res.status(500).json({

                    success: false,

                    message:
                        "Could not load message history."

                });

            }


            res.json({

                success: true,

                messages: data || []

            });

        }

        catch (error) {

            console.error(error);

            res.status(500).json({

                success: false,

                message:
                    "Could not load message history."

            });

        }

    }
);


// ==========================================
// START SERVER
// ==========================================

if (require.main === module) {

    const server = app.listen(
        PORT,
        "0.0.0.0",
        () => {
            console.log(
                "JOMZ SHOP SERVER IS RUNNING"
            );
        }
    );

    server.on(
        "error",
        (error) => {
            console.error(
                "SERVER ERROR:",
                error
            );
        }
    );

}

module.exports = app;
