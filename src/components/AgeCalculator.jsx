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
    const { language, theme } = useContext(AppContext);
    const [loading, setLoading] = useState(true);
    const [useDefault, setUseDefault] = useState(false);
    const [weather, setWeather] = useState({
        temp: '--',
        condition: language === 'bn' ? 'লোড হচ্ছে...' : 'Loading...',
        wind: '--',
        humidity: '--',
        rain: '--',
        district: language === 'bn' ? 'লোকেশন' : 'Location',
        code: 0
    });

    const [forecast, setForecast] = useState([]);

    const weatherConditionsBn = {
        'Clear': 'পরিষ্কার আকাশ',
        'Mainly Clear': 'অধিকাংশ পরিষ্কার',
        'Partly Cloudy': 'আংশিক মেঘলা',
        'Overcast': 'মেঘলা আকাশ',
        'Fog': 'কুয়াশাচ্ছন্ন',
        'Drizzle': 'ঝিরঝিরে বৃষ্টি',
        'Rain': 'বৃষ্টি',
        'Snow': 'তুষারপাত',
        'Thunderstorm': 'বজ্রবৃষ্টি',
    };

    const fetchWeatherData = async (lat, lon, isFallback = false) => {
        setLoading(true);
        setUseDefault(isFallback);
        try {
            const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,precipitation_probability,weathercode&timezone=auto`);
            const weatherData = await weatherRes.json();

            // Fetch only district level Info in Bengali
            const geoRes = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=8&addressdetails=1&accept-language=bn`);
            const geoData = await geoRes.json();

            const address = geoData.address;
            const district = address.state_district || address.city || address.county || (language === 'bn' ? 'ঢাকা' : 'Dhaka');

            const interpretCode = (code) => {
                if (code === 0) return 'Clear';
                if (code <= 3) return 'Partly Cloudy';
                if (code <= 48) return 'Fog';
                if (code <= 55) return 'Drizzle';
                if (code <= 65) return 'Rain';
                if (code <= 77) return 'Snow';
                if (code <= 82) return 'Rain';
                return 'Thunderstorm';
            };

            const condition = interpretCode(weatherData.current_weather.weathercode);

            setWeather({
                temp: Math.round(weatherData.current_weather.temperature),
                condition: language === 'bn' ? (weatherConditionsBn[condition] || condition) : condition,
                wind: weatherData.current_weather.windspeed,
                humidity: weatherData.hourly.relativehumidity_2m[0],
                rain: weatherData.hourly.precipitation_probability[0],
                district: district,
                code: weatherData.current_weather.weathercode
            });

            const currentHour = new Date().getHours();
            const hourly = weatherData.hourly.temperature_2m.slice(currentHour, currentHour + 6).map((t, i) => ({
                time: i === 0 ? (language === 'bn' ? 'এখন' : 'Now') : `${(currentHour + i) % 24}:00`,
                temp: Math.round(t),
                code: weatherData.hourly.weathercode[currentHour + i]
            }));
            setForecast(hourly);
            setLoading(false);
        } catch (error) {
            console.error("Weather fetch failed", error);
            setLoading(false);
        }
    };

    const detectLocation = () => {
        setLoading(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchWeatherData(position.coords.latitude, position.coords.longitude);
                },
                (error) => {
                    fetchWeatherData(23.8103, 90.4125, true); // Fallback to Dhaka
                },
                { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
            );
        } else {
            fetchWeatherData(23.8103, 90.4125, true);
        }
    };

    useEffect(() => {
        detectLocation();
    }, []);

    const getWeatherIcon = (code, size = 60) => {
        const getBaseIcon = () => {
            if (code === 0) return <Sun size={size} className="text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" strokeWidth={1.5} />;
            if (code <= 3) return <Cloud size={size} className="text-blue-300 drop-shadow-[0_0_10px_rgba(147,197,253,0.5)]" strokeWidth={1.5} />;
            if (code <= 48) return <Cloud size={size} className="text-gray-400 drop-shadow-[0_0_10px_rgba(156,163,175,0.5)]" strokeWidth={1.5} />;
            if (code <= 55) return <CloudRain size={size} className="text-blue-200 drop-shadow-[0_0_10px_rgba(191,219,254,0.5)]" strokeWidth={1.5} />;
            if (code <= 65) return <CloudRain size={size} className="text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.5)]" strokeWidth={1.5} />;
            if (code <= 77) return <CloudSnow size={size} className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" strokeWidth={1.5} />;
            if (code <= 82) return <CloudRain size={size} className="text-blue-500 drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]" strokeWidth={1.5} />;
            return <CloudLightning size={size} className="text-yellow-300 drop-shadow-[0_0_15px_rgba(253,224,71,0.5)]" strokeWidth={1.5} />;
        };

        return (
            <div className="relative group transition-transform duration-500 hover:scale-110">
                <div className="absolute inset-0 blur-xl opacity-20 scale-150 animate-pulse bg-current rounded-full" />
                {getBaseIcon()}
            </div>
        );
    };

    return (
        <div className={`relative overflow-hidden rounded-[2.5rem] p-8 shadow-2xl transition-all duration-700 font-sans border border-white/10 ${theme === 'dark' ? 'bg-slate-900/80 text-white' : 'bg-slate-800/90 text-white'}`}>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px]" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-500/10 rounded-full blur-[100px]" />

            <div className="relative z-10 flex flex-col space-y-3 mb-8">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2.5 bg-white/5 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/5">
                        <MapPin size={16} className="text-blue-400 animate-bounce" />
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200">
                            {weather.district}
                        </span>
                    </div>
                    <button onClick={detectLocation} className={`p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all active:scale-90 ${loading ? 'animate-spin' : ''}`}>
                        <RefreshCw size={18} className="text-slate-300" />
                    </button>
                </div>

                {useDefault && (
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center space-x-2 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-xl">
                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                        <span className="text-[10px] font-medium text-amber-200">
                            {language === 'bn' ? 'সঠিক আবহাওয়ার জন্য লোকেশন অন করুন' : 'Turn on location for accuracy'}
                        </span>
                    </motion.div>
                )}
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center space-y-6 mb-12 py-4">
                <div className="py-2 scale-125">
                    {getWeatherIcon(weather.code, 120)}
                </div>

                <div className="text-center">
                    <div className="flex flex-col items-center">
                        <span className="text-8xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white to-white/40 leading-none tracking-tighter drop-shadow-2xl">
                            {language === 'bn' ? toBengaliNumber(weather.temp) : weather.temp}
                            <span className="text-4xl align-top ml-1 text-blue-400">°</span>
                        </span>
                        <h2 className="text-3xl font-bold mt-4 text-blue-100 tracking-tight">
                            {weather.district}
                        </h2>
                        <p className="text-sm font-bold uppercase tracking-[0.3em] text-white/40 mt-2 bg-white/5 px-6 py-1 rounded-full border border-white/5 backdrop-blur-sm">
                            {weather.condition}
                        </p>
                    </div>
                </div>
            </div>

            <div className="relative z-10 grid grid-cols-3 gap-4 mb-8">
                {[
                    { icon: Wind, val: weather.wind, unit: 'km/h', label: language === 'bn' ? 'বাতাস' : 'Wind', color: 'text-slate-300' },
                    { icon: Droplets, val: weather.humidity, unit: '%', label: language === 'bn' ? 'আর্দ্রতা' : 'Humidity', color: 'text-blue-400' },
                    { icon: CloudRain, val: weather.rain, unit: '%', label: language === 'bn' ? 'বৃষ্টি' : 'RainChance', color: 'text-blue-300' }
                ].map((item, idx) => (
                    <div key={idx} className="flex flex-col items-center justify-center p-4 rounded-[2rem] bg-white/5 border border-white/5 backdrop-blur-md hover:bg-white/10 transition-colors group">
                        <item.icon size={22} className={`${item.color} mb-2 group-hover:scale-110 transition-transform`} />
                        <div className="flex flex-col items-center">
                            <span className="text-sm font-black leading-tight">
                                {language === 'bn' ? toBengaliNumber(item.val) : item.val}
                                <span className="text-[10px] font-medium ml-0.5 opacity-60">{item.unit}</span>
                            </span>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-white/30 mt-1">{item.label}</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4 px-2">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">
                        {language === 'bn' ? 'আগামী কয়েক ঘণ্টা' : 'Hourly Snapshot'}
                    </h3>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent ml-4" />
                </div>
                <div className="flex space-x-3 overflow-x-auto pb-4 scrollbar-hide">
                    {forecast.map((hour, index) => (
                        <div key={index} className={`flex-shrink-0 flex flex-col items-center justify-center w-16 h-32 rounded-3xl border transition-all duration-500 ${index === 0 ? 'bg-blue-500/20 border-blue-500/50 shadow-xl' : 'bg-white/5 border-white/5 hover:bg-white/10'}`}>
                            <span className={`text-[10px] mb-4 font-black ${index === 0 ? 'text-blue-300' : 'text-white/40'}`}>
                                {language === 'bn' ? toBengaliNumber(hour.time) : hour.time}
                            </span>
                            <div className="mb-4">
                                {getWeatherIcon(hour.code, 22)}
                            </div>
                            <span className="text-sm font-black tracking-tighter">
                                {language === 'bn' ? toBengaliNumber(hour.temp) : hour.temp}°
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative z-10 w-full h-16 mt-4 border border-dashed border-white/10 rounded-3xl flex items-center justify-center bg-black/20 overflow-hidden">
                <span className="text-[10px] font-medium text-white/20 uppercase tracking-[0.4em] font-mono">Sponsored Slot</span>
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
