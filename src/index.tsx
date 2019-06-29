import React from "react";
import { render } from "react-dom";
import NotificationContainer from "./components/NotificationContainer/NotificationContainer";

const cls = "simple-react-notifier";

export type Config = {
  message?: string;
  position?: string;
  type?: string;
  duration?: number;
  delay?: number;
  render?: React.FC;
  replace?: boolean;
  animationTime?: number;
};

let id = 0;

const notifier = (cfg: Config) => {
  const position = cfg.position || "top-right";
  let modalRoot = document.querySelector("." + cls + "." + position);
  if (!modalRoot) {
    modalRoot = document.createElement("div");
    modalRoot.classList.add(cls);
    modalRoot.classList.add(position);
    document.body.appendChild(modalRoot);
  }

  const { delay = 0, duration = 3000 } = cfg;

  setTimeout(
    () =>
      modalRoot!.children.length === 0 && document.body.removeChild(modalRoot!),
    delay + duration + 300
  );

  render(<NotificationContainer {...cfg} id={id} />, modalRoot);
  id++;
  return id - 1;
};

notifier.dismiss = (id: number) => {};

notifier.dismissAll = () => {};

export default notifier;
