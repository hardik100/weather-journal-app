/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
let apiKey =  '5b35f9e8a4cd28f7241ee76c0b400cd0';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const postData = async ( url = '', data = {})=>{
      const response = await fetch(url, {
      method: 'POST', 
      credentials: 'same-origin',
      headers: {
          'Content-Type': 'application/json',
      },
     // Body data type must match "Content-Type" header        
      body: JSON.stringify(data), 
    });

      try {
        const newData = await response.json();
        console.log(newData);
        return newData;
      }catch(error) {
      console.log("error", error);
      }
  }
//Create an event listener for the element with the id: generate, with a callback function to execute when it is clicked.
const generate = document.getElementById('generate')
generate.addEventListener('click', performAction);

function performAction() {
    let zipCode =  document.getElementById('zip').value;
    let humanFeel = document.getElementById('feelings').value;
   openWeatherApi(baseURL, zipCode, apiKey)
   //chaining promises
   .then(function(data){
   console.log(data);
   postData('/add', {temperature: data.main.temp, date: newDate, userResponse: humanFeel});
   handleUI();
});
}
// openWeatherApi is an asynchronous function that uses fetch() to make a GET request to the OpenWeatherMap API.
const openWeatherApi = async(baseURL, zipCode, apiKey) => {
    const response = await fetch(baseURL + zipCode + '&appid=' + apiKey);
    try {
        const data = await response.json();
        return data;
    } catch(error) {
    console.log('error',error);
     }
}
//updating UI dynamically
const handleUI = async() => {
    const request = await fetch ('/all');
    try {
     const newEntry = await request.json();
     document.getElementById('date').innerHTML = newEntry.date;
     document.getElementById('temp').innerHTML = newEntry.temperature;
     document.getElementById('content').innerHTML = newEntry.userResponse;    
    }
    catch(error){
       console.log('error',error);
    }
} 
