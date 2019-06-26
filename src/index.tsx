import React from "react";
import { render } from "react-dom";
import NotificationContainer, {
  Props
} from "./components/NotificationContainer/NotificationContainer";

const id = "simple-react-notifier";

const show = (cfg: Props) => {
  let modalRoot = document.getElementById(id);
  if (!modalRoot) {
    modalRoot = document.createElement("div");
    modalRoot.id = id;
    document.body.appendChild(modalRoot);
  }
  render(<NotificationContainer {...cfg} />, modalRoot);
};

export default show;
