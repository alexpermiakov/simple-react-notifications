import React from "react";
import { render } from "react-dom";
import NotificationContainer, {
  eventManager,
  Config
} from "./NotificationContainer/NotificationContainer";

const cls = "simple-react-notifier";

let globalCfg: Config;
let id = 0;

const notifier = (cfg?: Config) => {
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

["info", "success", "error", "warn"].forEach(
  type => (notifier[type] = (message: string) => notifier({ message, type }))
);

notifier.configure = (cfg: Config) => {
  globalCfg = cfg;
};

notifier.dismiss = (id?: number) => eventManager.remove(id);

export default notifier;
