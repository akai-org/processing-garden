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

  const handleAddAchievement = async (achievement: AchievementType) => {
    return fetch(`/api/achievements`, {
      method: 'POST',
      body: JSON.stringify(achievement),
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        setMeta(achievement);
        setModalVisible(true);
      })
      .catch(console.error);
  };

  const setAchievement = (achievement: AchievementType) => {
    handleAddAchievement(achievement);
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
