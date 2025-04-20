function usingCallback(data) {
    return new Promise((resolve, reject) => {
          if (data) {
            resolve(data);
          } else {
            reject('No data provided');
          }
      });
    }
  
  usingCallback('First data')
    .then((data1) => {
      console.log(data1);
      return usingCallback('Second data');
    })
    .then((data2) => {
      console.log(data2);
      return usingCallback('Third data');
    })
    .then((data3) => {
      console.log(data3);
    })
    .catch((error) => {
      console.log('Error:', error);
    });
  