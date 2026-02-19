import React, { useState, useContext } from 'react';
import { toBengaliNumber } from '../utils/bengaliUtils';
import { differenceInYears, differenceInMonths, differenceInDays, addYears, addMonths, isValid, parseISO, isAfter } from 'date-fns';
import { Calculator } from 'lucide-react';
import { AppContext } from '../App';

const SmartCalculator = ({ onClose }) => {
    const [display, setDisplay] = useState('0');
    const [equation, setEquation] = useState('');
    const { language, theme } = useContext(AppContext);

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

const AgeCalculator = () => {
    const [dob, setDob] = useState('');
    const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);
    const [age, setAge] = useState(null);
    const [nextBirthday, setNextBirthday] = useState(null);
    const [error, setError] = useState('');
    const [showCalculator, setShowCalculator] = useState(false);

    // Consume Context
    const { language, theme } = useContext(AppContext);

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
        <div className="space-y-6 pb-20 fade-in">
            {showCalculator && <SmartCalculator onClose={() => setShowCalculator(false)} />}

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

                    {/* AdMob Ad Space - Bottom of Result */}
                    <div className={`w-full h-32 border border-dashed rounded-xl flex items-center justify-center ${theme === 'dark' ? 'bg-gray-700 border-gray-600 text-gray-400' : 'bg-gray-100 border-gray-200 text-gray-400'}`}>
                        <span className="text-sm font-medium">// AdMob Ad will run here</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AgeCalculator;
