import React from "react";
import "./styles.css";

type Props = {
  message: string;
  type?: string;
  animationDelay?: string;
  animationDuration?: string;
  onClose?: () => void;
};

const icons = {
  warning: "⚠",
  info: "ℹ",
  alert: "⚡"
};

const NotificationItem = ({
  message,
  type = "info",
  onClose = () => {},
  animationDelay = "0ms",
  animationDuration = "0ms"
}: Props) => (
  <div
    className={`notification-item ${type}`}
    style={{
      animationDelay,
      animationDuration
    }}
  >
    <label>{icons[type]}</label>
    <span role={type}>{message}</span>
    <button type="button" aria-label="close" onClick={onClose}>
      ✖
    </button>
  </div>
);

export default NotificationItem;
