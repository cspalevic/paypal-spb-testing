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
                                    ]
                                }
                            ]
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
    