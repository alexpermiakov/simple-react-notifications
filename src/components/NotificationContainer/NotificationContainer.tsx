import React, { useState, useEffect, useRef } from "react";
import NotificationItem from "../NotificationItem/NotificationItem";
import "./styles.css";

export type Props = {
  message: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  type: "alert" | "info" | "warning";
  duration?: number;
  renderItem?: () => React.ReactNode;
};

const NotificationContainer = (props: Props) => {
  const [, setItems] = useState([] as any);
  // we have to use ref here instead of items from the useState above,
  // otherwise in setTimeout we will access the same items from
  // the clojure, but we need the latest results
  const latestItems = useRef([] as any);

  useEffect(() => {
    const itemId = latestItems.current.length;
    latestItems.current = [
      <NotificationItem key={itemId} {...props} />,
      ...latestItems.current
    ];

    setItems(latestItems.current);

    setTimeout(() => {
      latestItems.current = latestItems.current.filter(
        (it: any) => it.key != itemId
      );
      setItems(latestItems.current);
    }, props.duration || 3000);
  }, [props]);

  return <>{...latestItems.current}</>;
};

export default NotificationContainer;
