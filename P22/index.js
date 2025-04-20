const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('employee'); 
});

app.post('/', (req, res) => {
  const { name, address, city, gender } = req.body;
  let vehicles = req.body.vehicles || [];
  if (!Array.isArray(vehicles)) {
    vehicles = [vehicles];
  }  

  // let vehicles;
  // if (req.body.vehicles) {
  //   vehicles = req.body.vehicles;
  // } else {
  //   vehicles = [];
  // }
  //   if (!Array.isArray(vehicles)) {
  //   vehicles = [vehicles];
  // }
  
  res.render('result', { name, address, city, gender, vehicles });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
