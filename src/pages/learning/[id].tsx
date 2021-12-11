import TutorialContainer from 'components/TutorialContainer/TutorialContainer';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';

const Lesson: FC = () => {
  const [isFinished, setFinished] = useState(false);
  const [value, setValue] = useState('');
  const router = useRouter();

  const { id } = router.query;

  const Content = id ? require(`content/learning/${id}/base.mdx`) : null;
  const meta = id ? require(`content/learning/${id}/meta.ts`) : null;

  const handleSubmit = () => {
    console.log('asd');

    if (meta.correctValue(value)) {
      setFinished(true);
    }
  };

  const handleChange = (event: any) => {
    setValue(event.target.value);
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
      >
        <Content.default
          onSuccess={() => {
            setFinished(true);
          }}
          isFinished={isFinished}
          handleChange={handleChange}
        />
      </TutorialContainer>
    );
  return null;
};

export default Lesson;
