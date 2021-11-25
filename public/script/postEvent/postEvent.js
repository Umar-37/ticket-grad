//import {AirDatepicker}from "./../node_modules/air-datepicker/index.es";
const en=require('air-datepicker/locale/en').default
const AirDatepicker=require('air-datepicker')
//import en from "air-datepicker/locale/en";


let startDate = new Date('2021-07-20');
let tomorrowDate = new Date(startDate);
tomorrowDate.setDate(tomorrowDate.getDate()+1)

let options = {
  locale: en,
    startDate,
    multipleDates: true,
    selectedDates: [startDate, '2021-07-25', 1626307200000]
}

let dp = new AirDatepicker("#dp", options);
console.log(en);//