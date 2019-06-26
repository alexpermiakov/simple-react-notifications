import React from "react";
import "./styles.css";
export declare type Props = {
    message: string;
    position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    type: "alert" | "info" | "warning";
    duration?: number;
    renderItem?: () => React.ReactNode;
};
declare const NotificationContainer: (props: Props) => JSX.Element;
export default NotificationContainer;
