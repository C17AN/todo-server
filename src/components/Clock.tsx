import React, { useState } from "react";
import "../assets/css/main.css";

interface Props {}

const Clock = (props: Props) => {
  const [time, settime] = useState(new Date().toLocaleString());
  return <div className="clock">{time}</div>;
};

export default Clock;
