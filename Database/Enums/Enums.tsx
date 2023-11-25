/*
module.exports = {
    test: getMonthsNum,
    test2:getMonthsWritten
}
*/
function getMonthsNum(){
    return monthsNum;
}

function getMonthsWritten(){
    return monthsWritten;
}

const monthsNum = {
    January: '01',
    February: '02',
    March: '03',
    April: '04',
    May: '05',
    June: '06',
    July: '07',
    August: '08',
    September: '09',
    October: '10',
    November: '11',
    December: '12'
}

const monthsWritten = {
    January: 'January',
    February: 'February',
    March: 'March',
    April: 'April',
    May: 'May',
    June: 'June',
    July: 'July',
    August: 'August',
    September: 'September',
    October: 'October',
    November: 'November',
    December: 'December'
}

const daysWritten = {};
daysWritten['1st'] = '01';
daysWritten['2nd'] = '02';
daysWritten['3rd'] = '03';
daysWritten['4th'] = '04';
daysWritten['5th'] = '05';
daysWritten['6th'] = '06';
daysWritten['7th'] = '07';
daysWritten['8th'] = '08';
daysWritten['9th'] = '09';
daysWritten['10th'] = '10';
daysWritten['11th'] = '11';
daysWritten['12th'] = '12';
daysWritten['13th'] = '13';
daysWritten['14th'] = '14';
daysWritten['15th'] = '15';
daysWritten['16th'] = '16';
daysWritten['17th'] = '17';
daysWritten['18th'] = '18';
daysWritten['19th'] = '19';
daysWritten['20th'] = '20';
daysWritten['21st'] = '21';
daysWritten['22nd'] = '22';
daysWritten['23rd'] = '23';
daysWritten['24th'] = '24';
daysWritten['25th'] = '25';
daysWritten['26th'] = '26';
daysWritten['27th'] = '27';
daysWritten['28th'] = '28';
daysWritten['29th'] = '29';
daysWritten['30th'] = '30';
daysWritten['31st'] = '31';



const militaryHours = {};
militaryHours[0] = '00:00:00';
militaryHours[1] = '01:00:00';
militaryHours[2] = '02:00:00';
militaryHours[3] = '03:00:00';
militaryHours[4] = '04:00:00';
militaryHours[5] = '05:00:00';
militaryHours[6] = '06:00:00';
militaryHours[7] = '07:00:00';
militaryHours[8] = '08:00:00';
militaryHours[9] = '09:00:00';
militaryHours[10] = '10:00:00';
militaryHours[11] = '11:00:00';
militaryHours[12] = '12:00:00';
militaryHours[13] = '13:00:00';
militaryHours[14] = '14:00:00';
militaryHours[15] = '15:00:00';
militaryHours[16] = '16:00:00';
militaryHours[17] = '17:00:00';
militaryHours[18] = '18:00:00';
militaryHours[19] = '19:00:00';
militaryHours[20] = '20:00:00';
militaryHours[21] = '21:00:00';
militaryHours[22] = '22:00:00';
militaryHours[23] = '23:00:00';

const displayHours = {};
displayHours[0] = '12:00AM';
displayHours[1] = '01:00AM';
displayHours[2] = '02:00AM';
displayHours[3] = '03:00AM';
displayHours[4] = '04:00AM';
displayHours[5] = '05:00AM';
displayHours[6] = '06:00AM';
displayHours[7] = '07:00AM';
displayHours[8] = '08:00AM';
displayHours[9] = '09:00AM';
displayHours[10] = '10:00AM';
displayHours[11] = '11:00AM';
displayHours[12] = '12:00PM';
displayHours[13] = '01:00PM';
displayHours[14] = '02:00PM';
displayHours[15] = '03:00PM';
displayHours[16] = '04:00PM';
displayHours[17] = '05:00PM';
displayHours[18] = '06:00PM';
displayHours[19] = '07:00PM';
displayHours[20] = '08:00PM';
displayHours[21] = '09:00PM';
displayHours[22] = '10:00PM';
displayHours[23] = '11:00PM';

export{getMonthsNum, getMonthsWritten};