import React, { useState, useContext, useEffect } from 'react';
import { toBengaliNumber } from '../utils/bengaliUtils';
import { differenceInYears, differenceInMonths, differenceInDays, addYears, addMonths, isValid, parseISO, isAfter } from 'date-fns';
import { Calculator, Sunrise, Sunset, CloudRain, Wind, Droplets, CloudLightning, Sun, Cloud, CloudSnow, MapPin, RefreshCw, Calendar, Home, Grid } from 'lucide-react';
import { AppContext } from '../App';

const SmartCalculator = ({ onClose }) => {
    const [display, setDisplay] = useState('0');
    const [equation, setEquation] = useState('');
    const { theme } = useContext(AppContext);
    const language = 'en';

    const handleInput = (val) => {
        if (display === '0' && val !== '.') {
            setDisplay(val);
        } else {
            setDisplay(display + val);
        }
    };

    const handleOperator = (op) => {
        setEquation(display + ' ' + op + ' ');
        setDisplay('0');
    };

    const handleClear = () => {
        setDisplay('0');
        setEquation('');
    };

    const handleCalculate = () => {
        try {
            const result = eval(equation + display);
            setDisplay(String(result));
            setEquation('');
        } catch (e) {
            setDisplay('Error');
        }
    };

    return (
        <div className={`fixed inset-0 z-50 flex flex-col animate-fade-in ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
            <div className="bg-emerald-600 p-4 text-white flex justify-between items-center shadow-md">
                <h2 className="text-xl font-bold flex items-center">
                    <Calculator className="mr-2" /> {language === 'bn' ? 'স্মার্ট ক্যালকুলেটর' : 'Smart Calculator'}
                </h2>
                <button onClick={onClose} className="font-bold text-2xl">&times;</button>
            </div>

            <div className={`flex-1 flex flex-col justify-end p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="text-right mb-4">
                    <p className={`text-sm h-6 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`}>{equation}</p>
                    <h1 className={`text-5xl font-bold break-words ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>{language === 'bn' ? toBengaliNumber(display) : display}</h1>
                </div>

                <div className="grid grid-cols-4 gap-3">
                    {['C', '(', ')', '/'].map(btn => (
                        <button key={btn} onClick={() => btn === 'C' ? handleClear() : btn === '/' ? handleOperator('/') : handleInput(btn)}
                            className={`font-bold p-4 rounded-xl shadow-sm text-xl active:scale-95 transition-transform ${theme === 'dark' ? 'bg-emerald-900 text-emerald-400' : 'bg-emerald-100 text-emerald-700'}`}>
                            {btn}
                        </button>
                    ))}
                    {['7', '8', '9', '*'].map(btn => (
                        <button key={btn} onClick={() => btn === '*' ? handleOperator('*') : handleInput(btn)}
                            className={`font-bold p-4 rounded-xl shadow-sm text-xl active:scale-95 transition-transform ${btn === '*' ? (theme === 'dark' ? 'bg-emerald-900 text-emerald-400' : 'bg-emerald-100 text-emerald-700') : (theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-700')}`}>
                            {btn === '*' ? '×' : (language === 'bn' ? toBengaliNumber(btn) : btn)}
                        </button>
                    ))}
                    {['4', '5', '6', '-'].map(btn => (
                        <button key={btn} onClick={() => btn === '-' ? handleOperator('-') : handleInput(btn)}
                            className={`font-bold p-4 rounded-xl shadow-sm text-xl active:scale-95 transition-transform ${btn === '-' ? (theme === 'dark' ? 'bg-emerald-900 text-emerald-400' : 'bg-emerald-100 text-emerald-700') : (theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-700')}`}>
                            {btn === '-' ? '-' : (language === 'bn' ? toBengaliNumber(btn) : btn)}
                        </button>
                    ))}
                    {['1', '2', '3', '+'].map(btn => (
                        <button key={btn} onClick={() => btn === '+' ? handleOperator('+') : handleInput(btn)}
                            className={`font-bold p-4 rounded-xl shadow-sm text-xl active:scale-95 transition-transform ${btn === '+' ? (theme === 'dark' ? 'bg-emerald-900 text-emerald-400' : 'bg-emerald-100 text-emerald-700') : (theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-700')}`}>
                            {btn === '+' ? '+' : (language === 'bn' ? toBengaliNumber(btn) : btn)}
                        </button>
                    ))}
                    {['0', '.', '=', '%'].map(btn => (
                        <button key={btn} onClick={() => btn === '=' ? handleCalculate() : handleInput(btn)}
                            className={`font-bold p-4 rounded-xl shadow-sm text-xl active:scale-95 transition-transform ${btn === '=' ? 'bg-emerald-600 text-white col-span-2' : (theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-700')}`}
                            style={btn === '=' ? { gridColumn: 'span 2' } : {}}
                        >
                            {btn === '=' ? '=' : btn === '%' ? '%' : (language === 'bn' ? toBengaliNumber(btn) : btn)}
                        </button>
                    ))}
                </div>

                {/* AdMob Ad Space - Dynamic Theme */}
                <div className={`w-full h-16 mt-6 border border-dashed rounded-xl flex items-center justify-center ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-400' : 'bg-gray-100 border-gray-200 text-gray-400'}`}>
                    <span className="text-xs font-medium">// AdMob Ad will run here</span>
                </div>
            </div>
        </div>
    );
};

const SimpleCalculator = () => {
    const [display, setDisplay] = useState('0');
    const [equation, setEquation] = useState('');

    // Hardcoded Dark Blue-ish Grey theme
    const bgClass = 'bg-[#1e293b]';
    const textClass = 'text-white';

    const handleInput = (val) => setDisplay(display === '0' && val !== '.' ? val : display + val);
    const handleOperator = (op) => { setEquation(display + ' ' + op + ' '); setDisplay('0'); };
    const handleClear = () => { setDisplay('0'); setEquation(''); };
    const handleCalculate = () => { try { setDisplay(String(eval(equation + display))); setEquation(''); } catch { setDisplay('Error'); } };

    return (
        <div className={`p-6 rounded-3xl shadow-xl border border-slate-700 mt-6 ${bgClass}`}>
            <h3 className={`text-lg font-bold mb-4 ${textClass} opacity-80 uppercase tracking-wider`}>General Calculator</h3>
            <div className="text-right mb-6 bg-slate-900/50 p-4 rounded-2xl border border-slate-700/50">
                <p className="text-sm h-6 text-slate-400 font-mono">{equation}</p>
                <h1 className="text-4xl font-bold text-white tracking-widest font-mono overflow-x-auto">{display}</h1>
            </div>
            <div className="grid grid-cols-4 gap-3">
                {['AC', '(', ')', '/'].map(btn => (
                    <button key={btn} onClick={() => btn === 'AC' ? handleClear() : btn === '/' ? handleOperator('/') : handleInput(btn)}
                        className="h-14 font-bold rounded-full shadow-lg text-lg bg-slate-700 text-cyan-300 hover:bg-slate-600 active:scale-95 transition-all">
                        {btn}
                    </button>
                ))}
                {['7', '8', '9', '*'].map(btn => (
                    <button key={btn} onClick={() => btn === '*' ? handleOperator('*') : handleInput(btn)}
                        className={`h-14 font-bold rounded-full shadow-lg text-xl active:scale-95 transition-all ${btn === '*' ? 'bg-slate-700 text-cyan-300 hover:bg-slate-600' : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700'}`}>
                        {btn === '*' ? '×' : btn}
                    </button>
                ))}
                {['4', '5', '6', '-'].map(btn => (
                    <button key={btn} onClick={() => btn === '-' ? handleOperator('-') : handleInput(btn)}
                        className={`h-14 font-bold rounded-full shadow-lg text-xl active:scale-95 transition-all ${btn === '-' ? 'bg-slate-700 text-cyan-300 hover:bg-slate-600' : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700'}`}>
                        {btn === '-' ? '-' : btn}
                    </button>
                ))}
                {['1', '2', '3', '+'].map(btn => (
                    <button key={btn} onClick={() => btn === '+' ? handleOperator('+') : handleInput(btn)}
                        className={`h-14 font-bold rounded-full shadow-lg text-xl active:scale-95 transition-all ${btn === '+' ? 'bg-slate-700 text-cyan-300 hover:bg-slate-600' : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700'}`}>
                        {btn === '+' ? '+' : btn}
                    </button>
                ))}
                {['0', '.', '=', '%'].map(btn => (
                    <button key={btn} onClick={() => btn === '=' ? handleCalculate() : handleInput(btn)}
                        className={`h-14 font-bold rounded-full shadow-lg text-xl active:scale-95 transition-all ${btn === '=' ? 'bg-cyan-600 text-white col-span-2' : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700'}`}
                        style={btn === '=' ? { gridColumn: 'span 2' } : {}}
                    >
                        {btn}
                    </button>
                ))}
            </div>

            {/* Ad Space for Calculator */}
            <div className="w-full h-16 mt-6 border border-dashed border-slate-600 rounded-xl flex items-center justify-center bg-slate-800/50">
                <span className="text-xs font-medium text-slate-500">// AdMob Ad will run here</span>
            </div>
        </div>
    );
};

const WeatherModule = () => {
    const [loading, setLoading] = useState(false);
    const [weather, setWeather] = useState({
        temp: 28,
        condition: 'Partly Cloudy',
        wind: 15,
        humidity: 62,
        rain: 10,
        city: 'Banani',
        district: 'Dhaka',
    });

    const hourlyForecast = [
        { time: 'Now', icon: Sun, temp: 28 },
        { time: '14:00', icon: Cloud, temp: 29 },
        { time: '15:00', icon: CloudLightning, temp: 27 },
        { time: '16:00', icon: CloudRain, temp: 26 },
        { time: '17:00', icon: CloudRain, temp: 25 },
        { time: '18:00', icon: Cloud, temp: 24 },
    ];

    const weeklyForecast = [
        { day: 'Today', icon: Cloud, min: 24, max: 29, type: 'Cloudy' },
        { day: 'Tomorrow', icon: CloudRain, min: 23, max: 28, type: 'Rainy' },
        { day: 'Wed', icon: CloudLightning, min: 22, max: 27, type: 'Stormy' },
        { day: 'Thu', icon: Sun, min: 24, max: 31, type: 'Sunny' },
        { day: 'Fri', icon: Sun, min: 25, max: 32, type: 'Sunny' },
        { day: 'Sat', icon: CloudRain, min: 23, max: 29, type: 'Rainy' },
        { day: 'Sun', icon: Cloud, min: 24, max: 30, type: 'Cloudy' },
    ];

    useEffect(() => {
        const fetchWeatherData = async (lat, lon) => {
            setLoading(true);
            try {
                // Example API call:
                // const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=YOUR_API_KEY`);
                // const data = await res.json();

                // Simulate fetching data based on coords
                setTimeout(() => {
                    // console.log("Fetched weather for:", lat, lon);
                    // setWeather({ ...parsedData });
                    setLoading(false);
                }, 1000);
            } catch (error) {
                console.error("Weather fetch failed", error);
                setLoading(false);
            }
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    // Auto-detect logic would go here
                    fetchWeatherData(latitude, longitude);
                },
                (error) => {
                    console.log("Location denied, using default.");
                }
            );
        }
    }, []);

    return (
        <div className="bg-slate-900/90 backdrop-blur-xl text-white rounded-3xl p-6 relative overflow-hidden shadow-2xl mt-6 font-sans border border-slate-700/50">
            {/* Background Decoration */}
            <div className="absolute top-[-50px] right-[-50px] w-48 h-48 bg-blue-500/20 rounded-full blur-[80px]" />
            <div className="absolute bottom-[-20%] left-[-20%] w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px]" />

            {/* Header: Location & Update */}
            <div className="flex justify-between items-start mb-6 relative z-10">
                <div className="flex flex-col">
                    <div className="flex items-center space-x-2 text-slate-300">
                        <MapPin size={16} className="text-blue-400" />
                        <span className="text-sm uppercase tracking-wider font-semibold">{weather.district}</span>
                    </div>
                    <span className="text-xs text-slate-500 font-medium ml-6">{weather.city}</span>
                </div>
                <button
                    className={`p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors ${loading ? 'animate-spin' : ''}`}
                    onClick={() => setLoading(true)} // Re-trigger fetch
                >
                    <RefreshCw size={14} className="text-slate-400" />
                </button>
            </div>

            {/* Main Weather Display */}
            <div className="flex flex-col items-center mb-10 relative z-10">
                {/* 3D-style Icon Container */}
                <div className="relative mb-2 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]">
                    <CloudLightning size={100} className="text-blue-400 z-10 relative" strokeWidth={1.5} />
                    <div className="absolute top-2 right-2 animate-pulse">
                        <CloudLightning size={100} className="text-yellow-300 opacity-20 blur-md" />
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <h1 className="text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 leading-none">
                        {weather.temp}°
                    </h1>
                    <p className="text-blue-300 text-lg font-medium mt-2">{weather.condition}</p>
                </div>
            </div>

            {/* Detailed Metrics */}
            <div className="grid grid-cols-3 gap-3 mb-8 bg-white/5 p-4 rounded-2xl border border-white/5 backdrop-blur-sm">
                <div className="flex flex-col items-center justify-center border-r border-white/10">
                    <Wind size={20} className="text-slate-300 mb-1" />
                    <span className="text-sm font-bold">{weather.wind} km/h</span>
                    <span className="text-[10px] text-slate-500 uppercase">Wind</span>
                </div>
                <div className="flex flex-col items-center justify-center border-r border-white/10">
                    <Droplets size={20} className="text-blue-400 mb-1" />
                    <span className="text-sm font-bold">{weather.humidity}%</span>
                    <span className="text-[10px] text-slate-500 uppercase">Humidity</span>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <CloudRain size={20} className="text-slate-300 mb-1" />
                    <span className="text-sm font-bold">{weather.rain}%</span>
                    <span className="text-[10px] text-slate-500 uppercase">Chance</span>
                </div>
            </div>

            {/* Hourly Forecast */}
            <div className="mb-6">
                <h3 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider pl-1">Hourly Forecast</h3>
                <div className="flex space-x-3 overflow-x-auto pb-2 scrollbar-hide">
                    {hourlyForecast.map((hour, index) => {
                        const Icon = hour.icon;
                        const isNow = index === 0;
                        return (
                            <div key={index} className={`flex-shrink-0 flex flex-col items-center justify-center w-14 h-24 rounded-xl border transition-all ${isNow ? 'bg-blue-600/20 border-blue-500/50 shadow-lg shadow-blue-900/20' : 'bg-white/5 border-white/5'}`}>
                                <span className={`text-[10px] mb-2 ${isNow ? 'text-blue-200' : 'text-slate-500'}`}>{hour.time}</span>
                                <Icon size={20} className={`mb-2 ${isNow ? 'text-blue-400' : 'text-slate-400'}`} />
                                <span className="text-sm font-bold">{hour.temp}°</span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 7-Day Forecast */}
            <div>
                <h3 className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider pl-1">7-Day Forecast</h3>
                <div className="space-y-2">
                    {weeklyForecast.slice(0, 4).map((day, idx) => {
                        const Icon = day.icon;
                        return (
                            <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                                <span className="text-sm font-medium w-20 text-slate-300">{day.day}</span>
                                <div className="flex items-center space-x-2 flex-1 justify-center">
                                    <Icon size={18} className="text-blue-400" />
                                    <span className="text-xs text-slate-400 w-16 text-center">{day.type}</span>
                                </div>
                                <div className="flex space-x-2 w-16 justify-end text-sm">
                                    <span className="font-bold text-white">{day.max}°</span>
                                    <span className="text-slate-500">{day.min}°</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Ad Space for Weather */}
            <div className="w-full h-16 mt-6 border border-dashed border-slate-700 rounded-xl flex items-center justify-center bg-black/20 relative z-10">
                <span className="text-xs font-medium text-slate-500">// AdMob Ad will run here</span>
            </div>
        </div>
    );
};

const AgeCalculator = () => {
    const [dob, setDob] = useState('');
    const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);
    const [age, setAge] = useState(null);
    const [nextBirthday, setNextBirthday] = useState(null);
    const [error, setError] = useState('');
    const [showCalculator, setShowCalculator] = useState(false);
    const [activeTab, setActiveTab] = useState('age');

    // Consume Context - forcing English for this component
    const { theme } = useContext(AppContext);
    const language = 'en';

    const calculateNextBirthday = (birthDate, today) => {
        let nextBday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
        if (isAfter(today, nextBday) || today.getTime() === nextBday.getTime()) {
            nextBday.setFullYear(today.getFullYear() + 1);
        }

        const months = differenceInMonths(nextBday, today);
        const days = differenceInDays(nextBday, addMonths(today, months));

        const dayNamesBn = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
        const dayNamesEn = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const dayName = language === 'bn' ? dayNamesBn[nextBday.getDay()] : dayNamesEn[nextBday.getDay()];

        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = new Intl.DateTimeFormat(language === 'bn' ? 'bn-BD' : 'en-US', options).format(nextBday);

        return { months, days, dayName, formattedDate };
    };

    const handleCalculate = () => {
        if (!dob) {
            setError(language === 'bn' ? 'অনুগ্রহ করে জন্ম তারিখ নির্বাচন করুন' : 'Please select Date of Birth');
            setAge(null);
            setNextBirthday(null);
            return;
        }

        const birthDate = parseISO(dob);
        const endDate = parseISO(targetDate);

        if (!isValid(birthDate) || !isValid(endDate)) {
            setError(language === 'bn' ? 'তারিখ সঠিক নয়' : 'Invalid Date');
            setAge(null);
            setNextBirthday(null);
            return;
        }

        if (birthDate > endDate) {
            setError(language === 'bn' ? 'জন্ম তারিখ ভবিষ্যতের হতে পারে না' : 'Date of Birth cannot be in the future');
            setAge(null);
            setNextBirthday(null);
            return;
        }

        setError('');

        const years = differenceInYears(endDate, birthDate);
        const months = differenceInMonths(endDate, addYears(birthDate, years));
        const days = differenceInDays(endDate, addMonths(addYears(birthDate, years), months));

        setAge({ years, months, days });
        setNextBirthday(calculateNextBirthday(birthDate, endDate));
    };

    const t = {
        dobLabel: language === 'bn' ? 'জন্ম তারিখ' : 'Date of Birth',
        targetLabel: language === 'bn' ? 'আজকের তারিখ (অথবা লক্ষ্য তারিখ)' : 'Today\'s Date (or Target Date)',
        calcBtn: language === 'bn' ? 'বয়স দেখুন' : 'Calculate Age',
        year: language === 'bn' ? 'বছর' : 'Years',
        month: language === 'bn' ? 'মাস' : 'Months',
        day: language === 'bn' ? 'দিন' : 'Days',
        nextBdayTitle: language === 'bn' ? 'পরবর্তী জন্মদিন' : 'Next Birthday',
        remaining: language === 'bn' ? 'আর বাকি:' : 'Remaining:',
        dateLabel: language === 'bn' ? 'তারিখ:' : 'Date:',
        smartCalc: language === 'bn' ? 'স্মার্ট ক্যালকুলেটর' : 'Smart Calculator'
    };

    return (
        <div className="min-h-screen pb-20 fade-in relative">
            {showCalculator && <SmartCalculator onClose={() => setShowCalculator(false)} />}

            {/* Top Tabs */}
            <div className={`grid grid-cols-3 gap-2 p-2 rounded-2xl mb-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white border'}`}>
                <button
                    onClick={() => setActiveTab('age')}
                    className={`py-2 px-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'age' ? 'bg-emerald-600 text-white shadow-md' : (theme === 'dark' ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100')}`}
                >
                    বয়স নির্ণয়
                </button>
                <button
                    onClick={() => setActiveTab('calculator')}
                    className={`py-2 px-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'calculator' ? 'bg-emerald-600 text-white shadow-md' : (theme === 'dark' ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100')}`}
                >
                    ক্যালকুলেটর
                </button>
                <button
                    onClick={() => setActiveTab('weather')}
                    className={`py-2 px-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'weather' ? 'bg-emerald-600 text-white shadow-md' : (theme === 'dark' ? 'text-gray-400 hover:bg-gray-700' : 'text-gray-500 hover:bg-gray-100')}`}
                >
                    আবহাওয়া
                </button>
            </div>

            {/* Content Area */}
            <div className="animate-fade-in-up">
                {activeTab === 'age' && (
                    <div className="space-y-6">
                        <div className="flex justify-end">
                            <button
                                onClick={() => setShowCalculator(true)}
                                className={`flex items-center px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors shadow-sm ${theme === 'dark' ? 'bg-emerald-900/30 border-emerald-800 text-emerald-400 hover:bg-emerald-900/50' : 'bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100'}`}
                            >
                                <Calculator size={16} className="mr-1.5" />
                                {t.smartCalc}
                            </button>
                        </div>

                        <div className={`glass-card p-6 rounded-2xl shadow-sm border mt-0 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-emerald-50'}`}>
                            <div className="space-y-4">
                                <div className="flex flex-col space-y-2">
                                    <label className={`text-sm font-medium ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-800'}`}>{t.dobLabel}</label>
                                    <input
                                        type="date"
                                        value={dob}
                                        onChange={(e) => setDob(e.target.value)}
                                        className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-400 focus:outline-none ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-emerald-50 border-emerald-200 text-emerald-900'}`}
                                    />
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <label className={`text-sm font-medium ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-800'}`}>{t.targetLabel}</label>
                                    <input
                                        type="date"
                                        value={targetDate}
                                        onChange={(e) => setTargetDate(e.target.value)}
                                        className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-emerald-400 focus:outline-none ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'bg-emerald-50 border-emerald-200 text-emerald-900'}`}
                                    />
                                </div>

                                <button
                                    onClick={handleCalculate}
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl shadow-lg transition-transform active:scale-95"
                                >
                                    {t.calcBtn}
                                </button>

                                {error && (
                                    <div className={`p-3 rounded-lg text-sm font-medium text-center animate-pulse ${theme === 'dark' ? 'bg-red-900/30 text-red-400' : 'bg-red-50 text-red-600'}`}>
                                        {error}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Result Section */}
                        {age && (
                            <div className="space-y-6 fade-in">
                                <div className="grid grid-cols-3 gap-2 text-center">
                                    <div className={`p-4 rounded-xl shadow-sm border flex flex-col items-center ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-emerald-100'}`}>
                                        <span className={`text-3xl font-bold ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>{language === 'bn' ? toBengaliNumber(age.years) : age.years}</span>
                                        <span className="text-xs text-gray-500 uppercase mt-1">{t.year}</span>
                                    </div>
                                    <div className={`p-4 rounded-xl shadow-sm border flex flex-col items-center ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-emerald-100'}`}>
                                        <span className={`text-3xl font-bold ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>{language === 'bn' ? toBengaliNumber(age.months) : age.months}</span>
                                        <span className="text-xs text-gray-500 uppercase mt-1">{t.month}</span>
                                    </div>
                                    <div className={`p-4 rounded-xl shadow-sm border flex flex-col items-center ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-emerald-100'}`}>
                                        <span className={`text-3xl font-bold ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-600'}`}>{language === 'bn' ? toBengaliNumber(age.days) : age.days}</span>
                                        <span className="text-xs text-gray-500 uppercase mt-1">{t.day}</span>
                                    </div>
                                </div>

                                {/* Next Birthday Info */}
                                {nextBirthday && (
                                    <div className={`p-5 rounded-xl shadow-sm border-l-4 ${theme === 'dark' ? 'bg-gray-800 border-emerald-600' : 'bg-white border-emerald-500'}`}>
                                        <h3 className={`text-lg font-bold mb-2 ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-800'}`}>{t.nextBdayTitle}</h3>
                                        <div className="space-y-1">
                                            <p className={`font-medium ${theme === 'dark' ? 'text-emerald-300' : 'text-emerald-700'}`}>
                                                {t.remaining} <span className="font-bold">{language === 'bn' ? toBengaliNumber(nextBirthday.months) : nextBirthday.months} {t.month} {language === 'bn' ? toBengaliNumber(nextBirthday.days) : nextBirthday.days} {t.day}</span>
                                            </p>
                                            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                                                {t.dateLabel} {nextBirthday.formattedDate}, {nextBirthday.dayName}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Ad Space for Age Module */}
                        <div className={`w-full h-24 mb-6 border border-dashed rounded-xl flex items-center justify-center ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-400' : 'bg-gray-100 border-gray-200 text-gray-400'}`}>
                            <span className="text-xs font-medium">// AdMob Ad will run here</span>
                        </div>
                    </div>
                )}

                {activeTab === 'calculator' && (
                    <div className="fade-in">
                        <SimpleCalculator />
                    </div>
                )}

                {activeTab === 'weather' && (
                    <div className="fade-in">
                        <WeatherModule />
                    </div>
                )}
            </div>

            {/* Bottom Fixed Glassmorphism Menu Bar */}
            <div className={`fixed bottom-0 left-0 right-0 h-16 backdrop-blur-lg border-t flex justify-around items-center z-50 transition-all ${theme === 'dark' ? 'bg-gray-900/80 border-white/10' : 'bg-white/80 border-emerald-100'}`}>
                {/* This bar is currently a placeholder for future navigation, just visual for now as requested */}
                <button className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'text-emerald-400 hover:bg-white/5' : 'text-emerald-600 hover:bg-emerald-50'}`}>
                    <Home size={24} strokeWidth={2} />
                </button>
                <button className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'text-gray-400 hover:bg-white/5' : 'text-gray-400 hover:bg-gray-50'}`}>
                    <Grid size={24} strokeWidth={2} />
                </button>
                <button className={`p-2 rounded-full transition-colors ${theme === 'dark' ? 'text-gray-400 hover:bg-white/5' : 'text-gray-400 hover:bg-gray-50'}`}>
                    <Calendar size={24} strokeWidth={2} />
                </button>
            </div>
        </div >
    );
};

export default AgeCalculator;
