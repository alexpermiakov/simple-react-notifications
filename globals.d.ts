type Config = {
  message: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  type: "alert" | "info" | "warning";
  duration?: number;
};