import { Container } from '@chakra-ui/react';
import TutorialContainer from 'components/TutorialContainer/TutorialContainer';
import { useRouter } from 'next/router';
import { FC } from 'react';

const Lesson: FC = () => {
  const router = useRouter();
  console.log(router);

  const { id } = router.query;

  // require(`content/learning/${id}/base.mdx`);
  const Content = id ? require(`content/learning/${id}/base.mdx`) : null;
  // console.log(Content);

  console.log(id);
  // const { id } = params;

  if (id) return <TutorialContainer>{<Content.default />}</TutorialContainer>;
  return null;
};

export default Lesson;
