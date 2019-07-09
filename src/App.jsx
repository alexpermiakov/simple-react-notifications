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

const App = () => {
  const configure = `notifier.configure({
    position: "top-center",
    animation: {
      in: "fadeIn",
      out: "fadeOut",
      duration: 400
    }
  });`;
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
          <Pre>{configure}</Pre>
        </div>
      </Settings>
    </>
  );
};

export default App;
