import React from "react";
import ReactDOM from "react-dom";
import NotificationContainer, {
  Props
} from "./components/NotificationContainer/index";

const show = (cfg: Props) => {
  let modalRoot = document.querySelector("body > #modal-root");
  if (!modalRoot) {
    modalRoot = document.createElement("div");
    document.body.appendChild(modalRoot);
  }

  ReactDOM.createPortal(<NotificationContainer {...cfg} />, modalRoot);
};

export default { show };
