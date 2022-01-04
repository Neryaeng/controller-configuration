import React, { useEffect, useRef, useState } from "react";
import { Component } from "react";
import { Subject } from "rxjs";
import { filter } from "rxjs/operators";
import ConfigurationMenu from "./ConfigurationMenu";

const mainSubject = new Subject();
// This function is used to publish gamepads to the Subject via next().
export const publish = (topic, gamepads) => {
  mainSubject.next({ topic, gamepads });
};
export default function Subscriber() {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  //let unsub = null;
  const [gamepads, setGamepads] = useState([]);
  const [topic, setTopic] = useState("alertTopic");
  useEffect(() => {  
    let unsub = mainSubject
      .pipe(filter((f) => f.topic === topic))
      .subscribe((s) => setGamepads(s.gamepads));

    return () => unsub.unsubscribe(); // < unsub on unmount
  }, [gamepads.length]);
return(
  <div><ConfigurationMenu gamepads={gamepads} /></div>
);
}