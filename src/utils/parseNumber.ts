export const parseNumber = (v: string) => {
	if (!v) return 0;
	const num = Number(String(v).replace(",", "."));
	return Number.isNaN(num) ? 0 : num;
};
