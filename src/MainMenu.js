import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import Button from "@mui/material/Button";
import { Grid, Divider } from "@mui/material";

const buttonLabels = [
  "Y",
  "B",
  "A",
  "X",
  "L1",
  "R1",
  "L2",
  "R2",
  "Back",
  "Start",
  "L3",
  "R3",
  "UP",
  "DOWN",
  "LEFT",
  "RIGHT",
  "XBOX",
];

const axesLabels = [
  "X Axis",
  "Y Axis",
  "Z Axis",
  "",
  "",
  "Z Rotation",
  "",
  "",
  "",
  "POV",
];
//function MainMenu() {
//export default function MainMenu({ gamepads }) {
    export default (props) => {

  const requestRef = useRef();
   const animate = () => {
    requestRef.current = requestAnimationFrame(animate);
  };
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  });
  if (!props.gamepads) return "";
  return (
    <>
      <div  className="App">
       
        {props.gamepads.length &&
          props.gamepads.map((gp) => {
            return (
              <div     className="controller-container" hidden={props.selectedGamepad !== gp.id}>
                <div  >
                  <br />
                
                  {gp.buttons.map((button, index) => {
                    var pressed = button === 1.0;
                    var touched = false;
                    var buttonColor = "primary";
                    var buttonClass = "buttonsClass";
                    if (typeof button === "object") {
                      pressed = button.pressed;
                      if ("touched" in button) {
                        touched = button.touched;
                      }
                    }
                    if (pressed) {
                      buttonColor = "success";
                      buttonClass = "pressedButtonsClass";
                    }
                    if (touched) {
                        buttonColor = "success";
                      buttonClass = "pressedButtonsClass";
                    }
                    return (
                        
                      <Button
                        className={buttonClass}
                        variant="contained"
                        color={buttonColor}
                      >
                        <span>{buttonLabels[index]}</span>
                      </Button>
                    );
                  })}
                </div>
                <Grid container spacing={0} className="metrerDivClass">
                  {gp.axes.map((stick, index) => {
                    var e = document.createElement("meter");
                    e.className = "axis";
                    return axesLabels[index] !== "" ? (
                      <Grid xs={12}>
                        <div className="axes">
                          <span> {axesLabels[index]} : </span>
                          <span className="axisValues">
                            {(stick * 100 * -1).toFixed(2)}
                          </span>
                          <br />
                          <span  >
                          <meter
                            className="axis"
                            value={(stick * 100 * -1).toFixed(2)}
                            min="-100"
                            max="100"
                          ></meter></span>
                        </div>
                      </Grid>
                    ) : null;
                  })}
                </Grid>
              </div>
            );
          })}
 
      </div>
    </>
  );
}
