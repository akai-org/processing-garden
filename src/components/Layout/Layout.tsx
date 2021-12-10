import Navbar from 'components/Navbar/Navbar';
import { FC } from 'react';

const Layout: FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
