import { UserInfo } from '../types/UserInfo';

export const calculateIMC = (userInfo: UserInfo) => {
  if (userInfo?.weight_kg && userInfo?.height_cm) {
    const pesoNum = userInfo.weight_kg;
    const alturaNum = userInfo.height_cm / 100;
    return (pesoNum / (alturaNum * alturaNum)).toFixed(1);
  }
  return '--';
};