import { useRef, useState } from 'react';
import { createOrder, createSubscription } from '../../utils/paypal';
import "./styles.css";

const PayPal = () => {
    const container = useRef(null)
    const [amount, setAmount] = useState(0.1);
    const [layout, setLayout] = useState("vertical");
    const [intent, setIntent] = useState("capture");
    const [commit, setCommit] = useState(true);

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    }

    const handleLayoutChange = (event) => {
        setLayout(event.target.value);
    }

    const handleIntentChange = (event) => {
        setIntent(event.target.value);
    }

    const handleCommitChange = (event) => {
        setCommit(event.target.checked);
    }

    const loadPayPal = () => {
        if(container.current?.firstChild) {
            container
                .current
                .removeChild(container.current.children[0]);
        }
        if(intent === "subscription") {
            createSubscription(container.current, {
                amount,
                layout,
                commit,
                intent
            })
        } else {
            createOrder(container.current, {
                amount,
                layout,
                commit,
                intent
            });
        }
    }

    return (
        <div className="container">
            <h1>PayPal</h1>
            <div className="form">
                <div>
                    <label for="amount">Amount</label>
                    <input id="amount" value={amount} onChange={handleAmountChange} />
                </div>
                <div>
                    <label for="style">Style</label>
                    <select id="style" value={layout} onChange={handleLayoutChange}>
                        <option value="vertical">Vertical</option>
                        <option value="horizontal">Horizontal</option>
                    </select>
                </div>
                <div>
                    <label for="intent">Intent</label>
                    <select id="intent" value={intent} onChange={handleIntentChange}>
                        <option value="capture">Capture</option>
                        <option value="authorize">Authorize</option>
                        <option value="subscription">Subscription</option>
                        <option value="tokenize">Tokenize</option>
                    </select>
                </div>
                <div>
                    <label for="commit">Commit</label>
                    <input id="commit" type="checkbox" checked={commit} onChange={handleCommitChange}/>
                </div>
                <button onClick={loadPayPal}>Load PayPal</button>
            </div>
            <div ref={container} />
        </div>
    );
}

export default PayPal;