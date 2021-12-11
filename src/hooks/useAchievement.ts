import { Context } from 'context/AchievementContext';
import { useContext } from 'react';

const useAchievement = () => {
  const context = useContext(Context);

  if (!context) {
    throw new Error('useLoading hook should be used in LoadingContextProvider');
  }

  const { setAchievement, closeModal } = context;
  return { setAchievement, closeModal };
};

export default useAchievement;
