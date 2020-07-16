import React, { memo, useCallback } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames/bind';

import styles from './text-fild.module.scss';

const cx = classnames.bind(styles);

export const TextFild = memo(({
  type,
  theme,
  name,
  placeholder,
  value,
  className,
  onChange,
  errorMsg,
  disabled,
  validator,
}) => {
  const handleChange = useCallback(({ target }) => {
    onChange({
      name: target.name,
      value: target.value,
      errorMsg: validator(target.value),
    });
  }, []);

  return (
    <div className={cx('text-fild')}>
      <input
        type={type}
        className={cx('text-fild_input', `text-fild_input_${theme}`, className, { error: errorMsg })}
        onChange={handleChange}
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        name={name}
      />
      <span className={cx('text-fild_input_error')}>{errorMsg}</span>
    </div>
  );
});

TextFild.defaultProps = {
  theme: 'defaulte',
  type: 'text',
  className: '',
  errorMsg: '',
  name: '',
  placeholder: '',
  value: '',
  disabled: false,
  validator: () => '',
  onChange: () => {},
};

TextFild.propTypes = {
  type: PropTypes.oneOf(['text', 'passwrod', 'email', 'date']),
  theme: PropTypes.oneOf(['defaulte', 'with-border']),
  className: PropTypes.string,
  errorMsg: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  validator: PropTypes.func,
};
