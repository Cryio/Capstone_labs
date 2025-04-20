function fetchData(dataId, callback) {
  setTimeout(() => {
    console.log(`Fetched data for: ${dataId}`);
    callback({dataId});
  }, Math.random() * 2000);
}

fetchData('data1', (data1) => {});

fetchData('data2', (data2) => {});

fetchData('data3', (data3) => {});



var usingCallback = function(data, callback) {
    callback(data);
};

usingCallback('First data', function(data1) {
  console.log(data1);

  usingCallback('Second data', function(data2) {
    console.log(data2);

    usingCallback('Third data', function(data3) {
      console.log(data3);

      usingCallback('Fourth data', function(data4) {
        console.log(data4);
      });
    });
  });
});
