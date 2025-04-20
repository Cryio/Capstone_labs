function usingCallback(data, callback) {
    callback(data);
  }
  
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

  console.log("All async operations completed with Callback hell.");


  function usingCallback(data) {
    return new Promise((resolve) => {
      resolve(data);
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
      return usingCallback('Fourth data');
    })
    .then((data4) => {
      console.log(data4);
    })
    .catch((error) => {
      console.log('Error:', error);
    });

    console.log("All async operations completed with Promise.");

    


function usingCallback(data, delay) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, delay); 
    });
  }
  
  async function processData() {
    try {
      console.log("Starting to fetch data...");
  
      const data1 = await usingCallback('First data', 1000);
      console.log(data1);
  
      const data2 = await usingCallback('Second data', 1500);
      console.log(data2);
  
      const data3 = await usingCallback('Third data', 2000);
      console.log(data3);
  
      const data4 = await usingCallback('Fourth data', 2500);
      console.log(data4);
  
      console.log("All data fetched successfully!");
  
    } catch (error) {
      console.log('Error:', error);
    }
  }
  
  processData();
  
  console.log("Waiting for async operations to complete...");
  