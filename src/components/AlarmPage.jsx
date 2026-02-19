import React, { useState, useEffect, useContext, useRef } from 'react';
import { AppContext } from '../App';
import { Clock, Plus, Trash2, Bell, BellOff, Music, Volume2, X, StopCircle, BellRing } from 'lucide-react';
import { toBengaliNumber } from '../utils/bengaliUtils';
import { LocalNotifications } from '@capacitor/local-notifications';
import { KeepAwake } from '@capacitor-community/keep-awake';

const AlarmPage = () => {
    const { language } = useContext(AppContext);

    // Alarms state
    const [alarms, setAlarms] = useState(() => {
        try {
            const savedAlarms = localStorage.getItem('alarms');
            return savedAlarms ? JSON.parse(savedAlarms) : [];
        } catch (e) { return []; }
    });

    // Ringing state
    const [ringingAlarm, setRingingAlarm] = useState(null);
    const audioRef = useRef(null);

    // Modal state
    const [showAddModal, setShowAddModal] = useState(false);
    const [newAlarm, setNewAlarm] = useState({
        time: '07:00',
        label: '',
        days: [],
        enabled: true,
        ringtone: 'default', // 'default' or 'custom'
        customRingtoneName: '',
        volume: 0.8,
        snoozeEnabled: true,
        snoozeInterval: 5 // minutes
    });

    // Store custom audio blob URLs temporarily
    const fileInputRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('alarms', JSON.stringify(alarms));
    }, [alarms]);

    // Initial Setup
    useEffect(() => {
        const setup = async () => {
            try {
                await LocalNotifications.requestPermissions();
                await KeepAwake.keepAwake();
            } catch (error) {
                console.log('Capabilities not available in web preview');
            }
        };
        setup();
    }, []);

    // Foreground Check Loop
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const currentDay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][now.getDay()];
            const currentTime = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
            const currentTimestamp = now.getTime();

            alarms.forEach(alarm => {
                if (!alarm.enabled) return;

                // Check standard time trigger
                const isTimeMatch = alarm.time === currentTime;
                // Check snooze trigger
                const isSnoozeMatch = alarm.snoozeTarget && currentTimestamp >= alarm.snoozeTarget;

                // Prevent re-triggering same minute if not snooze
                const lastTriggerGap = now.getTime() - (alarm.lastTriggered || 0);

                if ((isTimeMatch && lastTriggerGap > 60000) || isSnoozeMatch) {
                    const shouldTrigger = alarm.days.length === 0 || alarm.days.includes(currentDay) || isSnoozeMatch;

                    if (shouldTrigger && !ringingAlarm) {
                        triggerAlarm(alarm);
                    }
                }
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [alarms, ringingAlarm]);

    const triggerAlarm = (alarm) => {
        setRingingAlarm(alarm);
        updateAlarmStatus(alarm.id, { lastTriggered: Date.now(), snoozeTarget: null });

        // Play Audio
        if (audioRef.current) {
            audioRef.current.src = alarm.ringtone === 'custom' && alarm.customRingtoneUrl ? alarm.customRingtoneUrl : '/alarm_sound.mp3';
            audioRef.current.volume = alarm.volume !== undefined ? alarm.volume : 0.8;
            audioRef.current.loop = true;
            audioRef.current.play().catch(e => console.log("Audio play failed:", e));
        }

        // Send Notification for foreground/background attention
        scheduleNotification(alarm, new Date());
    };

    const stopRinging = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }

        if (ringingAlarm && ringingAlarm.days.length === 0) {
            toggleAlarm(ringingAlarm.id, false);
        }

        setRingingAlarm(null);
    };

    const snoozeRinging = () => {
        if (!ringingAlarm) return;

        const snoozeMinutes = ringingAlarm.snoozeInterval || 5;
        const snoozeTarget = Date.now() + (snoozeMinutes * 60 * 1000);

        updateAlarmStatus(ringingAlarm.id, { snoozeTarget: snoozeTarget });
        stopRinging();

        // Schedule Snooze Notification
        scheduleNotification(ringingAlarm, new Date(snoozeTarget));
    };

    const updateAlarmStatus = (id, updates) => {
        setAlarms(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
    };

    const scheduleNotification = async (alarm, specificDate = null) => {
        let triggerDate;

        if (specificDate) {
            triggerDate = specificDate;
        } else {
            const [hours, minutes] = alarm.time.split(':');
            const now = new Date();
            const target = new Date();
            target.setHours(parseInt(hours), parseInt(minutes), 0, 0);

            if (target <= now) {
                target.setDate(target.getDate() + 1);
            }
            triggerDate = target;
        }

        try {
            // Check if plugin is available
            if (!LocalNotifications) return;

            const id = parseInt(alarm.id.toString().slice(-8));

            await LocalNotifications.schedule({
                notifications: [
                    {
                        title: language === 'bn' ? 'অ্যালার্ম' : 'Alarm',
                        body: alarm.label || (language === 'bn' ? 'আপনার অ্যালার্ম বাজছে!' : 'Your alarm is ringing!'),
                        id: id,
                        schedule: { at: triggerDate, allowWhileIdle: true },
                        sound: null,
                        actionTypeId: "",
                        extra: null
                    }
                ]
            });
        } catch (error) {
            console.error("Notification schedule error", error);
        }
    };

    const cancelNotification = async (alarmId) => {
        try {
            if (!LocalNotifications) return;
            const id = parseInt(alarmId.toString().slice(-8));
            await LocalNotifications.cancel({ notifications: [{ id: id }] });
        } catch (error) {
            console.error("Notification cancel error", error);
        }
    };

    const addAlarm = () => {
        const id = Date.now();
        const newAlarmObj = {
            ...newAlarm,
            id: id,
            lastTriggered: 0,
            snoozeTarget: null,
        };

        setAlarms([...alarms, newAlarmObj]);
        setShowAddModal(false);
        setNewAlarm({
            time: '07:00',
            label: '',
            days: [],
            enabled: true,
            ringtone: 'default',
            customRingtoneName: '',
            volume: 0.8,
            snoozeEnabled: true,
            snoozeInterval: 5
        });

        scheduleNotification(newAlarmObj);
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setNewAlarm({
                ...newAlarm,
                ringtone: 'custom',
                customRingtoneName: file.name,
                customRingtoneUrl: url
            });
        }
    };

    const deleteAlarm = (id) => {
        cancelNotification(id);
        setAlarms(alarms.filter(a => a.id !== id));
    };

    const toggleAlarm = (id, status) => {
        const alarm = alarms.find(a => a.id === id);
        if (!alarm) return;

        const newStatus = status !== undefined ? status : !alarm.enabled;

        setAlarms(alarms.map(a => a.id === id ? { ...a, enabled: newStatus, snoozeTarget: null } : a));

        if (newStatus) {
            scheduleNotification(alarm);
        } else {
            cancelNotification(id);
        }
    };

    const formatTime12Hour = (time24) => {
        if (!time24) return '';
        const [hours, minutes] = time24.split(':');
        const date = new Date();
        date.setHours(parseInt(hours));
        date.setMinutes(parseInt(minutes));
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    };

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    return (
        <div className="space-y-4 pb-20 fade-in relative min-h-screen">
            <audio ref={audioRef} className="hidden" />

            <h2 className="text-2xl font-bold text-center text-emerald-800 mb-6">
                {language === 'bn' ? 'অ্যালার্ম' : 'Alarm'}
            </h2>

            {alarms.length === 0 ? (
                <div className="text-center py-10 text-gray-400">
                    <Clock size={48} className="mx-auto mb-2 opacity-50" />
                    <p>{language === 'bn' ? 'কোনো অ্যালার্ম নেই' : 'No alarms set'}</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {alarms.map(alarm => (
                        <div key={alarm.id} className={`glass-card p-4 flex items-center justify-between transition-all ${alarm.enabled ? 'border-l-4 border-l-emerald-500' : 'opacity-70 grayscale'}`}>
                            <div>
                                <h3 className="text-3xl font-bold text-emerald-900">
                                    {language === 'bn' ? toBengaliNumber(formatTime12Hour(alarm.time)) : formatTime12Hour(alarm.time)}
                                </h3>
                                <div className="flex flex-wrap gap-2 mt-1">
                                    <p className="text-sm text-gray-500 flex items-center">
                                        {alarm.label || 'Alarm'}
                                    </p>
                                    {alarm.days.length > 0 && (
                                        <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                                            {alarm.days.join(', ')}
                                        </span>
                                    )}
                                    {alarm.snoozeEnabled && (
                                        <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full flex items-center">
                                            <BellRing size={10} className="mr-1" /> {language === 'bn' ? toBengaliNumber(alarm.snoozeInterval) : alarm.snoozeInterval}m
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center space-x-3">
                                <button onClick={() => toggleAlarm(alarm.id)} className={`p-2 rounded-full transition-colors ${alarm.enabled ? 'bg-emerald-100 text-emerald-600' : 'bg-gray-100 text-gray-400'}`}>
                                    {alarm.enabled ? <Bell size={20} /> : <BellOff size={20} />}
                                </button>
                                <button onClick={() => deleteAlarm(alarm.id)} className="p-2 rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition-colors">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Floating Add Button */}
            <button
                onClick={() => setShowAddModal(true)}
                className="fixed bottom-24 right-6 bg-emerald-600 text-white p-4 rounded-full shadow-lg shadow-emerald-300 hover:bg-emerald-700 transition-transform hover:scale-105 active:scale-95 z-40"
            >
                <Plus size={24} />
            </button>

            {/* Ringing Overlay */}
            {ringingAlarm && (
                <div className="fixed inset-0 z-[100] bg-emerald-900/95 backdrop-blur-md flex flex-col items-center justify-center text-white animate-fade-in">
                    <div className="animate-pulse mb-8">
                        <img src="/amarlogo.png" alt="Logo" className="w-24 h-24 object-contain" />
                    </div>
                    <h2 className="text-4xl font-bold mb-2">
                        {language === 'bn' ? toBengaliNumber(formatTime12Hour(ringingAlarm.time)) : formatTime12Hour(ringingAlarm.time)}
                    </h2>
                    <p className="text-emerald-200 text-xl mb-12">{ringingAlarm.label || (language === 'bn' ? 'অ্যালার্ম বাজছে!' : 'Alarm Ringing!')}</p>

                    <div className="flex flex-col gap-4 w-full max-w-xs px-4">
                        {ringingAlarm.snoozeEnabled && (
                            <button
                                onClick={snoozeRinging}
                                className="w-full py-4 bg-white/20 hover:bg-white/30 rounded-2xl font-bold text-lg backdrop-blur-sm border border-white/20 transition-all flex items-center justify-center gap-2"
                            >
                                <BellRing size={20} />
                                {language === 'bn' ? `স্নুজ (${toBengaliNumber(ringingAlarm.snoozeInterval)} মি.)` : `Snooze (${ringingAlarm.snoozeInterval}m)`}
                            </button>
                        )}

                        <button
                            onClick={stopRinging}
                            className="w-full py-4 bg-red-500 hover:bg-red-600 rounded-2xl font-bold text-lg shadow-lg shadow-red-500/30 transition-all flex items-center justify-center gap-2"
                        >
                            <StopCircle size={24} />
                            {language === 'bn' ? 'বন্ধ করুন' : 'Stop'}
                        </button>
                    </div>
                </div>
            )}

            {/* Add Alarm Modal */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl animate-fade-in my-8">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-emerald-900">{language === 'bn' ? 'নতুন অ্যালার্ম' : 'New Alarm'}</h3>
                            <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={24} />
                            </button>
                        </div>

                        <div className="space-y-5">
                            {/* Time Picker */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{language === 'bn' ? 'সময়' : 'Time'}</label>
                                <input
                                    type="time"
                                    value={newAlarm.time}
                                    onChange={(e) => setNewAlarm({ ...newAlarm, time: e.target.value })}
                                    className="w-full text-4xl font-bold text-center bg-gray-50 border border-gray-200 rounded-xl py-4 focus:ring-2 focus:ring-emerald-500 outline-none text-emerald-800"
                                />
                            </div>

                            {/* Label */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{language === 'bn' ? 'লেবেল' : 'Label'}</label>
                                <input
                                    type="text"
                                    placeholder={language === 'bn' ? 'অ্যালার্মের নাম' : 'Alarm Name'}
                                    value={newAlarm.label}
                                    onChange={(e) => setNewAlarm({ ...newAlarm, label: e.target.value })}
                                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-emerald-500 outline-none"
                                />
                            </div>

                            {/* Repeat Days */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{language === 'bn' ? 'রিপিট' : 'Repeat'}</label>
                                <div className="flex justify-between gap-1">
                                    {daysOfWeek.map(day => (
                                        <button
                                            key={day}
                                            onClick={() => toggleDay(day)}
                                            className={`w-8 h-8 rounded-full text-[10px] font-bold flex items-center justify-center transition-colors ${newAlarm.days.includes(day)
                                                    ? 'bg-emerald-600 text-white'
                                                    : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                                                }`}
                                        >
                                            {day.charAt(0)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Ringtone Selection */}
                            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 space-y-3">
                                <div className="flex justify-between items-center">
                                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                        <Music size={16} className="text-emerald-600" />
                                        {language === 'bn' ? 'রিংটোন' : 'Ringtone'}
                                    </label>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        className={`flex-1 py-2 text-xs rounded-lg border ${newAlarm.ringtone === 'default' ? 'bg-emerald-100 border-emerald-500 text-emerald-700' : 'bg-white border-gray-200 text-gray-600'}`}
                                        onClick={() => setNewAlarm({ ...newAlarm, ringtone: 'default' })}
                                    >
                                        Default
                                    </button>
                                    <button
                                        className={`flex-1 py-2 text-xs rounded-lg border ${newAlarm.ringtone === 'custom' ? 'bg-emerald-100 border-emerald-500 text-emerald-700' : 'bg-white border-gray-200 text-gray-600'}`}
                                        onClick={() => fileInputRef.current?.click()}
                                    >
                                        {newAlarm.customRingtoneName ? 'Selected' : 'Pick File'}
                                    </button>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        className="hidden"
                                        accept="audio/*"
                                        onChange={handleFileSelect}
                                    />
                                </div>
                                {newAlarm.customRingtoneName && <p className="text-xs text-emerald-600 truncate px-1">{newAlarm.customRingtoneName}</p>}

                                {/* Volume Slider */}
                                <div>
                                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                                        <span><Volume2 size={12} /></span>
                                        <span>{Math.round(newAlarm.volume * 100)}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={newAlarm.volume}
                                        onChange={(e) => setNewAlarm({ ...newAlarm, volume: parseFloat(e.target.value) })}
                                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                                    />
                                </div>
                            </div>

                            {/* Snooze Settings */}
                            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <BellRing size={16} className="text-emerald-600" />
                                        <label className="text-sm font-medium text-gray-700">{language === 'bn' ? 'স্নুজ' : 'Snooze'}</label>
                                    </div>
                                    <input
                                        type="checkbox"
                                        checked={newAlarm.snoozeEnabled}
                                        onChange={(e) => setNewAlarm({ ...newAlarm, snoozeEnabled: e.target.checked })}
                                        className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 border-gray-300"
                                    />
                                </div>

                                {newAlarm.snoozeEnabled && (
                                    <select
                                        value={newAlarm.snoozeInterval}
                                        onChange={(e) => setNewAlarm({ ...newAlarm, snoozeInterval: parseInt(e.target.value) })}
                                        className="w-full bg-white border border-gray-200 text-gray-700 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2"
                                    >
                                        <option value="5">5 Minutes</option>
                                        <option value="10">10 Minutes</option>
                                        <option value="15">15 Minutes</option>
                                        <option value="30">30 Minutes</option>
                                    </select>
                                )}
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-500 font-medium hover:bg-gray-50"
                                >
                                    {language === 'bn' ? 'বাতিল' : 'Cancel'}
                                </button>
                                <button
                                    onClick={addAlarm}
                                    className="flex-1 py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200"
                                >
                                    {language === 'bn' ? 'সেভ করুন' : 'Save'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Ad Space */}
            <div className="w-full h-[60px] bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center mt-6">
                <span className="text-xs text-gray-400 font-medium">Space for Ads</span>
            </div>
        </div>
    );
};

export default AlarmPage;
