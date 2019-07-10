import React, { useState, useEffect } from "react";
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
  input[type="checkbox"] {
    height: 20px;
    width: 20px;
  }
  .item {
    margin-bottom: 8px;
    span {
      line-height: 36px;
      height: 36px;
      display: inline-block;
      width: 100px;
    }
  }
  .input {
    width: 130px;
  }
  .select select {
    width: 130px;
  }
`;

const H3 = styled.h3`
  font-size: 18px;
  margin-bottom: 12px;
`;

const message = "Your items have been updated.";

const getConfigureExample = options =>
  "notifier.configure({\n" + getPrintedCode(options) + "});";

const getNotificationExample = options =>
  `notifier.success("${message}", {\n${getPrintedCode(options)}});`;

const App = () => {
  const [type, setType] = useState("success");
  const [options, setOptions] = useState({
    autoClose: 2000,
    position: "top-right",
    delay: 0,
    single: false,
    containerWidth: "480px",
    animation: {
      in: "fadeIn",
      out: "fadeOut",
      duration: 400
    }
  });

  useEffect(() => notifier.configure(options), [options]);

  const { position, autoClose, single, delay } = options;

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
              <span>position</span>
              <div className="select">
                <select
                  onChange={({ target }) => {
                    setOptions({
                      ...options,
                      position: target.value
                    });
                  }}
                  value={position}
                >
                  <option value="top-left">top-left</option>
                  <option value="top-center">top-center</option>
                  <option value="top-right">top-right</option>
                </select>
              </div>
            </div>

            <div className="item">
              <span>type</span>
              <div className="select">
                <select
                  onChange={({ target }) => setType(target.value)}
                  value={type}
                >
                  <option value="success">success</option>
                  <option value="error">error</option>
                  <option value="custom">custom</option>
                </select>
              </div>
            </div>

            <div className="item">
              <label className="checkbox">
                <span>autoClose</span>
                <input
                  className="input"
                  type="number"
                  value={autoClose}
                  onChange={() => {
                    setOptions({
                      ...options,
                      autoClose: autoClose ? autoClose : false
                    });
                  }}
                />
              </label>
            </div>

            <div className="item">
              <label>
                <span>delay</span>
                <input
                  className="input"
                  type="number"
                  onChange={() => {
                    setOptions({
                      ...options,
                      delay
                    });
                  }}
                />
              </label>
            </div>

            <div className="item">
              <label className="checkbox">
                <span style={{ height: "20px", lineHeight: "20px" }}>
                  single
                </span>
                <input
                  type="checkbox"
                  checked={single}
                  value={delay}
                  onChange={() => {
                    setOptions({
                      ...options,
                      single: !single
                    });
                  }}
                />
              </label>
            </div>

            <br />
            <button
              className="button is-primary"
              onClick={() => {
                if (type === "success" || type === "error") {
                  notifier[type](message);
                }
              }}
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
          <Pre>
            {getNotificationExample({
              position,
              autoClose
            })}
          </Pre>
        </div>
      </Settings>
    </>
  );
};

export default App;
