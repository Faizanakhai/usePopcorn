import React from "react";
import ReactDOM from "react-dom/client";
// import StarRating from "./StarRating";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating
      maxRating={5}
      messages={["terrible", "Bad", "Okey", "Good", "Amazing"]}
    />
    <StarRating maxRating={10} size={60} color="Blue" defaultRating={3} /> */}
  </React.StrictMode>
);
