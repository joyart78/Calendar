import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import {
    startOfMonth,
    addDays,
    format,
    addMonths,
    isToday,
    getDay,
    endOfMonth,
} from 'date-fns';

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const renderDays = () => {
        const startOfCalendar = startOfMonth(selectedDate);
        const endOfCalendar = endOfMonth(selectedDate);

        const days = [];
        const currentMonthDay = startOfCalendar.getDate();
        const startDayOfWeek = getDay(startOfCalendar);

        for (let i = 0; i < startDayOfWeek; i++) {
            days.push(
                <View key={`empty-${i}`} style={styles.dateContainer}>
                    <Text style={styles.dateText}>{''}</Text>
                </View>
            );
        }

        for (let i = 1; i <= endOfCalendar.getDate(); i++) {
            const currentDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), i);
            days.push(
                <TouchableOpacity
                    key={currentDate.toString()}
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
