const express = require('express');
const app = express();

const workingHoursMiddleware = (req, res, next) => {
  const currentDay = new Date().getDay();
  const currentHour = new Date().getHours();

  if (currentDay >= 1 && currentDay <= 7 && currentHour >= 9 && currentHour < 19) {
    next(); 
  } else {
    res.send('Sorry, the web application is only available during working hours (Monday to Friday, from 9 to 17).');
  }
};

app.use(express.static('public'));

app.use(workingHoursMiddleware);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/home.html');
});

app.get('/services', (req, res) => {
  res.sendFile(__dirname + '/public/services.html');
});

app.get('/contact', (req, res) => {
  res.sendFile(__dirname + '/public/contact.html');
});

const port = 3000;
app.listen(port, () => {
  console.log('Server running at http://localhost:3000/');
});
