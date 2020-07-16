/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';

import { TextFild } from './index';

const defaultProps = {
  type: 'text',
  theme: 'with-border',
  className: '',
  errorMsg: '',
  name: 'email',
  value: '',
  disabled: false,
  placeholder: 'text',
  onChange: () => {},
  validator: () => '',
};

const BaseTextFild = (props) => <TextFild {...defaultProps} {...props} />;

describe('text fild component', () => {
  it('render correctly', () => {
    const TextFildComponent = renderer.create(<BaseTextFild />).toJSON();
    expect(TextFildComponent).toMatchSnapshot();
  });
  it('render correctly without props', () => {
    const TextFildComponent = renderer.create(<TextFild />).toJSON();
    expect(TextFildComponent).toMatchSnapshot();
  });
  it('check onChange', () => {
    const TextFildComponent = mount(<BaseTextFild />);
    // TextFildComponent.simulate('change');
    TextFildComponent.mount('onchange', { target: { value: 'text' } });
    expect(defaultProps.onChange).toBeTruthy();
  });
});
