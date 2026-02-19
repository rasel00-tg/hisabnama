import React, { useState, useEffect } from 'react';
import { getRamadanCountdown, getEidCountdown, toBengaliNumber } from '../utils/bengaliUtils';
import { districts } from '../data/districts';
import { MapPin, Clock, Lock, Unlock, Moon, Bell, BellOff } from 'lucide-react';
import { Coordinates, CalculationMethod, PrayerTimes, Madhab } from 'adhan';

const PrayerTimesCard = ({ prayerTimes, nextPrayer, timeToNextPrayer }) => {
    if (!prayerTimes) return null;

    const prayers = [
        { name: 'ফজর', time: prayerTimes.fajr },
        { name: 'জোহর', time: prayerTimes.dhuhr },
        { name: 'আছর', time: prayerTimes.asr },
        { name: 'মাগরিব', time: prayerTimes.maghrib },
        { name: 'এশা', time: prayerTimes.isha },
    ];

    const formatTime = (date) => {
        return date.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    return (
        <div className="glass-card bg-white p-5 border border-emerald-100">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-emerald-800 flex items-center">
                    <Clock size={18} className="mr-2 text-emerald-600" />
                    নামাজের সময়সূচি
                </h3>
            </div>

            {/* Next Prayer Timer - Single Line */}
            <div className="bg-emerald-50 rounded-xl p-3 mb-4 text-center border border-emerald-200">
                <p className="text-emerald-800 font-bold whitespace-nowrap">
                    পরবর্তী নামাজ {nextPrayer}: <span className="text-emerald-600 ml-1">{toBengaliNumber(timeToNextPrayer)}</span> বাকি
                </p>
            </div>

            <div className="space-y-2">
                {prayers.map((prayer) => (
                    <div key={prayer.name} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0 hover:bg-emerald-50/50 px-2 rounded-lg transition-colors">
                        <span className="font-medium text-gray-700">{prayer.name}</span>
                        <span className="font-bold text-emerald-700">{formatTime(prayer.time)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const RamadanCard = ({ isRamadanStarted, ramadanCountdown, rozaNumber, dayName, iftarTime, notificationsEnabled, toggleNotifications }) => {
    return (
        <div className="glass-card bg-gradient-to-br from-emerald-600 to-emerald-800 text-white p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Moon size={100} />
            </div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold">মাহে রমজান</h3>
                    <button onClick={toggleNotifications} className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition-colors">
                        {notificationsEnabled ? <Bell size={18} /> : <BellOff size={18} />}
                    </button>
                </div>

                {!isRamadanStarted ? (
                    <div className="text-center py-4">
                        <p className="text-emerald-100 text-sm mb-1">পরবর্তী রমজান আসতে বাকি</p>
                        <div className="grid grid-cols-4 gap-2 mt-2">
                            {[
                                { label: 'দিন', value: ramadanCountdown.days },
                                { label: 'ঘণ্টা', value: ramadanCountdown.hours },
                                { label: 'মিনিট', value: ramadanCountdown.minutes },
                                { label: 'সেকেন্ড', value: ramadanCountdown.seconds },
                            ].map((item, idx) => (
                                <div key={idx} className="bg-white/10 rounded-lg p-1.5 backdrop-blur-sm">
                                    <span className="block text-lg font-bold">{toBengaliNumber(item.value)}</span>
                                    <span className="text-[10px] text-emerald-100">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="bg-white/10 rounded-xl p-3 text-center border border-white/10">
                            <p className="text-sm font-medium text-emerald-100">আজকের রোজা</p>
                            <h2 className="text-3xl font-bold mt-1">{toBengaliNumber(rozaNumber)} তম</h2>
                            <p className="text-xs text-emerald-200 mt-1">{dayName}</p>
                        </div>

                        <div className="flex justify-between items-center bg-white/10 rounded-xl p-3 px-4 border border-white/10">
                            <span className="text-emerald-100 text-sm">ইফতারের সময়</span>
                            <span className="text-xl font-bold">{toBengaliNumber(iftarTime)}</span>
                        </div>
                        {notificationsEnabled && <p className="text-[10px] text-center text-emerald-200 mt-1">🔔 ইফতারের ৩০ মিনিট আগে রিমাইন্ডার দেওয়া হবে</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

const EidCard = ({ eidCountdown }) => {
    return (
        <div className="glass-card bg-white p-5 border-l-4 border-purple-500">
            <h3 className="text-lg font-bold text-purple-800 mb-3 flex items-center">
                <Moon size={18} className="mr-2 text-purple-600" />
                ঈদুল ফিতর ২০২৬
            </h3>
            <div className="grid grid-cols-4 gap-2 text-center">
                {[
                    { label: 'দিন', value: eidCountdown.days },
                    { label: 'ঘণ্টা', value: eidCountdown.hours },
                    { label: 'মিনিট', value: eidCountdown.minutes },
                    { label: 'সেকেন্ড', value: eidCountdown.seconds },
                ].map((item, idx) => (
                    <div key={idx} className="bg-purple-50 rounded-lg p-2">
                        <span className="block text-xl font-bold text-purple-700">{toBengaliNumber(item.value)}</span>
                        <span className="text-[10px] text-purple-500 uppercase">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

const IslamicFeatures = () => {
    // Default Dhaka coordinates (approx)
    const [coordinates, setCoordinates] = useState(new Coordinates(23.8103, 90.4125));
    const [selectedDistrict, setSelectedDistrict] = useState(() => {
        const saved = localStorage.getItem('lockedDistrict');
        return saved ? JSON.parse(saved) : districts.find(d => d.name === 'ঢাকা');
    });
    const [isLocked, setIsLocked] = useState(!!localStorage.getItem('lockedDistrict'));
    const [prayerTimes, setPrayerTimes] = useState(null);
    const [timeToNextPrayer, setTimeToNextPrayer] = useState('');
    const [nextPrayerName, setNextPrayerName] = useState('');

    // Countdown states
    const [ramadanCountdown, setRamadanCountdown] = useState(getRamadanCountdown());
    const [eidCountdown, setEidCountdown] = useState(getEidCountdown());
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [showPermissionDialog, setShowPermissionDialog] = useState(false);

    // Initial permission request
    useEffect(() => {
        const hasAskedPermission = localStorage.getItem('hasAskedNotificationPermission');
        if (!hasAskedPermission) {
            setShowPermissionDialog(true);
        } else if (Notification.permission === 'granted') {
            setNotificationsEnabled(true);
        }
    }, []);

    const handlePermissionResponse = (allow) => {
        setShowPermissionDialog(false);
        localStorage.setItem('hasAskedNotificationPermission', 'true');

        if (allow) {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    setNotificationsEnabled(true);
                }
            });
        }
    };

    // Update Prayer Times
    useEffect(() => {
        const updatePrayers = () => {
            const date = new Date();
            const params = CalculationMethod.Karachi();
            params.madhab = Madhab.Hanafi;

            // Adjust coordinates based on district offset (approximate mapping)
            // Since we only have time offsets, we can shift the calculation time or adjust longitude
            // 1 degree longitude = 4 minutes. 
            // Dhaka Long: 90.4125. 
            // Offset in minutes / 4 = Degree shift.
            const longitudeShift = selectedDistrict.offset / 4;
            const districtCoords = new Coordinates(23.8103, 90.4125 + longitudeShift);

            const times = new PrayerTimes(districtCoords, date, params);
            setPrayerTimes(times);

            // Next Prayer Logic
            const now = new Date();
            let next = times.fajr;
            let name = 'ফজর';

            if (now < times.fajr) { next = times.fajr; name = 'ফজর'; }
            else if (now < times.dhuhr) { next = times.dhuhr; name = 'জোহর'; }
            else if (now < times.asr) { next = times.asr; name = 'আছর'; }
            else if (now < times.maghrib) { next = times.maghrib; name = 'মাগরিব'; }
            else if (now < times.isha) { next = times.isha; name = 'এশা'; }
            else {
                // Next day Fajr
                const tomorrow = new Date(date);
                tomorrow.setDate(tomorrow.getDate() + 1);
                const tomorrowTimes = new PrayerTimes(districtCoords, tomorrow, params);
                next = tomorrowTimes.fajr;
                name = 'ফজর (আগামীকাল)';
            }

            setNextPrayerName(name);

            const diff = next - now;
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            setTimeToNextPrayer(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);

            // Notification Logic (Simple check)
            if (notificationsEnabled) {
                const iftarDiff = times.maghrib - now;
                const minutesLeft = Math.floor(iftarDiff / 60000);

                if (minutesLeft === 30 || minutesLeft === 25 || minutesLeft === 15 || minutesLeft === 5) {
                    // Check if already notified this minute to avoid spam
                    const lastNotified = sessionStorage.getItem('lastIftarNotification');
                    if (lastNotified != minutesLeft) {
                        new Notification('ইফতারের রিমাইন্ডার', {
                            body: `ইফতারের আর ${toBengaliNumber(minutesLeft)} মিনিট বাকি।\nদোয়া: আল্লাহুম্মা লাকা সুমতু ওয়া আলা রিজকিকা আফতারতু।`,
                            icon: '/amarlogo.png'
                        });
                        sessionStorage.setItem('lastIftarNotification', minutesLeft);
                    }
                }
            }
        };

        const timer = setInterval(updatePrayers, 1000);
        updatePrayers();
        return () => clearInterval(timer);
    }, [selectedDistrict, notificationsEnabled]);

    // Update Countdowns
    useEffect(() => {
        const timer = setInterval(() => {
            setRamadanCountdown(getRamadanCountdown());
            setEidCountdown(getEidCountdown());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const toggleLock = () => {
        if (isLocked) {
            localStorage.removeItem('lockedDistrict');
            setIsLocked(false);
        } else {
            localStorage.setItem('lockedDistrict', JSON.stringify(selectedDistrict));
            setIsLocked(true);
        }
    };

    const toggleNotifications = () => {
        if (Notification.permission === 'granted') {
            setNotificationsEnabled(!notificationsEnabled);
        } else if (Notification.permission !== 'denied') {
            Notification.requestPermission().then(permission => {
                if (permission === 'granted') {
                    setNotificationsEnabled(true);
                }
            });
        } else {
            alert('অনুগ্রহ করে ব্রাউজার সেটিংসে নোটিফিকেশন পারমিশন ঠিক করুন।');
        }
    };

    return (
        <div className="space-y-6 pb-20 fade-in relative">
            {/* Permission Dialog */}
            {showPermissionDialog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-fade-in text-center">
                        <Bell size={48} className="mx-auto text-emerald-500 mb-4" />
                        <h3 className="text-xl font-bold text-emerald-900 mb-2">নোটিফিকেশন চালু করবেন?</h3>
                        <p className="text-gray-600 mb-6 text-sm">ইফতার ও সেহরির সময় সঠিক সময়ে রিমাইন্ডার পেতে নোটিফিকেশন চালু রাখা প্রয়োজন।</p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => handlePermissionResponse(false)}
                                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-500 font-medium hover:bg-gray-50"
                            >
                                না
                            </button>
                            <button
                                onClick={() => handlePermissionResponse(true)}
                                className="flex-1 py-2.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200"
                            >
                                হ্যাঁ, চালু করুন
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* District Selector & Lock */}
            <div className="glass-card bg-emerald-50 p-4 border border-emerald-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center text-emerald-800 font-bold">
                        <MapPin size={20} className="mr-2" />
                        <span>আপনার জেলা</span>
                    </div>
                    <button onClick={toggleLock} className={`p-2 rounded-full transition-colors ${isLocked ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                        {isLocked ? <Lock size={18} /> : <Unlock size={18} />}
                    </button>
                </div>

                <div className="mt-3">
                    <select
                        className={`w-full bg-white border border-emerald-300 text-emerald-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 outline-none ${isLocked ? 'opacity-60 cursor-not-allowed' : ''}`}
                        value={selectedDistrict.name}
                        disabled={isLocked}
                        onChange={(e) => setSelectedDistrict(districts.find(d => d.name === e.target.value))}
                    >
                        {districts.map(d => (
                            <option key={d.name} value={d.name}>{d.name} ({d.name === 'ঢাকা' ? 'Default' : (d.offset > 0 ? `+${d.offset}` : d.offset)} মি.)</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Prayer Times Card */}
            <PrayerTimesCard prayerTimes={prayerTimes} nextPrayer={nextPrayerName} timeToNextPrayer={timeToNextPrayer} />

            {/* Ramadan Card */}
            <RamadanCard
                isRamadanStarted={ramadanCountdown.isStarted}
                ramadanCountdown={ramadanCountdown}
                rozaNumber={Math.floor((new Date() - new Date('2026-02-19T00:00:00')) / (1000 * 60 * 60 * 24)) + 1}
                dayName={new Date().toLocaleDateString('bn-BD', { weekday: 'long' })}
                iftarTime={prayerTimes ? prayerTimes.maghrib.toLocaleTimeString('bn-BD', { hour: '2-digit', minute: '2-digit', hour12: true }) : ''}
                notificationsEnabled={notificationsEnabled}
                toggleNotifications={toggleNotifications}
            />

            {/* Eid Countdown */}
            <EidCard eidCountdown={eidCountdown} />
        </div>
    );
};

export default IslamicFeatures;
