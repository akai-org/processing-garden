import { Container } from '@chakra-ui/react';
import Navbar from 'components/Navbar/Navbar';
import { FC } from 'react';

interface Props {
  fullWidth: boolean;
}

const Layout: FC<Props> = ({ children, fullWidth }) => {
  return (
    <>
      <Navbar />
      <Container pt={10} maxW={fullWidth ? 'full' : 'container.md'}>
        {children}
      </Container>
    </>
  );
};

export default Layout;
