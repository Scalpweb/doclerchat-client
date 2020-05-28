import React from 'react';
import {shallow} from 'enzyme';
import Message from '../Message';

const date = new Date(0);

describe('Message', () => {
  it('renders with clock 12', () => {
    const component = shallow(<Message author="foo" message="bar" postedAt={date} hour12={true} />);
    expect(component).toMatchSnapshot();
  });

  it('renders with clock 24', () => {
    const component = shallow(
      <Message author="foo" message="bar" postedAt={date} hour12={false} />
    );
    expect(component).toMatchSnapshot();
  });
});
