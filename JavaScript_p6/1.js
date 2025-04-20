function example(arg) {
    if (arg === undefined) {
      console.log(arg);
    } else if (arg === null) {
      console.log(arg);
    } else {
      console.log(arg);
    }
  }
  
  example();      
  example(null);  
  example(42);    

  
  const timeoutId = setTimeout(() => {
    console.log("This runs after 3 seconds");
  }, 3000);
  
timeoutId

  const intervalId = setInterval(() => {
    console.log("runs every 2 seconds");
  }, 2000);
  

  const product = {
    id: 101,
    name: "Laptop",
    price: 1000
  };
  
  product.discount = 10;
  product.price = 900;
  
  console.log(product);
  console.log(product.name);

  