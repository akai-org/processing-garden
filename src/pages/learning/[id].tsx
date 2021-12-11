import TutorialContainer from 'components/TutorialContainer/TutorialContainer';
import withAuth from 'hoc/withAuth';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import db from 'db';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import progress from 'pages/api/achievements';

const handleStepFinished = async (id: string) => {
  return fetch(`/api/progress/learning/${id}`, {
    method: 'POST',
    credentials: 'include',
  }).then((res) => res.json());
};

const Lesson: FC = ({ progress2 }: any) => {
  const [isFinished, setFinished] = useState(false);
  const [value, setValue] = useState('');
  const router = useRouter();

  const { id } = router.query;
  const wasAlreadyFinished = progress2.find((el: any) => el.stepId == id);
  console.log('WERT', progress2);

  const Content = id ? require(`content/learning/${id}/base.mdx`) : null;
  const meta = id ? require(`content/learning/${id}/meta.ts`) : null;

  const handleSubmit = () => {
    if (meta.correctValue(value)) {
      setFinished(true);

      console.log('call do backendu');
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
        isFinished={isFinished}
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
  let progress2;
  if (user) {
    progress2 = await db.progress.findMany({
      where: { userId: { equals: user.id } },
    });
  }

  return {
    props: { progress2 },
  };
};

export default withAuth(Lesson);
