### Installation

    npm install simple-react-notifier

### Add the code below in your project

    import show from "simple-react-notifier";
    import "simple-react-notifier/dist/index.css";

### Now you can call it like that

    show({
        type: "info",
        message: "Your message",
        position: "top-right",
        duration: 3000
    });
