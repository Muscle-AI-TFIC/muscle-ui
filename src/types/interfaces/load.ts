import { UserInfo } from '@/types/UserInfo';

export interface LoadProfileParams {
  userId: string;
  setUserInfo: (info: UserInfo | null) => void;
  setUserEmail: (email: string) => void;
  setUserName: (name: string) => void;
}