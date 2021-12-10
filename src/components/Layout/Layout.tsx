// components/layout.js

// import Navbar from './navbar'
// import Footer from './footer'
import { FC } from 'react';

const Layout: FC = ({ children }) => {
  return (
    <>
      {/* <Navbar /> */}
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
