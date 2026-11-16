import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ item }) => {
    const [countdown, setCountdown] = useState(calculateCountdown(item.expiryDate));

    useEffect(() => {
        const timerId = setInterval(() => {
            setCountdown(calculateCountdown(item.expiryDate))
        }, 1000);

        return () => clearInterval(timerId)
    }, [item.expiryDate]);

    function calculateCountdown(expiryDate) {
        const endDate = new Date(expiryDate).getTime()
        const timeDiff = endDate - Date.now()

        if (timeDiff <= 0) return 0

        return timeDiff
    }

    function timeLeft(milliseconds) {
        const hours = Math.floor(milliseconds / (1000 * 60 * 60))
        const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000)
        if (milliseconds > 0) {
            return `${hours}h ${minutes}m ${seconds}s`
        } else {
            return "Expired"
        }
    }

    return (
        <div>
            {countdown > 0 ? timeLeft(countdown) : null}
        </div>
    )
};

export default CountdownTimer;