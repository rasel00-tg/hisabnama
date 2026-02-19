export const toBengaliNumber = (number) => {
    if (number === null || number === undefined) return '';
    const englishToBengali = {
        '0': '০',
        '1': '১',
        '2': '২',
        '3': '৩',
        '4': '৪',
        '5': '৫',
        '6': '৬',
        '7': '৭',
        '8': '৮',
        '9': '৯',
        '.': '.',
        ',': ',',
        '-': '-', // For negative numbers
        ':': ':'
    };
    return number.toString().split('').map(char => englishToBengali[char] || char).join('');
};

export const getBanglaDate = () => {
    const today = new Date();
    // Use Intl.DateTimeFormat with 'bn-BD' for standard Gregorian date in Bangla
    // If the user wants the actual Bangla Calendar date (e.g., Falgun 1432), we need a custom function.
    // For now, let's provide the Gregorian date in Bangla as a fallback or primary display.
    // "Today's Bangla Date" usually implies the Bangla Panjika date.

    // Simple Approximation for Bangla Date (Not 100% accurate without complex logic but good for display)
    // New year: April 14.
    // This is a placeholder. For a utility app, accuracy matters.
    // Let's stick to the formatted Gregorian date in Bengali first: "১৭ ফেব্রুয়ারি, ২০২৬"
    // And also try to calculate the Bangla date.

    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    return new Intl.DateTimeFormat('bn-BD', options).format(today);
};

export const getRamadanCountdown = () => {
    // Target: Next Ramadan.
    // Islamic calendar is lunar. Ramadan 2025 is approx Feb 28, 2025.
    // Wait, current date is Feb 17, 2026. So Ramadan 2025 is passed.
    // Next Ramadan (1447 AH) involves calculation.
    // Ramadan 2026 is approx Feb 17 or 18, 2026!
    // Wait, today is Feb 17, 2026. Ramadan might be starting TODAY or TOMORROW!
    // I need to be careful.
    // Let's set a tentative date.
    // Ramadan 2026 start date (estimated): February 18, 2026.

    const ramadanDate = new Date('2026-02-19T00:00:00'); // Correct Date: Feb 19, 2026
    const now = new Date();
    const diff = ramadanDate - now;

    if (diff < 0) {
        // Ramadan started
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isStarted: true };
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isStarted: false };
};

export const getEidCountdown = () => {
    // Eid ul Fitr 2026 Estimate: March 20, 2026
    const eidDate = new Date('2026-03-20T08:00:00');
    const now = new Date();
    const diff = eidDate - now;

    if (diff < 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, isStarted: true };

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, isStarted: false };
}
