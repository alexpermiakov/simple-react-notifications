import React from "react";
import styled from "styled-components";
import notifier from "simple-react-notifications";
import "simple-react-notifications/dist/index.css";
import { getPrintedCode } from "./utils";
import GithubIcon from "./GithubIcon";

const Header = styled.div.attrs({ className: "section" })`
  background: #2f2f2f;
  height: 250px;
  .title,
  .subtitle {
    color: white;
    text-align: center;
    margin-bottom: 32px;
  }
  .title {
    margin-top: 48px;
  }
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
  input {
    height: 16px;
    width: 16px;
  }
  .item {
    margin-bottom: 8px;
    span {
      display: inline-block;
      width: 100px;
    }
  }
`;

const H3 = styled.h3`
  font-size: 18px;
  margin-bottom: 8px;
`;

const message = "Your items have been updated.";

const getConfigureExample = options =>
  "notifier.configure({\n" + getPrintedCode(options) + "});";

const getNotificationExample = options =>
  `notifier.success(${message}, {\n${getPrintedCode(options)}});`;

const options = {
  autoClose: 2000,
  position: "top-right",
  delay: 500,
  single: false,
  containerWidth: "480px",
  animation: {
    in: "fadeIn",
    out: "fadeOut",
    duration: 400
  }
};

const App = () => {
  return (
    <>
      <Header>
        <h1 className="title">Simple React Notifications</h1>
        <h2 className="subtitle">
          Tiny React.js notification library (1kb gzip).
        </h2>
        <GithubIcon />
      </Header>
      <Settings>
        <div className="column">
          <H3>Options</H3>
          <div>
            <div className="item">
              <span>Position</span>
              <div className="select">
                <select>
                  <option>top-left</option>
                  <option>top-center</option>
                  <option>top-right</option>
                </select>
              </div>
            </div>

            <div className="item">
              <span>Type</span>
              <div className="select">
                <select>
                  <option>success</option>
                  <option>error</option>
                  <option>custom</option>
                </select>
              </div>
            </div>

            <div className="item">
              <label className="checkbox">
                <span>autoClose</span>
                <input type="checkbox" />
              </label>
            </div>

            <div className="item">
              <label className="checkbox">
                <span>single</span>
                <input type="checkbox" />
              </label>
            </div>

            <br />
            <button
              className="button is-primary"
              onClick={() => notifier.success(message)}
            >
              Click to show!
            </button>
          </div>
        </div>
        <div className="column">
          <H3>Configuration (optional)</H3>
          <Pre>{getConfigureExample(options)}</Pre>
          <br />
          <H3>Show notification</H3>
          <Pre>{getNotificationExample({ position: "top-right" })}</Pre>
        </div>
      </Settings>
    </>
  );
};

export default App;
