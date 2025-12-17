import React from "react";
import "./Button.css";

export default function Button({ handleClick, label, type }) {
  return (
    <button
      type={type || "button"}
      className="button-3d"
      onClick={handleClick}
    >
      {label}
    </button>
  );
}