import React, { useState, useEffect, useRef } from "react";
import { Config, eventManager } from "../index";
import "./styles.css";

const filter = (ar: JSX.Element[], id: number) =>
  ar.filter((it: JSX.Element) => it.key != id);

export default (props: Config & { id: number; cleared: () => void }) => {
  const [, setItems] = useState([] as JSX.Element[]);
  const items = useRef([] as JSX.Element[]);
  const { duration = 3000, delay = 0, id } = props;

  const removeItemById = (id: number) => {
    items.current = filter(items.current, id);
    setItems(items.current);
    items.current.length === 0 && props.cleared();
  };

  useEffect(() => {
    items.current = [
      props.render({ id, onClose: () => removeItemById(id) }),
      ...(props.replace ? [] : items.current)
    ];

    eventManager.add(id, () => removeItemById(id));

    setTimeout(() => setItems(items.current), delay);
    setTimeout(() => removeItemById(id), delay + duration);
  }, [props]);

  return <>{...items.current}</>;
};
