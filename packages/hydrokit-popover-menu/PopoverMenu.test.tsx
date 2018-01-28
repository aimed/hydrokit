import * as React from 'react';

import { PopoverMenu } from "./PopoverMenu";
import { shallow } from "enzyme";

describe('<PopoverMenu />', () => {
  it('should render', () => {
    const component = shallow(<PopoverMenu label="Hello" />);
  });
});
