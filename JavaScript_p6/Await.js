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

  




function usingCallback(data, delay) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, delay); 
    });
  }
  
  async function processData() {
    try {

      const data1 = await usingCallback('First data', 2000);
      console.log(data1);
  
      const data2 = await usingCallback('Second data', 1500);
      console.log(data2);
  
      const data3 = await usingCallback('Third data', 100);
      console.log(data3);
  
      const data4 = await usingCallback('Fourth data', 500);
      console.log(data4);
  
      console.log("All data fetched successfully!");
  
    } catch (error) {
      console.log('Error:', error);
    }
  }
  
  processData();
    