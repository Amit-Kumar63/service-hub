module.exports.formatTime = (timeInSeconds) => {
    if (timeInSeconds < 60) {
        return `${Math.round(timeInSeconds)} seconds`;
    } else if (timeInSeconds < 3600) {
        const minutes = Math.round(timeInSeconds / 60);
        return `${minutes} minutes`;
    } else {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.round((timeInSeconds % 3600) / 60);
        return minutes > 0 
            ? `${hours} hours ${minutes} minutes` 
            : `${hours} hours`;
    }
};