import React, { useState, useEffect, useRef } from "react";
import { Config } from "../../index";
import DefaultNotificationItem from "../NotificationItem/NotificationItem";
import "./styles.css";

const filter = (ar: JSX.Element[], id: number) =>
  ar.filter((it: JSX.Element) => it.key != id);

export default (props: Config & { id: number }) => {
  const [, setItems] = useState([] as JSX.Element[]);
  const latestItems = useRef([] as JSX.Element[]);
  const { duration = 3000, delay = 0, animationTime = 300, id } = props;

  const onItemClose = (id: number) => {
    latestItems.current = filter(latestItems.current, id);
    setItems(latestItems.current);
  };

  const NewItem = props.render || DefaultNotificationItem;

  useEffect(() => {
    latestItems.current = [
      <NewItem
        key={id}
        message={props.message || ""}
        type={props.type}
        animationDelay={duration - animationTime + "ms"}
        animationDuration={animationTime + "ms"}
        onClose={() => onItemClose(id)}
      />,
      ...(props.replace ? [] : latestItems.current)
    ];

    setTimeout(() => setItems(latestItems.current), delay);

    setTimeout(() => {
      latestItems.current = filter(latestItems.current, id);
      setItems(latestItems.current);
    }, delay + duration);
  }, [props]);

  return <>{...latestItems.current}</>;
};
