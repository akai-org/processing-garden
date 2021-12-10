import { FC } from 'react';
import { ListCard } from '../../components';
import fs from 'fs';
import path from 'path';

const Learning: FC = ({ files, learnConetntList }: any) => {
  console.log(files);

  return (
    <>
      {learnConetntList?.map((learnArticle: any, i: number) => (
        <ListCard content={{ ...learnArticle, index: i }} type="Tutorial" />
      ))}
    </>
  );
};

export async function getServerSideProps() {
  const files = fs.readdirSync(path.join('src/content/learning'));
  console.log(files);

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
    props: { files, learnConetntList },
  };
}

export default Learning;
