import React from 'react';
import { Head } from '@inertiajs/react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ title, auth, children }) => {
  return (
    <>
      <Head title={title} />
      <Header auth={auth} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;