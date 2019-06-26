import React from "react";
import "./styles.css";

type Props = {
  message: string;
  type: string;
  onClose: () => void;
};

const icons = {
  warn: "⚠",
  info: "ℹ",
  alert: "⚡"
};

const NotificationItem = ({ message, type, onClose }: Props) => (
  <div className={`notification-item ${type}`}>
    <label>{icons[type]}</label>
    <span role={type}>{message}</span>
    <button type="button" aria-label="close" onClick={onClose}>
      ✖
    </button>
  </div>
);

export default NotificationItem;
