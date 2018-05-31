const DAYS = [
    'Minggu',
    'Senin',
    'Selasa',
    'Rabu',
    'Kamis',
    'Jum\'at',
    'Sabtu',
];

const MONTHS = [
    'Januri',
    'Februari',
    'Maret',
    'April',
    'Mei',
    'Juni',
    'Juli',
    'Agustus',
    'September',
    'Oktober',
    'November',
    'Desember'
];


export const formatDate = ({ date, format }) => {
    if(_.isObject(date) === false){
        date = Date(date);
    }

    let day, month, year, strDay;
    day = date.getDate();
    year = date.getFullYear();
    month = date.getMonth() + 1;
    strDay = date.getDay();

    //add zero
    day = day <= 9 ? "0" + day : day;
    month = month <= 9 ? "0" + month : month;

    // replace template
    format = format.replace('d', day);
    format = format.replace('D', strDay);
    format = format.replace('m', month);
    format = format.replace('M', MONTHS[month]);
    format = format.replace('y', year.toString().substr(2));
    format = format.replace('Y', year);

    return format;
}
