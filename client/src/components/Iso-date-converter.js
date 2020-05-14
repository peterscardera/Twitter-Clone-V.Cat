

export default function isoConverter(date){
let theDate = new Date(date)

let year = theDate.getFullYear();
let month = theDate.getMonth()+1;
let dt = theDate.getDate();


if (dt < 10) {
    dt = '0' + dt;
  }
  if (month < 10) {
    month = '0' + month;
  }
  
  return year+'-' + month + '-'+dt
}