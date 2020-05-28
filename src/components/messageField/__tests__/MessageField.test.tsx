import React from 'react';
import {mount} from 'enzyme';
import {SocketContext} from '../../socketContextGate/SocketContextGate';
import {SettingsContext} from '../../settingsContextGate/SettingsContextGate';
import MessageField from '../MessageField';

jest.mock('emoji-picker-react', () => {
  return {
    __esModule: true,
    // eslint-disable-next-line react/display-name
    default: () => {
      return <div></div>;
    }
  };
});

describe('MessageField', () => {
  it('renders emoji selector', () => {
    const component = mount(
      <SettingsContext.Provider value={{fetch: jest.fn(), store: jest.fn(), storeOne: jest.fn()}}>
        <SocketContext.Provider value={{send: jest.fn()}}>
          <MessageField />
        </SocketContext.Provider>
      </SettingsContext.Provider>
    );
    expect(component).toMatchSnapshot();

    component.find('.pull-left IconButton').simulate('click');
    expect(component).toMatchSnapshot();
  });

  it('clears textarea when sending message', () => {
    const component = mount(
      <SettingsContext.Provider value={{fetch: jest.fn(), store: jest.fn(), storeOne: jest.fn()}}>
        <SocketContext.Provider value={{send: jest.fn()}}>
          <MessageField />
        </SocketContext.Provider>
      </SettingsContext.Provider>
    );
    component.find('textarea').getDOMNode<HTMLTextAreaElement>().value = 'foobarbaz';
    component.find('textarea').simulate('change');
    expect(component).toMatchSnapshot();

    component.find('.pull-right IconButton').simulate('click');
    expect(component).toMatchSnapshot();
  });
});
