import React from 'react';
import {mount} from 'enzyme';
import {SocketContext} from '../../socketContextGate/SocketContextGate';
import {SettingsContext, defaultSettings} from '../../settingsContextGate/SettingsContextGate';
import SettingsBoard from '../SettingsBoard';

const settingsWrapper = {fetch: jest.fn(), store: jest.fn(), storeOne: jest.fn()};

describe('SettingsBoards', () => {
  it('update storage', () => {
    const component = mount(
      <SettingsContext.Provider value={settingsWrapper}>
        <SocketContext.Provider value={{send: jest.fn()}}>
          <SettingsBoard settings={defaultSettings} />
        </SocketContext.Provider>
      </SettingsContext.Provider>
    );
    expect(component).toMatchSnapshot();

    const stub = jest.spyOn(settingsWrapper, 'store');

    component
      .find('input')
      .at(1)
      .simulate('change', {currentTarget: {value: 'light'}});
    expect(stub).toHaveBeenCalledTimes(1);

    component
      .find('input')
      .at(2)
      .simulate('change', {currentTarget: {value: 'dark'}});
    expect(stub).toHaveBeenCalledTimes(2);
  });
});
