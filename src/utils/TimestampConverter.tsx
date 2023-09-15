import React from "react";

interface TimestampToDateStringProps {
    timestamp: number;
}

const TimestampToTimeString: React.FC<TimestampToDateStringProps> = ({ timestamp }) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const currentTimeHours = new Date().getHours();

    if (currentTimeHours === hours) {
        return (
            <div>
                <p style={{color: "red"}}>{hours}:{minutes}0</p>
            </div>
        );
    }
    return (
        <div>
            <p>{hours}:{minutes}0</p>
        </div>
    );
}

const TimestampToDateString: React.FC<TimestampToDateStringProps> = ({ timestamp }) => {
    const date = new Date(timestamp * 1000);
    const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });
    const day = date.getDate();
    return (
        <div>
            <p>{dayOfWeek} {day}</p>
        </div>
    );
}

export { TimestampToTimeString, TimestampToDateString };