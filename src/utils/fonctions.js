import moment from "moment";

export function compareDateStringWithDateCurrent(string){
    let datePoste = new Date(string).getTime();
    let dateCurrent = new Date().getTime();
    if(datePoste < dateCurrent){
      return false;
    }else{
      return true;
    }
  }

  export function compareTwoDateString(date1,date2){
    let dateA = new Date(date1).getTime();
    let dateB = new Date(date2).getTime();
    if(dateA > dateB){
      return "+";
    }else if(dateA < dateB){
      return "-";
    }else{
        return "=";
    }
  }

export function ifNumber(number){
  const regex = /^[0-9\b]+$/;
  if(regex.test(number)){
    return true;
  }
  else{
    return false;
  }
}

export function ifNumberWithDecimal(number){
  const regex = /^\d*\.?\d*$/;
  if(regex.test(number)){
    return true;
  }else{
    return false;
  }
}

export function isValidDate(value) {
  const dateWrapper = new Date(value);
  return !isNaN(dateWrapper.getDate());
}
/**
 * 
 * @param {date} value 
 * @returns Age par rapport a la date en cours
 */
export function isMajor(value){
  const years = moment().diff(value, 'years',false);
  if(years >= 18){
    return true;
  }else{
    return false;
  }
  
}