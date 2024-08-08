import React, { useRef } from 'react'
import styles from "./payment.module.css"
import {loadStripe} from '@stripe/stripe-js';
import { useNavigate } from 'react-router-dom';

const Payment = ({ammount}) => {
    const useref = useRef(null)
    const navigate = useNavigate();
    const handelammount=() => {
       if(useref.current){
         useref.current.style.display = "none"
       }
       navigate("/payment-success")
    }

    return (

        <div
            className={styles.drawerContainer} 
            ref={useref}
        >
            <div className={styles.donate}>Payment </div>
            <div className={styles.clientContainer}>
                <div className={styles.nameBox}>
                    <p>Name</p>
                    <input type="text" />
                </div>
                <div className={styles.nameBox}>
                    <p>Phone No.</p>
                    <input type="text" />
                </div>
            </div>
            <div className={styles.paywithContainer}>
                <p>Pay With:</p>
                <div>
                    <input type="radio" id="card" name="options" />
                    <label htmlFor="card">Card</label>

                    <input type="radio" id="Bank" name="options" />
                    <label htmlFor="Bank">Bank</label>

                    <input type="radio" id="Transfer" name="options" />
                    <label htmlFor="Transfer">Transfer</label>

                    <input type="radio" id="Google Pay" name="options" />
                    <label htmlFor="card">Google Pay</label>
                </div>
            </div>

            <div className={styles.AmountContainer}>
                <p>Amount</p>
                <input type="text" placeholder="₹500" />
            </div>
            {/* Card Number as same as ammount */}
            <div className={styles.AmountContainer}>
                <p>Card Number</p>
                <input type="text" placeholder="1234  5678  9101  1121" />
            </div>
            {/* end  */}
            <div className={styles.ExpireContainer}>
                <div className={styles.expireBox}>
                    <p>Expiration Date</p>
                    <input type="text" placeholder="MM/YY" />
                </div>
                <div className={styles.expireBox}>
                    <p>CVV</p>
                    <input type="text" placeholder="123" />
                </div>
            </div>

            {/* Checkbox */}
            <div className={styles.checkContainer}>
                <input type="checkbox" name="check" id="" />
                <span>Save card details</span>
            </div>

            <button onClick={handelammount}>pay {ammount}</button>

            {/* last section lines */}
            <div className={styles.paraContainer}>
                <p>
                    Lorem ipsum dolor sit amet consectetur. Cras egestas odio non
                    accumsan. Vivamus nibh urna mi dictum eget in. Ultricies porta amet
                    neque pellentesque.{" "}
                </p>
            </div>
        </div>

    )
}

export default Payment