import { UserInfo } from "../types/UserInfo";

export const calculateIMC = (userInfo: UserInfo) => {
	if (userInfo?.weight_kg && userInfo?.height_cm) {
		const pesoNum = userInfo.weight_kg;
		const alturaMetros =
			userInfo.height_cm > 10 ? userInfo.height_cm / 100 : userInfo.height_cm;

		if (alturaMetros > 0) {
			return (pesoNum / (alturaMetros * alturaMetros)).toFixed(1);
		}
	}
	return "--";
};
