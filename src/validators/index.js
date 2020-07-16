import moment from 'moment';

export const isValidExperience = (
  newStartDate,
  newEndDate = moment().format('YYYY-MM-DD'),
  startDate,
  endDate = moment().format('YYYY-MM-DD'),
) => (
  (
    moment(newStartDate).isBefore(startDate) && moment(newEndDate).isBefore(startDate)
  )
      || (
        moment(newStartDate).isAfter(endDate) && moment(newEndDate).isAfter(endDate)
      )
);

export const isFutureDate = (startDate, endDate) => (
  moment().isBefore(startDate)
  || moment().isBefore(endDate)
);

export const isValidPasportId = (id) => (/[a-zA-Z]{2}[0-9]{7}/.test(id) ? '' : 'Passport is not valid.');

export const isValidEmail = (email) => {
  const reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\\.])+\.([A-Za-z]{2,4})$/;
  return reg.test(email) ? '' : 'Email is not valid.';
};

export const isOnlyLetters = (str) => (
  str.length > 2
    ? (
      /^[a-zA-Z]+$/.test(str)
        ? '' : 'name should be in letters only'
    )
    : 'value cannot be less than 3 characters');

export const isTeenager = (birthdate) => (moment().diff(birthdate, 'years') < 18 ? 'age must be more than 18 years' : '');

export const isValidPassword = (password) => (password && password.length > 3 ? '' : 'passport cannot be less than 4 characters');
