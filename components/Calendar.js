import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { startOfMonth, addDays, format, addMonths, isToday, getDay } from 'date-fns';

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const renderDays = () => {
        const daysInMonth = new Date(
            selectedDate.getFullYear(),
            selectedDate.getMonth() + 1,
            0
        ).getDate();

        const startOfCalendar = startOfMonth(selectedDate);

        const days = [];
        const currentMonthDay = startOfCalendar.getDate();
        const startDayOfWeek = getDay(startOfCalendar);

        for (let i = startDayOfWeek; i > 0; i--) {
            const prevMonthDate = addDays(startOfCalendar, -i);
            days.push(
                <TouchableOpacity
                    key={`prevMonth${i}`}
                    onPress={() => handleDatePress(prevMonthDate)}
                    style={styles.dateContainer}
                >
                    <Text style={styles.prevMonthDateText}>
                        {format(prevMonthDate, 'd')}
                    </Text>
                </TouchableOpacity>
            );
        }

        for (let i = 0; i < daysInMonth; i++) {
            const currentDate = addDays(startOfCalendar, i);
            days.push(
                <TouchableOpacity
                    key={i}
                    onPress={() => handleDatePress(currentDate)}
                    style={styles.dateContainer}
                >
                    <Text
                        style={[
                            styles.dateText,
                            isToday(currentDate) ? styles.todayDate : null,
                            format(currentDate, 'd') === format(selectedDate, 'd') &&
                            format(currentDate, 'M') === format(selectedDate, 'M')
                                ? styles.selectedDate
                                : null,
                        ]}
                    >
                        {format(currentDate, 'd')}
                    </Text>
                </TouchableOpacity>
            );
        }

        const remainingDays = 7 - (days.length % 7);
        for (let i = 1; i <= remainingDays; i++) {
            const nextMonthDate = addDays(startOfCalendar, daysInMonth + i);
            days.push(
                <TouchableOpacity
                    key={`nextMonth${i}`}
                    onPress={() => handleDatePress(nextMonthDate)}
                    style={styles.dateContainer}
                >
                    <Text style={styles.nextMonthDateText}>
                        {format(nextMonthDate, 'd')}
                    </Text>
                </TouchableOpacity>
            );
        }

        return days;
    };

    const handleDatePress = (date) => {
        setSelectedDate(date);
    };

    const handleMonthChange = (months) => {
        setSelectedDate(addMonths(selectedDate, months));
    };

    const handleYearChange = (years) => {
        setSelectedDate(new Date(selectedDate.getFullYear() + years, selectedDate.getMonth()));
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => handleMonthChange(-1)}>
                    <Text>Prev Month</Text>
                </TouchableOpacity>
                <Text style={styles.monthText}>
                    {format(selectedDate, 'MMMM yyyy')}
                </Text>
                <TouchableOpacity onPress={() => handleMonthChange(1)}>
                    <Text>Next Month</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.daysContainer}>
                <Text style={styles.dayText}>Sun</Text>
                <Text style={styles.dayText}>Mon</Text>
                <Text style={styles.dayText}>Tue</Text>
                <Text style={styles.dayText}>Wed</Text>
                <Text style={styles.dayText}>Thu</Text>
                <Text style={styles.dayText}>Fri</Text>
                <Text style={styles.dayText}>Sat</Text>
            </View>
            <View style={styles.datesContainer}>{renderDays()}</View>
            <View style={styles.footer}>
                <TouchableOpacity onPress={() => handleYearChange(-1)}>
                    <Text>Prev Year</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleYearChange(1)}>
                    <Text>Next Year</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    monthText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    daysContainer: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    dayText: {
        flex: 1,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    datesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    dateContainer: {
        width: '14.28%',
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    dateText: {
        textAlign: 'center',
        fontSize: 16,
    },
    prevMonthDateText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'gray',
    },
    nextMonthDateText: {
        textAlign: 'center',
        fontSize: 16,
        color: 'gray',
    },
    todayDate: {
        backgroundColor: 'yellow',
        borderRadius: 16,
    },
    selectedDate: {
        backgroundColor: 'lightblue',
        borderRadius: 16,
    },
    selectedDateText: {
        marginTop: 16,
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
});

export default Calendar;
