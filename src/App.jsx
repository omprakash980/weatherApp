import { useState,useEffect,useContext } from 'react'
// import reactLogo from '/assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css';
import { InactiveTimer } from "./InActivityTimer";


function App() {

  const [error,setError] = useState("");
  const [color,setColor] = useState("")
  const [city,setCity] = useState("");
  const [temp,setTemp] = useState("");
  const [task,setTask] = useState("bg-green-500");
  const [response,setResponse ] = useState({});
  const [currentTime,setCurrentTime] = useState("");
  const [giphy,setGif] = useState("");
  const [warning,setwarning] = useState("");
  const [eventtype,setEventtype] = useState("");
  // console.log("Weather App got Started");
  // const [warning,setwarning] = useState("");
  // const [eventtype,setEventtype] = useState("");


  
  <InactiveTimer />

  // useEffect(()=>{
  //   const handleActivity = () =>//console.log("Event");
  //   window.addEventListener("mousemove",handleActivity);

  //   return ()=> window.removeEventListener("mousemove",handleActivity);
  // },[]);

  

  const weatherReport = async ()=>{
    setError(null);
    const report =  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    // loconsole.g("Report",report);
    const response = await report.json();
    setResponse(response);
    //console.log(response);
    if(response.message){
      setError(response.message || "Unable to fetch");
      return;
    }
    const kelvinTemp = response.main.temp;
    //console.log(kelvinTemp);
    const epoch = response.dt;
    //console.log(epoch)
    const date = new Date(epoch * 1000);
    const timed = date.toLocaleString().split(",");
    //console.log(timed);
    const timing = timed[1].trim();
    setCurrentTime(timing);
    

    //console.log(date.toLocaleString());
    
    const celsiusTemp = (kelvinTemp - 273.15).toFixed(1) ;
    //console.log("Error",error);
    //console.log("celsisu Temp",celsiusTemp);
    setTemp(celsiusTemp);
  }

  useEffect(()=>{
    if(temp >= 31){
      setTask("bg-sunny");
      //console.log("hot");
      
    } else if(temp <= 30 && temp>=25){
      setTask("bg-sunset");
      //console.log("Jndkdm");
      
    }else{
      setGif("/assets/rain.gif");
      setTask("bg-rainy");
      
    }
  },[temp]);

 


  useEffect(() => {
  const hour = parseInt(currentTime.split(":")[0]);
  const isPM = currentTime.toLowerCase().includes("pm");
  const isAM = currentTime.toLowerCase().includes("am");
  if((isPM || isAM ) && response.weather[0].description.includes("rain")) {

    setGif("/assets/rain.gif"); // Night
  }else if (isAM && hour >= 4 && hour <= 11) {

    setGif("/assets/sunrise.gif"); // Morning
  } else if (isPM && hour >= 4 && hour <= 8 ) {
    setGif("/assets/sunset.gif"); // Evening
  } else if ((isPM && (hour >= 12 && hour < 16)) ) {
    setGif("/assets/68F.gif"); // Afternoon
  } else{
    setGif("/assets/moon.gif")
  }
}, [currentTime]);



  // const taskCard = ({task}) =>{
  //   const bgColor = {
  //     sunny:"bg-sunny",
  //     rainy:"bg-rainy",
  //     sunset:"bg-sunset"
  //   }


  // }${task}

  return (
    <div className={`h-screen  flex flex-col items-center justify-center ${color ? color : task}`}>
     <img src = {giphy || "/assets/sunset.gif"} alt="Sunset Animation" className="h-60"/>
      <label className="sr" />
      <input
      placeholder='Enter the city Name'
      className="text-center p-3 m-3 w-150 bg-green-200 rounded-sm  "
      // className="transition-all duration-300 focus:w-1/2 w-1/4 p-2 border border-gray-300 rounded"
      name="city"
      value={city}
      onChange={(e)=>{
        setCity(e.target.value)
      }}
       />
       <button
       className="bg-yellow-200 p-2 w-100 m-3 " 
       onClick={weatherReport}>Click Me </button>

       {error && <h3 className="text-red-500">{error}</h3>} 
       { temp>0   && (
        <div className="w-200   rounded-xl pt-5 bg-green-200">
         
        <div className="flex justify-around w-full   p-5">
            <div>
             <h3 className="text-xl ">City Name:</h3>
             <h3 className="pl-3 pt-1 text-xl">{response.name}</h3>
          </div>
          <div>
            <h3 className="text-xl">Temperature</h3>
            <h3 className="text-2xl ">{temp}°C</h3>
          </div>
        </div>
         <div className="flex  justify-around w-full   p-5">
        
          <div className="text-xl">
             <h3>City Forecast</h3>
             <h3>{response.weather[0].description}</h3>
          </div>

          <div className="text-xl">
             <h3>TIME</h3>
             <h3>{currentTime}</h3>
          </div>
         
         
        </div>
        
        </div>
       )}
      
    </div>
  )
}

export default App
