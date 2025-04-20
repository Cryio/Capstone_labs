var function_to_Callback_to = function(data, nextCallback) {
  console.log('got data: ' + data);
  
  if (nextCallback) nextCallback();
};

var usingAsyncCallback = function(data, callback) {
  
  setTimeout(() => {
    
    callback(data + '_processed');
  }, 1000);
};

usingAsyncCallback('data1', (processedData1) => {
  function_to_Callback_to(processedData1, () => {

    usingAsyncCallback('data2', (processedData2) => {
      function_to_Callback_to(processedData2, () => {
    
        usingAsyncCallback('data3', (processedData3) => {
          function_to_Callback_to(processedData3, () => {
    
            console.log('All async operations completed.');
    
          });
        });
      });
    });
  });
});



function usingCallback(data, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, delay);
  });
}

function processData() {

  usingCallback('First data', 2000).then((data1) => {
    console.log(data1);
  });

  usingCallback('Second data', 1500).then((data2) => {
    console.log(data2);
  });

  usingCallback('Third data', 100).then((data3) => {
    console.log(data3);
  });

  usingCallback('Fourth data', 500).then((data4) => {
    console.log(data4);
  });

}

processData();

