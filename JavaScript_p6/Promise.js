var usingPromise = function() {
    return new Promise((resolve, reject) => {
        resolve('data_hi_there_withPromise');
    });
  };
  

  usingPromise()
    .then((data) => {
      console.log('got data: ' + data);
    })
    .catch((err) => {
      console.error('Error: ' + err);
    });
  