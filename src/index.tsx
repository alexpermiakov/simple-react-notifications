import React from "react";
import { render } from "react-dom";
import NotificationContainer, {
  eventManager,
  Config
} from "./NotificationContainer/NotificationContainer";

type NotifierBase = (cfg?: Config) => number;

interface Notifier extends NotifierBase {
  info: (message: string) => number;
  error: (message: string) => number;
  success: (message: string) => number;
  warn: (message: string) => number;
  configure: (cfg: Config) => void;
  dismiss: (id?: number) => void;
}

const cls = "simple-react-notifier";

let globalCfg: Config;
let id = 0;

const notifier: Notifier = (cfg) => {
  cfg = { ...(globalCfg || {}), ...cfg };
  const { position = "top-right" } = cfg;
  let modalRoot = document.querySelector("." + cls + "." + position);
  if (!modalRoot) {
    modalRoot = document.createElement("div");
    modalRoot.classList.add(cls, position);
    (modalRoot as HTMLElement).style.direction = cfg.rtl ? "rtl" : "ltr";
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

notifier.info = message => notifier({ message, type: "info" });
notifier.success = message => notifier({ message, type: "success" });
notifier.error = message => notifier({ message, type: "error" });
notifier.warn = message => notifier({ message, type: "warn" });
notifier.configure = (cfg) => {
  globalCfg = cfg;
};
notifier.dismiss = (id) => eventManager.remove(id);

export default notifier;
