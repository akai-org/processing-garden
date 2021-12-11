import TutorialContainer from 'components/TutorialContainer/TutorialContainer';
import { useRouter } from 'next/router';
import { FC } from 'react';

const Lesson: FC = () => {
  const router = useRouter();

  const { id } = router.query;

  const Content = id ? require(`content/learning/${id}/base.mdx`) : null;
  const meta = id ? require(`content/learning/${id}/meta.ts`) : null;

  if (id)
    return (
      <TutorialContainer title={meta?.title}>
        {<Content.default />}
      </TutorialContainer>
    );
  return null;
};

export default Lesson;
