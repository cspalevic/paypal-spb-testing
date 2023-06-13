import { loadScript as loadSPB } from "@paypal/paypal-js";

export const createSubscription = (selector, {
    layout,
    commit,
    intent,
    amount
}) => 
loadSPB({ 
    "client-id":"AdiJ-00teiFyzbFBbiiPq-_S8glnvCkIvmS4UuRaCLegYqu075MErmZYwdMEzdhypVdb5lM4VIezO77M",
    commit,
    intent,
    ...((intent === "tokenize" || intent === "subscription") && {
        vault: true
    })
})
    .then((paypal) => {
        // Loaded script, ready to use
        paypal
            .Buttons({
                style: {
                    layout,
                    label: "subscribe"
                },
                createSubscription(data, actions) {
                    return actions.subscription.create({
                        plan_id: "P-3L300276YM073524JMQCKFZQ",
                        quantity: "100",
                        shipping_amount: {
                            currency_code: "USD",
                            value: 100
                        }
                    })
                }
            })
            .render(selector)
            .catch(error => {
                console.error("Failed to render the PayPal buttons", error);
            })
    })
    .catch(error => {
        // Handle loading error
        console.error("Failed to load the PayPal JS SDK script", error);
    })

export const createOrder = (selector, {
    layout,
    commit,
    intent,
    amount
}) => 
    loadSPB({ 
        "client-id":"AdiJ-00teiFyzbFBbiiPq-_S8glnvCkIvmS4UuRaCLegYqu075MErmZYwdMEzdhypVdb5lM4VIezO77M",
        commit,
        intent,
        ...((intent === "tokenize" || intent === "subscription") && {
            vault: true
        })
    })
        .then((paypal) => {
            // Loaded script, ready to use
            paypal
                .Buttons({
                    style: {
                        layout
                    },
                    async createOrder(data, actions) {
                        const response = await actions.order.create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: "USD",
                                        value: amount.toString(),
                                        breakdown: {
                                            item_total: {
                                                currency_code: "USD",
                                                value: amount.toString()
                                            }
                                        }
                                    },
                                    items: [
                                        {
                                            name: "test",
                                            quantity: "1",
                                            unit_amount: {
                                                value: amount.toString(),
                                                currency_code: "USD",
                                            }
                                        }
                                    ],
                                    shipping: {
                                        name: {
                                            full_name: "Charlie Spalevic"
                                        },
                                        email_address: "hey@cspalevc.com",
                                        options: [
                                            {
                                                id: "shipping-1",
                                                label: "Express Shipping",
                                                type: "SHIPPING",
                                                amount: {
                                                    value: "10",
                                                    currency_code: "USD"
                                                },
                                                selected: true
                                            },
                                            {
                                                id: "shipping-2",
                                                label: "Super Express Shipping",
                                                type: "SHIPPING",
                                                amount: {
                                                    value: "20",
                                                    currency_code: "USD"
                                                },
                                                selected: false
                                            },
                                            {
                                                id: "pickup-1",
                                                label: "Pickup in Store",
                                                type: "PICKUP",
                                                amount: {
                                                    value: "10",
                                                    currency_code: "USD"
                                                },
                                                selected: false
                                            },
                                            {
                                                id: "pickup-2",
                                                label: "Drop off to car",
                                                type: "PICKUP",
                                                amount: {
                                                    value: "20",
                                                    currency_code: "USD"
                                                },
                                                selected: false
                                            }
                                        ],
                                        address: {
                                            address_line_1: "310 W. Chicago Ave",
                                            admin_area_2: "Westmont",
                                            admin_area_1: "IL",
                                            postal_code: "60559",
                                            country_code: "US"
                                        }
                                    }
                                }
                            ],
                            application_context: {
                                shipping_preference: "GET_FROM_FILE"
                            }
                        })
                    
                        console.log(response);
                        return response;
                    }
                })
                .render(selector)
                .catch(error => {
                    console.error("Failed to render the PayPal buttons", error);
                })
        })
        .catch(error => {
            // Handle loading error
            console.error("Failed to load the PayPal JS SDK script", error);
        })
    