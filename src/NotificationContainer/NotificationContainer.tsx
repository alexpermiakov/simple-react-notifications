import React, { useState, useEffect, useRef } from "react";
import { Config, eventManager } from "../index";
import "./styles.css";

const filter = (ar: JSX.Element[], id: number) =>
  ar.filter((it: JSX.Element) => it.key != id);

const Notification = ({ message, onClose, type = "info" }: any) => (
  <div className={`item ${type}`}>
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
      <Notification {...props} {...params} />
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

    items.current = [newItem, ...(props.single ? [] : items.current)];
    eventManager.add(id, () => removeItemById(id));

    setTimeout(() => setItems(items.current), delay);
    setTimeout(() => removeItemById(id), delay + autoClose + animationDuration);
  }, [props]);

  return <>{...items.current}</>;
};
