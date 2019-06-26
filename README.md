### Installation

    npm install simple-react-notifier

### How to use

    Add the code below in your project:
    import show from "simple-react-notifier";
    import "simple-react-notifier/dist/index.css";

    Now you can call like that:
    show({
        type: "info",
        message: "Your message",
        position: "top-right",
        duration: 3000
    })
