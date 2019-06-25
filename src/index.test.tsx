import React from "react";
import Hello from "./index";
import { shallow } from "enzyme";

describe("<Hello />", () => {
  it("should render correctly with a text prop", () => {
    const component = shallow(<Hello text="Alex" />);

    expect(component).toMatchSnapshot();
  });
});
