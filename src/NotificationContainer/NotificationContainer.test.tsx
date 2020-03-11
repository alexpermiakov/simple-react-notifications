import React from "react";
import { shallow, mount } from "enzyme";
import NotificationContainer from "./NotificationContainer";

describe("<NotificationContainer />", () => {
  it("should render correctly with default props", () => {
    const wrapper = shallow(
      <NotificationContainer id={1} cleared={jest.fn} message="Your item has been updated."/>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("should render multiple items", () => {
    const wrapper = mount(
      <NotificationContainer id={1} cleared={jest.fn} message="Your item has been updated." />
    );
    wrapper.setProps({ message: "Done! Check your email.", id:2, cleared:jest.fn });
    wrapper.setProps({ message: "Dark theme is enabled", id:3, cleared:jest.fn });
    wrapper.update();
    expect(wrapper.find(".info").length).toEqual(2);
  });
});
