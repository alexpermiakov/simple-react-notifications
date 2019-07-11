import React, { useState, useEffect, useRef } from "react";
import "./styles.css";

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
  onlyLast?: boolean;
  width?: string;
  animation?: Animation;
  newestOnTop?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  rtl?: boolean;
};

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

const filter = (ar: JSX.Element[], id: number) =>
  ar.filter((it: JSX.Element) => it.key != id);

const Notification = ({
  message,
  onClose,
  type = "info",
  width = "300px",
  rtl
}: any) => (
  <div
    className={`item ${type}`}
    style={{ width, direction: rtl ? "rtl" : "ltr" }}
  >
    <span>{message}</span>
    <button onClick={onClose}>✖</button>
  </div>
);

export default (props: Config & { id: number; cleared: () => void }) => {
  const [, setItems] = useState([] as JSX.Element[]);
  const items = useRef([] as JSX.Element[]);
  const { autoClose = 3000, delay = 0, id } = props;

  const removeItemById = (id: number) => {
    items.current = filter(items.current, id);
    setItems(items.current);
    items.current.length === 0 && props.cleared();
  };

  useEffect(() => {
    const params = { id, onClose: () => removeItemById(id) };
    let newItem = props.render ? (
      props.render(params)
    ) : (
      <Notification {...props} {...params} key={id} />
    );
    const { animation = {} } = props;
    const animationDuration = animation.duration || 300;

    if (animation.in || animation.out) {
      newItem = (
        <div
          key={id}
          style={{
            animationName: `${animation.in}, ${animation.out}`,
            animationDelay: `0ms, ${delay + autoClose}ms`,
            animationDuration: `${animationDuration}ms, ${animationDuration}ms`
          }}
        >
          {newItem}
        </div>
      );
    }

    const rest = props.onlyLast ? [] : items.current;
    const { newestOnTop = true } = props;
    items.current = newestOnTop ? [newItem, ...rest] : [...rest, newItem];

    eventManager.add(id, () => removeItemById(id));

    setTimeout(() => setItems(items.current), delay);
    autoClose &&
      setTimeout(
        () => removeItemById(id),
        delay + autoClose + animationDuration
      );
  }, [props]);

  return <>{...items.current}</>;
};
