import { UserInfo } from "../types/UserInfo";

export const calculateAge = (userInfo: UserInfo) => {
	if (userInfo?.birth_date) {
		const birthDate = new Date(userInfo.birth_date);
		const today = new Date();
		let age = today.getFullYear() - birthDate.getFullYear();
		const monthDiff = today.getMonth() - birthDate.getMonth();
		if (
			monthDiff < 0 ||
			(monthDiff === 0 && today.getDate() < birthDate.getDate())
		) {
			age--;
		}
		return age.toString();
	}
	return "--";
};
