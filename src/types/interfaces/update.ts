import { UserInfo } from "@/types/UserInfo";

export interface UpdateProfileParams {
	userId: string;
	userInfo: UserInfo;
	onSuccess: () => void;
	setLoading?: (loading: boolean) => void;
}
