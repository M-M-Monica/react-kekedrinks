import React from 'react';
import Header from '../header/header.jsx';
import './layout.scss';

const Layout = (props) => {
  return (
    <section className="layout">
      <div className="site-layout">
        <Header />
        <main className="site-layout-content">
          {props.children}
        </main>
      </div>
    </section>
  );
}

export default Layout
 