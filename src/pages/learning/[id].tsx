import { Container } from '@chakra-ui/react';
import { FC } from 'react';

const Lesson: FC = (params: any, { children }) => {
  return <Container maxW="container.md">{children}</Container>;
};

const learnConetntList = [
  {
    id: 1,
    title: 'Tworzenie tła',
    description: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`,
  },
  {
    id: 2,
    title: 'Reagowanie na przyciski',
    description: `It is a long established fact that a reader will be distracted by the readable content aof a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`,
  },
];

export async function getStaticPaths() {
  const paths = [
    {
      params: {
        id: '1',
      },
    },
    {
      params: {
        id: '2',
      },
    },
  ];
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const id = +params.id;

  return { props: learnConetntList.find((v) => v.id === id) };
}

export default Lesson;
