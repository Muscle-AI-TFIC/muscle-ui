export interface LoginParams {
  email: string;
  password: string;
  setLoading: (loading: boolean) => void;
  onSuccess: (email: string) => void;
}