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
      width: 150px;
    }
  }
  .input {
    width: 150px;
  }
  .select select {
    width: 150px;
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

const message = "The number of meetings you have next week:  ";

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
    <p>Bicycle 2.4 km, 8 min.</p>
    <p>Use caution - may involve sections not suited for bicycling</p>
    <button className="button">Use this route</button>
  </div>
  );`;

const RouteInfo = ({ header, onClosePanel }) => (
  <div
    className="route-info"
    onClick={onClosePanel}
    style={{
      height: "200px",
      background: "#54cea7",
      color: "white",
      padding: "8px 16px",
      position: "relative",
      boxShadow: "rgba(0, 0, 0, 1) 0px 0px 14px 2px"
    }}
  >
    <h3 className="subtitle">{header}</h3>
    <p>Bicycle 2.4 km, 8 min.</p>
    <p>Use caution - may involve errors or sections not suited for bicycling</p>
    <button
      className="button"
      style={{ position: "absolute", bottom: "16px", right: "16px" }}
    >
      Use this route
    </button>
  </div>
);

const defaultAnimation = {
  in: "fadeIn",
  out: "fadeOut",
  duration: 400
};

const App = () => {
  const [type, setType] = useState("success");
  const [options, setOptions] = useState({
    autoClose: 3000,
    width: 275,
    position: "top-right",
    delay: 0,
    closeOnClick: false,
    pauseOnHover: false,
    onlyLast: false,
    rtl: false,
    newestOnTop: true,
    animation: defaultAnimation
  });
  const [animationEnabled, setAnimation] = useState(options.animation);

  useEffect(() => notifier.configure(options), [options]);

  const {
    position,
    autoClose,
    onlyLast,
    delay,
    animation,
    rtl,
    newestOnTop,
    pauseOnHover,
    closeOnClick,
    width
  } = options;

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
                if (type === "custom") {
                  notifier({
                    render: ({ id, onClose }) => (
                      <RouteInfo
                        key={id}
                        onClosePanel={onClose}
                        header={"The shortest way to ride home."}
                      />
                    )
                  });
                } else {
                  notifier[type](message + new Date().getSeconds());
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
                  <option value="bottom-left">bottom-left</option>
                  <option value="bottom-center">bottom-center</option>
                  <option value="bottom-right">bottom-right</option>
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
                  <option value="info">info</option>
                  <option value="custom">custom</option>
                </select>
              </div>
            </div>

            {type === "custom" && (
              <div className="item">
                <span>Demo component</span>
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
              <span>width</span>
              <input
                className="input"
                type="number"
                value={width}
                onChange={({ target }) => {
                  setOptions({
                    ...options,
                    width: +target.value
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
                  pauseOnHover
                </span>
                <input
                  type="checkbox"
                  checked={pauseOnHover}
                  value={delay}
                  onChange={() => {
                    setOptions({
                      ...options,
                      pauseOnHover: !pauseOnHover
                    });
                  }}
                />
              </label>
            </div>

            <div className="item">
              <label className="checkbox">
                <span style={{ height: "20px", lineHeight: "20px" }}>
                  closeOnClick
                </span>
                <input
                  type="checkbox"
                  checked={closeOnClick}
                  value={delay}
                  onChange={() => {
                    setOptions({
                      ...options,
                      closeOnClick: !closeOnClick
                    });
                  }}
                />
              </label>
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
              <label className="checkbox">
                <span style={{ height: "20px", lineHeight: "20px" }}>
                  newestOnTop
                </span>
                <input
                  type="checkbox"
                  checked={newestOnTop}
                  value={delay}
                  onChange={() => {
                    setOptions({
                      ...options,
                      newestOnTop: !newestOnTop
                    });
                  }}
                />
              </label>
            </div>

            <div className="item">
              <label className="checkbox">
                <span style={{ height: "20px", lineHeight: "20px" }}>rtl</span>
                <input
                  type="checkbox"
                  checked={rtl}
                  value={delay}
                  onChange={() => {
                    setOptions({
                      ...options,
                      rtl: !rtl
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
                    animation: animation ? false : defaultAnimation
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
                    value={(animation || defaultAnimation).duration}
                    onChange={({ target }) => {
                      setOptions({
                        ...options,
                        animation: {
                          in: (animation || defaultAnimation).in,
                          out: (animation || defaultAnimation).out,
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
                          in: target.value || false
                        }
                      });
                    }}
                    value={(animation || defaultAnimation).in}
                  >
                    <option value="">None</option>
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
                          out: target.value || false
                        }
                      });
                    }}
                    value={(animation || defaultAnimation).out}
                  >
                    <option value="">None</option>
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
