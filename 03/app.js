// app.js
export default function randomNumber(min, max) {
    if (typeof min !== 'number' || typeof max !== 'number') {
        throw new TypeError('Arguments must be numbers');
    }
    if (min > max) {
        throw new RangeError('Min must be less than or equal to max');
    }
    return Math.floor(Math.random() * (max - min + 1)) + min; // losowanie liczby
}
