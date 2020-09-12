let alldata = {};

const handleSubmit =  async()  =>{

  const city = document.getElementById('destination').value;
  console.log(city)
  //------------------------------------------------------------------------------------------------
  //Step1
  const url1= `http://localhost:8081/getCoordinates?city=${city}`;
  await fetch(url1, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json()) 
  .then(async res => {
    console.log('Step1')
    alldata.population = res.population;
    alldata.lat=res.lat
    alldata.lng=res.lng
  })
  //--------------------------------------------------------------------------------------------------
 //Step2
 const url2=`http://localhost:8081/getWeather?lat=${alldata.lat}&long=${alldata.lng}`

 await fetch(url2 , {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(res => res.json()) 
.then(async res => {
  console.log('Step2')
  alldata.temperature = res.temp;
  alldata.Desc = res.description;
}) 
//----------------------------------------------------------------------------------------------------
//Step3 
const url3=`http://localhost:8081/getPhoto?q=${city}`

await fetch(url3 , {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then(res => res.json()) 
.then(res => {
  console.log('Step3')
  alldata.img = res.webformatURL;
  updateUI()
})

}


const updateUI = () => {
  document.getElementById('img_result').setAttribute('src', alldata.img);
  document.getElementById('temp_result').innerHTML = alldata.temperature;
  document.getElementById('weather_result').innerHTML = alldata.Desc;
  document.getElementById('population_result').innerHTML = alldata.population;
  document.getElementById('Length_result').innerHTML = LengthOfTrip();
}


const LengthOfTrip = () => {
  const start = new Date(document.getElementById('start').value);
  const end = new Date(document.getElementById('end').value);
  const length = end.getTime() - start.getTime();
  const length1 = length / (1000 * 60 * 60 * 24);
  //console.log(length1)
  return length1;
}


export{ handleSubmit}
