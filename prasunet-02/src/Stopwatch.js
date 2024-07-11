import React, { useState, useRef } from 'react';
import './Stopwatch.css';

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [laps, setLaps] = useState([]);
    const intervalRef = useRef(null);

    const startStopHandler = () => {
        if (isRunning) {
            clearInterval(intervalRef.current);
        } else {
            intervalRef.current = setInterval(() => {
                setTime(prevTime => prevTime + 10);
            }, 10);
        }
        setIsRunning(!isRunning);
    };

    const resetHandler = () => {
        clearInterval(intervalRef.current);
        setTime(0);
        setIsRunning(false);
        setLaps([]);
    };

    const lapHandler = () => {
        setLaps([...laps, time]);
    };

    const formatTime = (time) => {
        const milliseconds = `0${(time % 1000) / 10}`.slice(-2);
        const seconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
        const minutes = `0${Math.floor((time / 60000) % 60)}`.slice(-2);
        const hours = `0${Math.floor(time / 3600000)}`.slice(-2);
        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    };

    return (
        <div className="stopwatch-container">
            <div className="stopwatch">
                <h1>Stopwatch</h1>
                <div className="display">{formatTime(time)}</div>
                <div className="controls">
                    <button className="start-stop-btn" onClick={startStopHandler}>
                        {isRunning ? 'Stop' : 'Start'}
                    </button>
                    <button className="reset-btn" onClick={resetHandler}>Reset</button>
                    <button className="lap-btn" onClick={lapHandler} disabled={!isRunning}>Lap</button>
                </div>
            </div>
            <div className="laps-container">
                <ul className="laps">
                    {laps.map((lap, index) => (
                        <li key={index}>{formatTime(lap)}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Stopwatch;
