import AchievementModal from 'components/AchievementWindow/AchievementWindow';
import { createContext, FC, useState } from 'react';
import { AchievementType } from '../components/AchievementWindow/AchievementWindow';

export const Context = createContext<any>(null);

const AchievementProvider: FC = ({ children }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [meta, setMeta] = useState<AchievementType>({
    name: '',
    description: '',
  });

  const setAchievement = (achievement: AchievementType) => {
    console.log(achievement);

    setMeta(achievement);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const value = {
    setAchievement,
    closeModal,
  };

  return (
    <Context.Provider value={value}>
      {children}
      {isModalVisible && <AchievementModal {...meta} />}
    </Context.Provider>
  );
};

export default AchievementProvider;
