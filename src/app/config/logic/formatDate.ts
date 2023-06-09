export const getDayName = (date: Date) => {
  const day = date.getDay();
  switch (day) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
    default:
      return "Sunday";
  }
};

export const getMonthName = (date: Date) => {
  const month = date.getMonth();
  switch (month) {
    case 0:
      return "January";
    case 1:
      return "February";
    case 2:
      return "March";
    case 3:
      return "April";
    case 4:
      return "May";
    case 5:
      return "June";
    case 6:
      return "July";
    case 7:
      return "August";
    case 8:
      return "September";
    case 9:
      return "October";
    case 10:
      return "November";
    case 11:
      return "December";
    default:
      return "Jan";
  }
};

export const getYear = (date: Date) => {
  return date.getUTCFullYear().toString().slice(2, 4);
};

export const formatDate = (date: Date) => {
  return `${date.getDate() + " " + getMonthName(date) + " " + getYear(date)}`;
};
