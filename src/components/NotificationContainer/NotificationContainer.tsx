import React, { useState, useEffect, useRef } from "react";
import NotificationItem from "../NotificationItem/NotificationItem";
import "./styles.css";

export type Props = {
  message: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  type: "alert" | "info" | "warning";
  duration?: number;
};

const filter = (ar: React.ReactNodeArray, id: number) =>
  ar.filter((it: any) => it.key != id);

const NotificationContainer = (props: Props) => {
  const [, setItems] = useState([] as any);
  // we have to use ref here instead of items from the useState above,
  // otherwise in setTimeout we will access the same items from
  // the clojure, but we need the latest results
  const latestItems = useRef([] as any);

  const onItemClose = (id: number) => {
    console.log(id, latestItems.current);
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
        onClose={() => onItemClose(itemId)}
      />,
      ...latestItems.current
    ];

    setItems(latestItems.current);

    setTimeout(() => {
      latestItems.current = filter(latestItems.current, itemId);
      setItems(latestItems.current);
    }, props.duration || 3000);
  }, [props]);

  return <>{...latestItems.current}</>;
};

export default NotificationContainer;
