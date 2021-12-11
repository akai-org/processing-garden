import Editor from '@monaco-editor/react';
import ColumnWrapper from 'components/ColumnWrapper/ColumnWrapper';
import withAuth from 'hoc/withAuth';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import theme from '../../editorTheme.json';

// const handleStepFinished = async (id: string) => {
//   return fetch(`/api/progress/learning/${id}`, {
//     method: 'POST',
//     credentials: 'include',
//   }).then((res) => res.json());
// };

const Challange: FC = () => {
  const router = useRouter();
  const [code, setCode] = useState('');

  const { id } = router.query;

  console.log(router.pathname);

  const meta = id ? require(`content/challanges/${id}/meta.ts`) : null;
  console.log(meta);

  if (id)
    return (
      <ColumnWrapper
        leftContent={
          <Editor
            width="50vw"
            height="calc(100vh - 133px)"
            value={code}
            onChange={(value = '') => setCode(value)}
            language="javascript"
            theme="vs-dark"
          />
        }
        rightContent={<div>asd</div>}
      />
    );
  return null;
};

export default withAuth(Challange);
