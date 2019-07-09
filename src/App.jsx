import React from "react";
import styled from "styled-components";
import GithubIcon from "./GithubIcon";

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Pre = styled.pre`
  background-color: #f6f8fa;
  border-radius: 3px;
  font-size: 85%;
  line-height: 1.45;
  overflow: auto;
  padding: 16px;
`;

const Settings = styled.section.attrs({ className: "columns" })`
  max-width: 960px;
  margin: 0 auto;
`;

const getPrintedCode = (options, n = 1) => {
  let text = "";
  let { length } = Object.keys(options);
  let i = 0;
  for (let k in options) {
    let comma = i++ < length - 1 ? "," : "";
    let val = options[k];
    const offset = "  ".repeat(n);
    let pval = typeof val === "string" ? `"${val}"` : val;
    pval =
      typeof pval === "object"
        ? `{\n${getPrintedCode(pval, n + 1)}${offset}}`
        : pval;
    text += `${offset}${k}: ${pval}${comma}\n`;
  }

  return text;
};

const getConfigureExample = options =>
  "notifier.configure({\n" + getPrintedCode(options) + "});";

const App = () => {
  const options = {
    autoClose: 2000,
    position: "top-center",
    delay: 500,
    single: false,
    containerWidth: "480px",
    animation: {
      in: "fadeIn",
      out: "fadeOut",
      duration: 400
    }
  };

  return (
    <>
      <section className="section">
        <Header>
          <h1 className="subtitle">Simple React Notifications</h1>
          <GithubIcon />
        </Header>
      </section>
      <Settings>
        <div className="column">
          <h1 className="subtitle">Options</h1>
        </div>
        <div className="column">
          <Pre>{getConfigureExample(options)}</Pre>
        </div>
      </Settings>
    </>
  );
};

export default App;
