import React from "react";
import { render } from "react-dom";
import NotificationContainer from "./components/NotificationContainer/NotificationContainer";

const id = "simple-react-notifier";

export type Config = {
  message: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  type?: "alert" | "info" | "warning";
  duration?: number;
};

const show = (cfg: Config) => {
  let modalRoot = document.getElementById(id);
  if (!modalRoot) {
    modalRoot = document.createElement("div");
    modalRoot.id = id;
    modalRoot.className = cfg.position || "top-right";
    document.body.appendChild(modalRoot);
  }
  render(<NotificationContainer {...cfg} />, modalRoot);
};

export default show;
