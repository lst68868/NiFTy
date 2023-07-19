import React, { useState, useEffect } from 'react';

const Countdown = () => {
  const [countdown, setCountdown] = useState({
    days: 5,
    hours: 10,
    minutes: 15,
    seconds: 52,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(prevCountdown => {
        let days = prevCountdown.days;
        let hours = prevCountdown.hours;
        let minutes = prevCountdown.minutes;
        let seconds = prevCountdown.seconds - 1;

        if (seconds < 0) {
          minutes -= 1;
          seconds = 59;
        }

        if (minutes < 0) {
          hours -= 1;
          minutes = 59;
        }

        if (hours < 0) {
          days -= 1;
          hours = 23;
        }

        if (days < 0) {
          days = 0;
          hours = 0;
          minutes = 0;
          seconds = 0;
          clearInterval(interval);
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-black text-center sm:text-[10px] lg:text-4xl font-orbitron font-orbitron-900 bg-white bg-opacity-50 rounded-lg">
      {`${countdown.hours.toString().padStart(2, '0')}:${countdown.minutes.toString().padStart(2, '0')}:${countdown.seconds.toString().padStart(2, '0')}`}
    </div>
  );
};

export default Countdown;
