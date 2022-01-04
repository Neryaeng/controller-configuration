import React, { useEffect, useRef, useState } from "react";
import   { publish } from "./Pubsub";
import { useGamepads } from "react-gamepads";

 export default function ControlManager() { 
  const [gamepads, setGamepads] = useState([]);
   useGamepads((_gamepads) => {
      setGamepads(Object.values(_gamepads));
    });
 
    useEffect(() => {
    //console.log("controlManager.js");
     // console.log(gamepads);
      publish("alertTopic",gamepads);
      //console.log("DONE");
    }, [gamepads]);  
 /* return(npm
 <div className="SomeComponent">
    <button onClick={() => publish("alertTopic",gamepads)}>
      Click Me!!!!!!
    </button>
  </div>    )  */
 
}