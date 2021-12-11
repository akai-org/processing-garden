import { Container } from '@chakra-ui/react';
import Navbar from 'components/Navbar/Navbar';
import { useSession } from 'next-auth/react';
import { FC } from 'react';

const Layout: FC = ({ children }) => {
  const session = useSession();
  console.log(session);

  return (
    <>
      <Navbar />
      <Container maxW="container.md">{children}</Container>
      {/* <Footer /> */}
    </>
  );
};

export default Layout;
