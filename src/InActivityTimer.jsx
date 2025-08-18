import { useEffect, useState } from "react";

export const InactiveTimer = ()=>{
    const [timeout,setTimeout] = useState(50000);

    const touch = window.addEventListener("keypress");
    console.log("TOUCH",touch);

    function ResetTimer(){
        
    }
}