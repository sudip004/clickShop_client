import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import styles from "./PaymentSuccess.module.css";

const PaymentSuccess = () => {

    const direct = ()=>{
        setTimeout(() => {
            window.location.replace('/')
        
        }, 3000);

    }
    direct()

    return (
        <div className={styles.container}>
            <div className={styles.iconContainer}>
                <FaCheckCircle className={styles.icon} />
            </div>
            <h1 className={styles.message}>Thank you for shopping!</h1>
        </div>
    );
};

export default PaymentSuccess;
