import { Container } from '@chakra-ui/react';
import Navbar from 'components/Navbar/Navbar';
import { FC } from 'react';

const Layout: FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container maxW="container.md">{children}</Container>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
