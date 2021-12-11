import TutorialContainer from 'components/TutorialContainer/TutorialContainer';
import withAuth from 'hoc/withAuth';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import db from 'db';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import useAchievement from 'hooks/useAchievement';

const handleStepFinished = async (id: string) => {
  return fetch(`/api/progress/learning/${id}`, {
    method: 'POST',
    credentials: 'include',
  }).then((res) => res.json());
};

const Lesson: FC = ({ progress }: any) => {
  const [isFinished, setFinished] = useState(false);
  const [value, setValue] = useState('');
  const router = useRouter();

  const { id } = router.query;
  const wasAlreadyFinished = progress.find((el: any) => el.stepId === id);

  const { setAchievement } = useAchievement();

  const Content = id ? require(`content/learning/${id}/base.mdx`) : null;
  const meta = id ? require(`content/learning/${id}/meta.ts`) : null;

  const handleSubmit = () => {
    if (meta.correctValue(value)) {
      setFinished(true);

      console.log('call do backendu');

      setAchievement({
        name: 'Początkujący',
        description: 'Wykonano pierwszą lekcję',
      });
      handleStepFinished(id as string)
        .then(console.log)
        .catch(console.error);
    }
  };

  const handleChange = (event: any) => {
    setValue(event.target.value);
  };

  const handleNextButton = () => {
    setFinished(false);
  };
  if (id)
    return (
      <TutorialContainer
        title={meta?.title}
        id={id}
        isFinished={wasAlreadyFinished ? true : isFinished}
        codeTemplate={meta.codeTemplate}
        userValue={value}
        handleSubmit={handleSubmit}
        handleNextButton={handleNextButton}
      >
        <Content.default isFinished={isFinished} handleChange={handleChange} />
      </TutorialContainer>
    );
  return null;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });
  const user = await db.user.findFirst({
    where: { email: session?.user?.email! },
  });
  let progress;
  if (user) {
    progress = await db.progress.findMany({
      where: { userId: { equals: user.id } },
    });
  }

  return {
    props: { progress },
  };
};

export default withAuth(Lesson);
