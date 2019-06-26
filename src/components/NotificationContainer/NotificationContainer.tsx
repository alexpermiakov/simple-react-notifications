import React, { useState, useEffect, useRef } from "react";
import NotificationItem from "../NotificationItem/NotificationItem";
import "./styles.css";

const filter = (ar: JSX.Element[], id: number) =>
  ar.filter((it: JSX.Element) => it.key != id);

const animationTime = 300;

const NotificationContainer = (props: Config) => {
  const [, setItems] = useState([] as JSX.Element[]);
  // we have to use ref here instead of items from the useState above,
  // otherwise in setTimeout we will access the same items from
  // the clojure, but we need the latest results
  const latestItems = useRef([] as JSX.Element[]);
  const duration = props.duration || 3000;

  const onItemClose = (id: number) => {
    latestItems.current = filter(latestItems.current, id);
    setItems(latestItems.current);
  };

  useEffect(() => {
    const itemId = latestItems.current.length;
    latestItems.current = [
      <NotificationItem
        key={itemId}
        message={props.message}
        type={props.type}
        animationDelay={duration - animationTime + "ms"}
        animationDuration={animationTime + "ms"}
        onClose={() => onItemClose(itemId)}
      />,
      ...latestItems.current
    ];

    setItems(latestItems.current);

    setTimeout(() => {
      latestItems.current = filter(latestItems.current, itemId);
      setItems(latestItems.current);
    }, duration);
  }, [props]);

  return <>{...latestItems.current}</>;
};

export default NotificationContainer;
