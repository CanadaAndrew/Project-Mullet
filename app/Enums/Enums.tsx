import moment from 'moment-timezone';


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

const SERVICES = {
    KIDS_HAIRCUT: {service: "Kid's Haircut", time: 1},
    MENS_HAIRCUT: {service: "Men's Haircut", time: 1},
    WOMANS_HAIRCUT: {service: "Woman's Haircut", time: 1},
    PARTIAL_HIGHLIGHT: {service: "Partial Highlight", time: 3},
    FULL_HIGHLIGHT: {service: "Full Highlight", time: 3},
    ROOT_TOUCH_UP: {service: "Root touch up", time: 2},
    FULL_COLOR: {service: "Full Color", time: 2},
    EXTENSION_CONSULTATION: {service: "Extension Consultation", time: 1},
    EXTENSION_INSTALLATION: {service: "Extension Installation", time: 3},
    EXTENSION_MOVE_UP: {service: "Extension Move-up", time: 3},
    MAKEUP: {service: "Makeup", time: 1},
    SPECIAL_OCCASION_HAIRSTYLE: {service: "Special Occasion Hairstyle", time: 1},
    PERM: {service: "Perm", time: 2},
    DEEP_CONDITIONING_TREATMENT: {service: "Deep Conditioning Treatment", time: 1},
    BLOW_DRY_AND_STYLE: {service: "Blow dry and style", time: 1},
    WAXING: {service: "Waxing", time: 1}
}

const militaryHours = {};
militaryHours['12:00AM'] = '00:00:00';
militaryHours['01:00AM'] = '01:00:00';
militaryHours['02:00AM'] = '02:00:00';
militaryHours['03:00AM'] = '03:00:00';
militaryHours['04:00AM'] = '04:00:00';
militaryHours['05:00AM'] = '05:00:00';
militaryHours['06:00AM'] = '06:00:00';
militaryHours['07:00AM'] = '07:00:00';
militaryHours['08:00AM'] = '08:00:00';
militaryHours['09:00AM'] = '09:00:00';
militaryHours['10:00AM'] = '10:00:00';
militaryHours['11:00AM'] = '11:00:00';
militaryHours['12:00PM'] = '12:00:00';
militaryHours['01:00PM'] = '13:00:00';
militaryHours['02:00PM'] = '14:00:00';
militaryHours['03:00PM'] = '15:00:00';
militaryHours['04:00PM'] = '16:00:00';
militaryHours['05:00PM'] = '17:00:00';
militaryHours['06:00PM'] = '18:00:00';
militaryHours['07:00PM'] = '19:00:00';
militaryHours['08:00PM'] = '20:00:00';
militaryHours['09:00PM'] = '21:00:00';
militaryHours['10:00PM'] = '22:00:00';
militaryHours['11:00PM'] = '23:00:00';

const displayHours = {};
displayHours['00:00:00'] = '12:00AM';
displayHours['01:00:00'] = '01:00AM';
displayHours['02:00:00'] = '02:00AM';
displayHours['03:00:00'] = '03:00AM';
displayHours['04:00:00'] = '04:00AM';
displayHours['05:00:00'] = '05:00AM';
displayHours['06:00:00'] = '06:00AM';
displayHours['07:00:00'] = '07:00AM';
displayHours['08:00:00'] = '08:00AM';
displayHours['09:00:00'] = '09:00AM';
displayHours['10:00:00'] = '10:00AM';
displayHours['11:00:00'] = '11:00AM';
displayHours['12:00:00'] = '12:00PM';
displayHours['13:00:00'] = '01:00PM';
displayHours['14:00:00'] = '02:00PM';
displayHours['15:00:00'] = '03:00PM';
displayHours['16:00:00'] = '04:00PM';
displayHours['17:00:00'] = '05:00PM';
displayHours['18:00:00'] = '06:00PM';
displayHours['19:00:00'] = '07:00PM';
displayHours['20:00:00'] = '08:00PM';
displayHours['21:00:00'] = '09:00PM';
displayHours['22:00:00'] = '10:00PM';
displayHours['23:00:00'] = '11:00PM';

function UTCtoPST(today: Date)
{
    //get today's date and convert it to PST
   
    const pstDateString =  moment(today).tz('America/Los_Angeles').format('YYYY-MM-DDTHH:mm:ss.SSS');
    const todaysDate = pstDateString.slice(11, 16); //cuts off the date section
    //console.log('todaysDate: ', todaysDate); //for debugging

    return todaysDate; //returns time as a string in HH:MM format
   
}

export{monthsNum, monthsWritten, militaryHours, displayHours, SERVICES, UTCtoPST};
