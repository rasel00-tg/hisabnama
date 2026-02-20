import React, { useState, useEffect, useContext } from 'react';
import { Bell, BellOff, Globe, User, RefreshCw, ChevronRight, MessageCircle, Facebook, Moon, Sun, Star, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toBengaliNumber } from '../utils/bengaliUtils';
import { AppContext } from '../App';

const Settings = () => {
    const { language, setLanguage, theme, setTheme } = useContext(AppContext);
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [checkingUpdate, setCheckingUpdate] = useState(false);
    const [appVersion, setAppVersion] = useState('1.0.0');
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        // Check notification permission status
        if (Notification.permission === 'granted') {
            setNotificationsEnabled(true);
        }
    }, []);

    const toggleNotifications = async () => {
        if (!notificationsEnabled) {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                setNotificationsEnabled(true);
            } else {
                alert('নোটিফিকেশন পারমিশন দেওয়া হয়নি।');
            }
        } else {
            setNotificationsEnabled(false);
            alert('নোটিফিকেশন বন্ধ করা হয়েছে (অ্যাপ সেটিংস)।');
        }
    };

    const toggleLanguage = () => {
        const newLang = language === 'bn' ? 'en' : 'bn';
        setLanguage(newLang);
    };

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };

    const handleCheckUpdate = () => {
        setCheckingUpdate(true);
        setTimeout(() => {
            setCheckingUpdate(false);
            const isUpdateAvailable = false; // This would typically come from an API
            if (isUpdateAvailable) {
                window.open('https://play.google.com/store/apps/details?id=com.yourapp.id', '_blank');
            } else {
                setShowUpdateModal(true);
            }
        }, 2000);
    };

    const translations = {
        bn: {
            settings: 'সেটিংস',
            notifications: 'নোটিফিকেশন',
            notificationDesc: 'অ্যাপের নোটিফিকেশন চালু/বন্ধ করুন',
            language: 'ভাষা (Language)',
            languageDesc: 'বাংলা / English পরিবর্তন করুন',
            developer: 'ডেভেলপার পরিচিতি',
            update: 'অ্যাপ আপডেট',
            updateDesc: 'নতুন ভার্সন চেক করুন',
            checkUpdate: 'চেক করুন',
            checking: 'চেক করা হচ্ছে...',
            latestVersion: 'আপনি বর্তমান সর্বশেষ ভার্সনে আছেন',
            devName: 'রাশেদুল করিম',
            contact: 'যোগাযোগ',
            facebook: 'ফেসবুক প্রোফাইল',
            whatsapp: 'হোয়াটসঅ্যাপ - 01871176267',
            theme: 'থিম (Theme)',
            themeDesc: 'ডার্ক মোড / লাইট মোড চালু করুন'
        },
        en: {
            settings: 'Settings',
            notifications: 'Notifications',
            notificationDesc: 'Toggle app notifications',
            language: 'Language (ভাষা)',
            languageDesc: 'Switch Bangla / English',
            developer: 'Developer Info',
            update: 'App Update',
            updateDesc: 'Check for new versions',
            checkUpdate: 'Check Now',
            checking: 'Checking...',
            latestVersion: 'You are on the latest version',
            devName: 'Rasedul Karim',
            contact: 'Contact',
            facebook: 'Facebook Profile',
            whatsapp: 'WhatsApp - 01871176267',
            theme: 'Theme (থিম)',
            themeDesc: 'Toggle Dark Mode / Light Mode'
        }
    };

    const t = translations[language];

    return (
        <div className="space-y-6 pb-24 fade-in">
            {/* Header for Settings */}
            <div className={`glass-card p-4 items-center flex border mb-4 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-emerald-50'}`}>
                <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{t.settings}</h2>
            </div>

            {/* Notification Settings */}
            <div className={`rounded-xl shadow-sm border p-4 flex items-center justify-between ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-emerald-900/50 text-emerald-400' : 'bg-emerald-100 text-emerald-600'}`}>
                        {notificationsEnabled ? <Bell size={20} /> : <BellOff size={20} />}
                    </div>
                    <div>
                        <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{t.notifications}</h3>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{t.notificationDesc}</p>
                    </div>
                </div>
                <button
                    onClick={toggleNotifications}
                    className={`w-12 h-6 rounded-full transition-colors duration-200 ease-in-out relative ${notificationsEnabled ? 'bg-emerald-500' : (theme === 'dark' ? 'bg-gray-600' : 'bg-gray-300')}`}
                >
                    <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${notificationsEnabled ? 'translate-x-6' : 'translate-x-0'}`}></span>
                </button>
            </div>

            {/* Language Settings */}
            <div className={`rounded-xl shadow-sm border p-4 flex items-center justify-between ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-blue-900/50 text-blue-400' : 'bg-blue-100 text-blue-600'}`}>
                        <Globe size={20} />
                    </div>
                    <div>
                        <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{t.language}</h3>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{t.languageDesc}</p>
                    </div>
                </div>
                <button
                    onClick={toggleLanguage}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
                >
                    {language === 'bn' ? 'English' : 'বাংলা'}
                </button>
            </div>

            {/* Theme Settings */}
            <div className={`rounded-xl shadow-sm border p-4 flex items-center justify-between ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-purple-900/50 text-purple-400' : 'bg-purple-100 text-purple-600'}`}>
                        {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
                    </div>
                    <div>
                        <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{t.theme}</h3>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{t.themeDesc}</p>
                    </div>
                </div>
                <button
                    onClick={toggleTheme}
                    className={`w-12 h-6 rounded-full transition-colors duration-200 ease-in-out relative ${theme === 'dark' ? 'bg-purple-600' : 'bg-gray-300'}`}
                >
                    <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${theme === 'dark' ? 'translate-x-6' : 'translate-x-0'}`}></span>
                </button>
            </div>

            {/* Developer Profile */}
            <div className={`rounded-xl shadow-sm border overflow-hidden ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                <div className={`p-4 border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}>
                    <h3 className={`font-semibold flex items-center ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
                        <User size={18} className="mr-2 text-emerald-600" />
                        {t.developer}
                    </h3>
                </div>
                <div className="p-6 flex flex-col items-center text-center">
                    <div className={`w-24 h-24 rounded-full border-4 overflow-hidden mb-3 shadow-md ${theme === 'dark' ? 'border-gray-700' : 'border-emerald-50'}`}>
                        <img
                            src="/devpic.png"
                            alt="Developer"
                            className="w-full h-full object-cover"
                            onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=RK' }} // Fallback
                        />
                    </div>
                    <h2 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{t.devName}</h2>
                    <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Full Stack Developer</p>

                    <div className="w-full space-y-3">
                        <a href="https://www.facebook.com/share/1Bvg9BdPJs/" target="_blank" rel="noopener noreferrer"
                            className={`flex items-center justify-between w-full p-3 rounded-xl transition-colors ${theme === 'dark' ? 'bg-blue-900/30 text-blue-300 hover:bg-blue-900/50' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}>
                            <div className="flex items-center">
                                <Facebook size={18} className="mr-2" />
                                <span className="text-sm font-medium">{t.facebook}</span>
                            </div>
                            <ChevronRight size={16} />
                        </a>

                        <a href="https://wa.me/8801871176267" target="_blank" rel="noopener noreferrer"
                            className={`flex items-center justify-between w-full p-3 rounded-xl transition-colors ${theme === 'dark' ? 'bg-green-900/30 text-green-300 hover:bg-green-900/50' : 'bg-green-50 text-green-700 hover:bg-green-100'}`}>
                            <div className="flex items-center">
                                <MessageCircle size={18} className="mr-2" />
                                <span className="text-sm font-medium">{t.whatsapp}</span>
                            </div>
                            <ChevronRight size={16} />
                        </a>
                    </div>
                </div>
            </div>

            {/* App Update */}
            <div className={`rounded-xl shadow-sm border p-4 flex items-center justify-between ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100'}`}>
                <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-orange-900/50 text-orange-400' : 'bg-orange-100 text-orange-600'}`}>
                        <RefreshCw size={20} className={checkingUpdate ? 'animate-spin' : ''} />
                    </div>
                    <div>
                        <h3 className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{t.update}</h3>
                        <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{t.updateDesc}</p>
                    </div>
                </div>
                <button
                    onClick={handleCheckUpdate}
                    disabled={checkingUpdate}
                    className="px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-full shadow-lg shadow-emerald-200 hover:bg-emerald-700 active:scale-95 transition-all"
                >
                    {checkingUpdate ? t.checking : t.checkUpdate}
                </button>
            </div>

            <p className="text-center text-[10px] text-gray-400 mt-4">
                Version: {toBengaliNumber(appVersion)}
            </p>

            {/* AdMob Ad Space - Bottom of Settings Page */}
            <div className={`w-full h-16 mt-4 border border-dashed rounded-xl flex items-center justify-center ${theme === 'dark' ? 'bg-gray-800 border-gray-700 text-gray-500' : 'bg-gray-100 border-gray-200 text-gray-400'}`}>
                <span className="text-xs font-medium">// AdMob Ad will run here</span>
            </div>

            {/* Update Success Modal */}
            <AnimatePresence>
                {showUpdateModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowUpdateModal(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className={`relative w-full max-w-sm rounded-3xl p-8 shadow-2xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-emerald-50'}`}
                        >
                            <button
                                onClick={() => setShowUpdateModal(false)}
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                <X size={20} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} />
                            </button>

                            <div className="flex flex-col items-center text-center">
                                <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-6">
                                    <RefreshCw size={40} className="text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                                    {language === 'bn' ? 'সবকিছু ঠিক আছে!' : 'Everything is up to date!'}
                                </h3>
                                <p className={`text-sm mb-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                                    {language === 'bn' ? 'আপনি ইতিমধ্যে সর্বশেষ ভার্সনে আছেন' : 'You are already using the latest version of the app.'}
                                </p>

                                <div className="w-full h-px bg-gray-100 dark:bg-gray-700 mb-8" />

                                <p className={`text-xs font-bold uppercase tracking-widest mb-4 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
                                    {language === 'bn' ? 'আমাদের অ্যাপটি রেটিং দিন' : 'Rate our app'}
                                </p>

                                <div className="flex space-x-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            onClick={() => setRating(star)}
                                            className="transform active:scale-90 transition-transform"
                                        >
                                            <Star
                                                size={32}
                                                className={`${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'} transition-colors`}
                                            />
                                        </button>
                                    ))}
                                </div>

                                {rating > 0 && (
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-emerald-500 font-bold mt-4 text-sm"
                                    >
                                        {language === 'bn' ? 'ধন্যবাদ আপনার মতামতের জন্য!' : 'Thank you for your rating!'}
                                    </motion.p>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Settings;
