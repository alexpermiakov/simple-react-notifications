import React, { useState, useEffect } from "react";
import uuid from "uuid/v1";
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
  const [items, setItems] = useState([] as any);

  useEffect(() => {
    const itemId = uuid();
    setItems([...items, <NotificationItem key={itemId} {...props} />]);

    setTimeout(() => {
      console.log(items, itemId);
      setItems(items.filter((it: any) => it.key != itemId));
    }, props.duration || 3000);
  }, [props]);

  return <>{...items}</>;
};

export default NotificationContainer;
