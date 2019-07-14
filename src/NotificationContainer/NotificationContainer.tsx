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
      const { callback } = this.ids.find((it: any) => it.id === id)!;
      callback();
      this.ids = this.ids.filter((it: any) => it.id !== id);
    } else {
      this.ids.forEach((it: any) => it.callback());
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
  rtl,
  closeOnClick,
  onMouseEnter,
  onMouseLeave
}: any) => (
  <div
    className={`item ${type} ${rtl ? "rtl" : "ltr"}`}
    style={{ width }}
    onClick={() => closeOnClick && onClose()}
    onMouseEnter={onMouseEnter}
    onMouseLeave={onMouseLeave}
  >
    <span>{message}</span>
    <button onClick={onClose}>✖</button>
  </div>
);

const timers: any = {};

function Timer(callback: Function, delay: number) {
  let timerId = -1,
    start = 0;
  this.remaining = delay;

  this.pause = () => {
    clearTimeout(timerId);
    this.remaining -= Date.now() - start;
  };

  this.resume = () => {
    start = Date.now();
    clearTimeout(timerId);
    timerId = setTimeout(callback, this.remaining);
  };

  this.resume();
}

export default (props: Config & { id: number; cleared: () => void }) => {
  const [, setItems] = useState([] as JSX.Element[]);
  const [hovered, setHovered] = useState(false);
  const [dismissedByClick, setDismissedByClick] = useState(false);
  const items = useRef([] as JSX.Element[]);
  const { autoClose = 3000, delay = 0, id } = props;
  const { animation = {} } = props;
  const animationDuration = animation.duration || 300;
  const closeTime = autoClose ? autoClose : 1e9;

  const removeItemById = (id: number) => {
    items.current = filter(items.current, id);
    setItems(items.current);
    items.current.length === 0 && props.cleared();
  };

  useEffect(() => {
    const index = items.current.findIndex((it: JSX.Element) => it.key == id);
    const el = items.current[index];
    if (!el) {
      return;
    }

    const t = timers[id].remaining;
    const style =
      hovered && !dismissedByClick
        ? {}
        : {
            animationName: `${animation.out}`,
            animationDelay: `${t - animationDuration}ms`,
            animationDuration: `${animationDuration}ms`
          };

    const cloned = React.cloneElement(el, {
      ...el.props,
      style
    });

    items.current.splice(index, 1, cloned);
    setItems([...items.current]);
  }, [hovered, dismissedByClick]);

  useEffect(() => {
    const params = {
      id,
      onClose: () => {
        setTimeout(() => removeItemById(id), animationDuration);
        timers[id].remaining = animationDuration;
        setDismissedByClick(true);
      },
      onMouseEnter: () => f("pause"),
      onMouseLeave: () => f("resume")
    };

    const f = (action: string) => {
      props.pauseOnHover && timers[id] && timers[id][action]();
      setHovered(action === "pause");
    };

    let newItem = props.render ? (
      props.render(params)
    ) : (
      <Notification {...props} {...params} />
    );

    if (animationDuration) {
      newItem = (
        <div
          key={id}
          style={{
            animationName: `${animation.in}, ${animation.out}`,
            animationDelay: `0ms, ${closeTime}ms`,
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

    timers[id] = new (Timer as any)(
      () => autoClose && removeItemById(id),
      delay + autoClose + animationDuration
    );
  }, [props]);

  return <>{...items.current}</>;
};
