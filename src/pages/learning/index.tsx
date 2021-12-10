import { FC } from 'react';
import { ListCard } from '../../components';

const Learning: FC = ({ learnConetntList }: any) => {
  console.log(2, learnConetntList);
  return (
    <>
      {learnConetntList?.map((learnArticle: any, i: number) => (
        <ListCard content={{ ...learnArticle, index: i }} type="Tutorial" />
      ))}
    </>
  );
};

export async function getServerSideProps() {
  const learnConetntList = [
    {
      id: 1,
      title: 'Tworzenie tła',
      description: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`,
    },
    {
      id: 2,
      title: 'Reagowanie na przyciski',
      description: `It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.`,
    },
  ];

  return {
    props: { learnConetntList },
  };
}

export default Learning;
