import { useState,useEffect } from 'react'
// import reactLogo from '/assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [error,setError] = useState("");
  const [city,setCity] = useState("");
  const [temp,setTemp] = useState("");
  const [task,setTask] = useState("bg-green-500");
  const [response,setResponse ] = useState({});
  const [currentTime,setCurrentTime] = useState("");
  const [giphy,setGif] = useState("");


  

  const weatherReport = async ()=>{
    setError(null);
    const report =  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    console.log("Report",report);
    const response = await report.json();
    setResponse(response);
    console.log(response);
    if(response.message){
      setError(response.message || "Unable to fetch");
      return;
    }
    const kelvinTemp = response.main.temp;
    console.log(kelvinTemp);
    const epoch = response.dt;
    console.log(epoch)
    const date = new Date(epoch * 1000);
    const timed = date.toLocaleString().split(",");
    console.log(timed);
    const timing = timed[1].trim();
    setCurrentTime(timing);
    

    console.log(date.toLocaleString());
    
    const celsiusTemp = (kelvinTemp - 273.15).toFixed(1) ;
    console.log("Error",error);
    console.log("celsisu Temp",celsiusTemp);
    setTemp(celsiusTemp);
  }

  useEffect(()=>{
    if(temp >= 31){
      setTask("bg-sunny");
      setGif("/assets/sunset.gif")
      
    } else if(temp <= 30 && temp>=25){
      setTask("bg-sunset");
      
    }else{
      setTask("bg-rainy");
      
    }
  },[temp])

  useEffect(()=>{
    const isHour = currentTime.split(":");
    const isHourTime = parseInt(isHour[0]);
    if (currentTime.includes("pm") &&
     (isHourTime >=4 && isHourTime <= 8)){
      setGif("/assets/sunset.gif");
    }
    else if (currentTime.includes("am") &&
     (isHourTime>=4 && isHourTime <= 11)){
      setGif("/assets/sunrise.gif");
    } else if(currentTime.includes("pm")){
      setGif("/assets/68F.gif");
    } 
    else {
      setGif("/assets/moon.gif");
    }

  },[currentTime]);

//   useEffect(() => {
//   const hour = parseInt(currentTime.split(":")[0]);
//   const isPM = currentTime.toLowerCase().includes("pm");
//   const isAM = currentTime.toLowerCase().includes("am");

//   if (isAM && hour >= 4 && hour <= 11) {
//     setGif("/assets/sunrise.gif"); // Morning
//   } else if (isPM && hour >= 4 && hour <= 8) {
//     setGif("/assets/sunset.gif"); // Evening
//   } else if (isPM && (hour >= 12 && hour < 16)) {
//     setGif("/assets/68F.gif"); // Afternoon
//   } else {
//     setGif("/assets/moon.gif"); // Night
//   }
// }, [currentTime]);



  // const taskCard = ({task}) =>{
  //   const bgColor = {
  //     sunny:"bg-sunny",
  //     rainy:"bg-rainy",
  //     sunset:"bg-sunset"
  //   }


  // }

  return (
    <div className={`h-screen  flex flex-col items-center justify-center ${task}`}>
     <img src = {giphy || "/assets/sunset.gif"} alt="Sunset Animation" className="h-100"/>
      <label className="sr" />
      <input
      placeholder='Enter the city Name'
      className="p-3 m-3 w-full bg-green-200 rounded-sm"
      name="city"
      value={city}
      onChange={(e)=>{
        setCity(e.target.value)
      }}
       />
       <button
       className="bg-yellow-200 p-2 w-full m-3 " 
       onClick={weatherReport}>Click Me </button>

       {error && <h3 className="text-red-500">{error}</h3>} 
       { temp>0 &&
        <h2 className =" text-blue-500 bg-yellow-200 rounded-xl font-mono p-3">{`Temperture of the ${response.name}  in celsisus is  ${temp}° in Current Time ${currentTime}` }</h2>
       }
      
    </div>
  )
}

export default App
