import React from 'react';
import PropTypes from 'prop-types';

import Header from '../header';

import styles from './layout.module.scss';

const Layout = ({ children }) => (
  <div className={styles.layout}>
    <Header />
    <main className={styles.layout_main}>{children}</main>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
