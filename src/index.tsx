import React from "react";
import { render } from "react-dom";
import NotificationContainer from "./NotificationContainer/NotificationContainer";

const cls = "simple-react-notifier";

export type Config = {
  position?: string;
  duration?: number;
  delay?: number;
  render?: any;
  replace?: boolean;
  animationTime?: number;
  containerWidth?: string;
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
  if (!cfg.render) {
    throw "Opps, nothing to render here. Specify a render function.";
  }

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

notifier.configure = (cfg: Config) => {
  globalCfg = cfg;
};

notifier.dismiss = (id?: number) => eventManager.remove(id);

export default notifier;
