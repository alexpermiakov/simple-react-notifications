import React from "react";
import { shallow, mount } from "enzyme";
import NotificationContainer from "./NotificationContainer";

describe("<NotificationContainer />", () => {
  it("should render correctly with default props", () => {
    const wrapper = shallow(
      <NotificationContainer message="Your item has been updated." />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should render multiple items", () => {
    const wrapper = mount(
      <NotificationContainer message="Your item has been updated." />
    );
    wrapper.setProps({ message: "Done! Check your email." });
    wrapper.setProps({ message: "Dark theme is enabled" });
    wrapper.update();
    expect(wrapper.find(".notification-item").length).toEqual(3);
  });
});
