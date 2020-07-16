import React, { memo } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import { onKeyUpCallback } from '../../../utils';

import styles from './button.module.scss';

const cx = classnames.bind(styles);

export const Button = memo(({
  type, theme, className, onClick, children,
}) => (
  <button
    type={type}
    className={cx('button', `button_${theme}`, className)}
    onClick={onClick}
    onKeyUp={onKeyUpCallback(onClick)}
  >
    {children}
  </button>
));

Button.defaultProps = {
  type: 'button',
  theme: 'default',
  className: '',
  onClick: () => {},
  children: '',
};

Button.propTypes = {
  type: PropTypes.oneOf(['submit', 'button', 'reset']),
  theme: PropTypes.oneOf(['default', 'success', 'warning', 'danger']),
  className: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};
