import React from "react";
import "./styles.css";

type Props = {
  message?: string;
  type?: string;
  animationDelay?: string;
  animationDuration?: string;
  onClose?: () => void;
};

export default ({
  message,
  type = "info",
  onClose,
  animationDelay,
  animationDuration
}: Props) => (
  <div
    className={`notification-item ${type}`}
    style={{
      animationDelay,
      animationDuration
    }}
  >
    <span role={type}>{message}</span>
    <button onClick={onClose}>✖</button>
  </div>
);
