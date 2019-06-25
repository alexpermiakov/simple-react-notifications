import React from "react";
import ReactDom from "react-dom";
import Hello from "../../src";

const App = () => <Hello text="Alex" />;

ReactDom.render(<App />, document.querySelector("#root"));
