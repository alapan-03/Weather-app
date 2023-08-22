import { useState } from "react";
import React from "react";
import Cloud1 from "./cloud1.jpg";
import icon1 from "./icon1.gif";
import cloud1 from "./cloud1 (2).jpg";
import { SunMedium, Moon } from "lucide-react";

export default function Card(props) {
  const weatherData = props.stateOfTemp;
  console.log("wd = "+weatherData)
  console.log("descccc = "+weatherData.main)
  const time = props.state2;

  const forecastTime = new Date().getHours();
  const isNightTime = forecastTime >= 19 || forecastTime < 6;


  return (
    <>
      <div
        class="mt-1 text-center container card-box"
        style={{
          width: "40rem",
          height: "25.7rem",
          position: "relative",
          left: "4.3rem",
        }}
      >
        <div
          className="text-center pt-3 placeholder"
          style={{ position: "relative", top: "7rem", left: "9rem" }}
        ></div>

        <div
          className="mt-5"
          style={{
            width: "30rem",
            height: "10rem",
            background: !isNightTime?"linear-gradient(to right, white, #faf8e3, #fcf3ac)": "linear-gradient(to right, white, rgba(6, 28, 150, 0.2), rgba(6, 28, 150, 0.4)",
            boxShadow: ".1rem .1rem .2rem",
            borderRadius: "20px",
          }}
        >
          {
          !isNightTime?
          <SunMedium
            size={32}
            strokeWidth={1.5}
            size={62}
            style={{ position: "relative", left: "9.5rem", top: "2.8rem" }}
          />: <Moon size={62} style={{position: "relative", left: "9.5rem", top: "2.8rem" }}/>
}
          <p
            class="card-title"
            style={{
              position: "relative",
              top: "-1.6rem",
              left: "-9rem",
              color: "black",
              fontSize: "40px",
            }}
          >
            {weatherData.main && weatherData.main.temp.toFixed(0)} °C{" "}
            <p style={{ fontSize: "18px", color: "grey" }}>{props.stateOfCity}</p>
          </p>
          {/* {console.log("ff = "+weatherData.main)} */}
        </div>

        <div class="card-body"></div>
      </div>
    </>
  );
}
