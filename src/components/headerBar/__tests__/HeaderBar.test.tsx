import React from 'react';
import {shallow} from 'enzyme';
import HeaderBar from '../HeaderBar';

const emptyFnc = () => {
  return;
};

describe('HeaderBar', () => {
  it('renders without button', () => {
    const component = shallow(
      <HeaderBar
        onClickChat={emptyFnc}
        onClickSettings={emptyFnc}
        showSettingsButton={false}
        showChatButton={false}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('renders buttons', () => {
    const component = shallow(
      <HeaderBar
        onClickChat={emptyFnc}
        onClickSettings={emptyFnc}
        showSettingsButton={true}
        showChatButton={true}
      />
    );
    expect(component).toMatchSnapshot();
  });

  it('renders unread counter', () => {
    const component = shallow(
      <HeaderBar
        onClickChat={emptyFnc}
        onClickSettings={emptyFnc}
        showSettingsButton={false}
        showChatButton={true}
        unreadCount={1}
      />
    );
    expect(component).toMatchSnapshot();

    component.setProps({unreadCount: 0});
    expect(component).toMatchSnapshot();
  });
});
