import React from "react";
import { shallow } from "enzyme";
import NotificationItem from "./NotificationItem";

describe("<NotificationItem />", () => {
  it("should render correctly with all props", () => {
    const wrapper = shallow(
      <NotificationItem
        message="Hello"
        type="warning"
        animationDelay="5000ms"
        animationDuration="300ms"
        onClose={() => {}}
      />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("label").length).toEqual(1);
  });

  it("should render with all default props", () => {
    const wrapper = shallow(<NotificationItem message="Hello" />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find("label").length).toEqual(1);
    expect(wrapper.contains(<label>ℹ</label>)).toEqual(true);
  });
});
