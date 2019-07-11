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
      width: 130px;
    }
  }
  .input {
    width: 130px;
  }
  .select select {
    width: 130px;
  }
  .textarea {
    height: 250px;
    cursor: default !important;
  }
`;

const H3 = styled.h3`
  font-size: 18px;
  margin-bottom: 12px;
`;

const message = "You have a new message.";

const getConfigureExample = options =>
  "notifier.configure({\n" + getPrintedCode(options) + "});";

const getNotificationExample = options =>
  `notifier.success("${message}", {\n${getPrintedCode(options)}});`;

const getCustomComponent = options => {
  options.render = `({ id, onClose }) => (
    <RouteInfo
      key={id}
      onClosePanel={onClose}
      header={"The shortest way to ride home."}
    />
  )`;
  return `notifier({
${getPrintedCode(options, 1, true)}})`;
};

const componentExample = `const RouteInfo = ({(header, onClosePanel)}) => (
  <div className="route-info" onClick={onClosePanel}>
    <h3>{header}</h3>
    <p>
      Bicycle 2.4 km, 8 min.
    </p>
    <p>
      Use caution - may involve errors or
      sections not suited for bicycling
    </p>
  </div>
  );`;

const RouteInfo = ({ header, onClosePanel }) => (
  <div
    className="route-info"
    onClick={onClosePanel}
    style={{
      height: "250px",
      background: "white",
      color: "black",
      padding: "8px 16px",
      position: "relative",
      boxShadow: "0 1px 10px 0 rgba(0, 0, 0, 0.1)"
    }}
  >
    <h3 className="subtitle">{header}</h3>
    <p>Bicycle 2.4 km, 8 min.</p>
    <p>Use caution - may involve errors or sections not suited for bicycling</p>
  </div>
);

const App = () => {
  const [type, setType] = useState("success");
  const [options, setOptions] = useState({
    autoClose: 2000,
    position: "top-right",
    delay: 0,
    onlyLast: false,
    animation: false
  });
  const [animationEnabled, setAnimation] = useState(options.animation);

  useEffect(() => notifier.configure(options), [options]);

  const { position, autoClose, onlyLast, delay, animation } = options;

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
          <div>
            <button
              className="button is-primary"
              onClick={() => {
                if (type === "success" || type === "error") {
                  notifier[type](message);
                } else {
                  notifier({
                    render: ({ id, onClose }) => (
                      <RouteInfo
                        key={id}
                        onClosePanel={onClose}
                        header={"The shortest way to ride home."}
                      />
                    )
                  });
                }
              }}
            >
              Click to show!
            </button>
            <br />
            <br />

            <H3>Options</H3>
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

            {type === "custom" && (
              <div className="item">
                <span>Component</span>
                <textarea className="textarea" disabled={true}>
                  {componentExample}
                </textarea>
              </div>
            )}

            <div className="item">
              <span>autoClose</span>
              <input
                className="input"
                type="number"
                value={autoClose}
                onChange={({ target }) => {
                  setOptions({
                    ...options,
                    autoClose: target.value ? +target.value : false
                  });
                }}
              />
            </div>

            <div className="item">
              <span>delay</span>
              <input
                className="input"
                type="number"
                value={delay}
                onChange={({ target }) => {
                  setOptions({
                    ...options,
                    delay: +target.value
                  });
                }}
              />
            </div>

            <div className="item">
              <label className="checkbox">
                <span style={{ height: "20px", lineHeight: "20px" }}>
                  onlyLast
                </span>
                <input
                  type="checkbox"
                  checked={onlyLast}
                  value={delay}
                  onChange={() => {
                    setOptions({
                      ...options,
                      onlyLast: !onlyLast
                    });
                  }}
                />
              </label>
            </div>

            <div className="item">
              <span style={{ height: "20px", lineHeight: "20px" }}>
                animation
              </span>
              <input
                type="checkbox"
                checked={animationEnabled}
                value={animationEnabled}
                onChange={() => {
                  setAnimation(!animationEnabled);
                  setOptions({
                    ...options,
                    animation: !animationEnabled
                      ? {
                          in: "fadeIn",
                          out: "fadeOut",
                          duration: animation.duration || 600
                        }
                      : false
                  });
                }}
              />
            </div>

            {animationEnabled && (
              <div className="item">
                <label className="checkbox">
                  <span>duration</span>
                  <input
                    className="input"
                    type="number"
                    value={animation.duration}
                    onChange={({ target }) => {
                      setOptions({
                        ...options,
                        animation: {
                          in: "fadeIn",
                          out: "fadeOut",
                          duration: +target.value
                        }
                      });
                    }}
                  />
                </label>
              </div>
            )}

            {animationEnabled && (
              <div className="item">
                <span>in</span>
                <div className="select">
                  <select
                    onChange={({ target }) => {
                      setOptions({
                        ...options,
                        animation: {
                          ...animation,
                          in: target.value
                        }
                      });
                    }}
                    value={animation.in}
                  >
                    <option value="fadeIn">fadeIn</option>
                    <option value="zoomIn">zoomIn</option>
                  </select>
                </div>
              </div>
            )}

            {animationEnabled && (
              <div className="item">
                <span>out</span>
                <div className="select">
                  <select
                    onChange={({ target }) => {
                      setOptions({
                        ...options,
                        animation: {
                          ...animation,
                          out: target.value
                        }
                      });
                    }}
                    value={animation.out}
                  >
                    <option value="fadeOut">fadeOut</option>
                    <option value="zoomOut">zoomOut</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="column">
          <H3>
            <b>Configuration</b> (optional, common for all notifications)
          </H3>
          <Pre>{getConfigureExample(options)}</Pre>
          <br />
          <H3>
            <b>Show notification</b> (you can override configuration here)
          </H3>
          {type !== "custom" && (
            <Pre>
              {getNotificationExample({
                position,
                autoClose
              })}
            </Pre>
          )}

          {type === "custom" && (
            <Pre>
              {getCustomComponent({
                position,
                autoClose
              })}
            </Pre>
          )}
        </div>
      </Settings>
    </>
  );
};

export default App;
