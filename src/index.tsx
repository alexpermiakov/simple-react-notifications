import React from "react";
import { render } from "react-dom";
import NotificationContainer from "./NotificationContainer/NotificationContainer";

const cls = "simple-react-notifier";

type Animation = {
  in?: string;
  out?: string;
  duration?: number;
  timingFunction?: string;
};

export type Config = {
  message?: string;
  type?: string;
  position?: string;
  autoClose?: number;
  delay?: number;
  render?: any;
  single?: boolean;
  containerWidth?: string;
  animation?: Animation;
};

let id = 0;

type EventArg = {
  id: number;
  callback: () => void;
};

export const eventManager = {
  ids: [] as EventArg[],
  add: function(id: number, callback: () => void) {
    this.ids.push({ id, callback });
  },
  remove: function(id?: number) {
    if (id) {
      const { callback } = this.ids.find(it => it.id === id)!;
      callback();
      this.ids = this.ids.filter(it => it.id !== id);
    } else {
      this.ids.forEach(it => it.callback());
      this.ids = [];
    }
  }
};

let globalCfg: Config;

const notifier = (cfg?: Config) => {
  cfg = { ...(globalCfg || {}), ...cfg };
  const { position = "top-right", containerWidth = "320px" } = cfg;
  let modalRoot = document.querySelector("." + cls + "." + position);
  if (!modalRoot) {
    modalRoot = document.createElement("div");
    modalRoot.classList.add(cls, position);
    (modalRoot as HTMLElement).style.width = containerWidth;
    document.body.appendChild(modalRoot);
  }

  render(
    <NotificationContainer
      {...cfg}
      id={id}
      cleared={() => {
        try {
          document.body.removeChild(modalRoot!);
        } catch (e) {}
      }}
    />,
    modalRoot
  );

  id++;
  return id - 1;
};

// ["info", "success", "error"].forEach(
//   type =>
//     (notifier[type] = (message: string) => {
//       notifier({ message, type });
//     })
// );

notifier.success = (message: string) => notifier({ message, type: "success" });
notifier.error = (message: string) => notifier({ message, type: "error" });

notifier.configure = (cfg: Config) => {
  globalCfg = cfg;
};

notifier.dismiss = (id?: number) => eventManager.remove(id);

export default notifier;
