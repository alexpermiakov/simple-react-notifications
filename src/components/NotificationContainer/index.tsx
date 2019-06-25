import React, { useState, useEffect } from "react";
import NotificationItem from "../NotificationItem/index";

export type Props = {
  message: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  type: "alert" | "info" | "warning";
  autoClose?: number;
  renderItem?: () => React.ReactNode;
};

const NotificationContainer = (props: Props) => {
  const [items, setItems] = useState([] as any);
  useEffect(() => setItems(<NotificationItem {...props} />));

  return <div className="notification-container">{...items}</div>;
};

export default NotificationContainer;
