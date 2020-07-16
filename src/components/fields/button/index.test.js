/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';

import { Button } from './index';

const defaultProps = {
  type: 'button',
  theme: 'success',
  className: 'addUser',
  onClick: jest.fn(),
  children: 'add user',
};

const BaseButton = (props) => <Button {...defaultProps} {...props} />;

describe('button component', () => {
  it('render correctly', () => {
    const ButtonComponent = renderer.create(<BaseButton />).toJSON();
    expect(ButtonComponent).toMatchSnapshot();
  });
  it('render correctly without props', () => {
    const ButtonComponent = renderer.create(<Button />).toJSON();
    expect(ButtonComponent).toMatchSnapshot();
  });
  it('check default theme', () => {
    const ButtonComponent = shallow(<Button />);
    expect(ButtonComponent.hasClass('button_default')).toBeTruthy();
  });
  it('check theme', () => {
    const ButtonComponent = mount(<BaseButton />);
    expect(ButtonComponent.find(`.button_${defaultProps.theme}`)).toHaveLength(1);
  });
  it('check default class', () => {
    const ButtonComponent = shallow(<Button />);
    expect(ButtonComponent.hasClass('button')).toBeTruthy();
  });
  it('check class', () => {
    const ButtonComponent = shallow(<BaseButton />);
    expect(ButtonComponent.find(`.${defaultProps.className}`)).toHaveLength(1);
  });
  it('check onClick', () => {
    const ButtonComponent = mount(<BaseButton />);
    ButtonComponent.simulate('click');
    ButtonComponent.simulate('click');
    expect(defaultProps.onClick).toHaveBeenCalledTimes(2);
  });
  it('check type', () => {
    const ButtonComponent = mount(<BaseButton />);
    expect(ButtonComponent.getDOMNode().type).toBe(defaultProps.type);
  });
});
