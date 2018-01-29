import * as React from 'react';

import { render, shallow } from "enzyme";

import { PopoverMenu } from "./PopoverMenu";

describe('<PopoverMenu />', () => {
  it('should render', () => {
    const menu = shallow(<PopoverMenu label="Hello" />);
  });

  it('should open when label is clicked', () => {
    const menu = shallow(<PopoverMenu label="Hello" />);
    expect(menu.hasClass('hk-popover-menu-container--closed')).toBeTruthy();

    const labels = menu.findWhere(c => c.hasClass('hk-popover-menu'));    
    labels.simulate('click');
    expect(menu.hasClass('hk-popover-menu-container--open')).toBeTruthy();
  });
});
