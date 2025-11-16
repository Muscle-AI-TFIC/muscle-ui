export const parseNumber = (v: any) => {
	if (!v) return 0;
	const num = Number(String(v).replace(",", "."));
	return isNaN(num) ? 0 : num;
};
