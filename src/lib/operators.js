import * as _ from 'lodash';

export const validateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const validatePassword = (password) => {
  var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(String(password));
}

export const validatePrice = (price) => {
  var re = /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
  return re.test(String(price));
}

export const getPopularResources = (resources) => {
  return _.sortBy(resources, "average_rating").slice(0, 4)
}

export const getRatingCounts = (ratingData) => {
  let count = 0;
  ratingData.map((rating) => {
    count += rating.count;
    return true;
  })
  return count;
}

export const getArrayFromStringWithComma = (str) => {
  if(str === undefined) return [];
  let res = [];
  str.split(',').map((item) => {
    res.push(item);

    return true;
  })
  return res;
}

export const getYearList = (minYear = 1960) => {
  const CY = new Date().getFullYear();
  let yearList = [];
  for(let i = CY; i > minYear; i--){
    yearList = yearList.concat([i.toString()]);
  }
  return yearList;
}

export const generateOptions = (list) => {
  let result = [];
  list.map((value) => {
    result.push({label: value, value});

    return true;
  })
  return result;
}

export const generateOptionValue = (str) => {
  if(str === '') return '';
  return {
    label: str,
    value: str
  }
}

export const validateQuestion = (questions, category, key, forborder = true) => {
  if(!questions.submitted && forborder) return true;
  const value = questions[category][key];
  const valueType = typeof value;
  if(valueType === 'number') return true;
  if(valueType === 'string' && value.length > 0) return true;
  if(valueType === 'object' && validateObject(value)) return true;
  return false;
}

export const validateObject = (obj) => {
  let count1 = 0;
  if(obj.length === 0) return false;
  if(obj.length === undefined){
    if(Object.keys(obj).length === 0) return false;
    return true;
  } else {
    obj.map((data) => {
      const dataType = typeof data;
      if(dataType === 'string' && data.length === 0) return true;
      if(dataType === 'number' && data === 0) return true;
      let count2 = 0;
      Object.keys(data).map((key) => {
        const value = data[key];
        const valueType = typeof value;
        if(valueType === 'string' && value.length === 0) return true;
        if(valueType === 'number' && value === 0) return true;
        count2++;

        return true;
      })
      if(count2 === Object.keys(data).length) count1++;

      return true;
    })
    if(count1 === obj.length) return true;
    else return false;
  }
}

export const addCommas = (nStr) => {
  nStr += '';
  var x = nStr.split('.');
  var x1 = x[0];
  var x2 = x.length > 1 ? '.' + x[1] : '';
  var rgx = /(\d+)(\d{3})/;
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2');
  }
  return x1 + x2;
}

export const removeCommas = (nStr) => {
  return parseFloat(nStr.replace(/,/g,''));
}
