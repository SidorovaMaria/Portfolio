export const toLocaleStringWithCommas = (num: number, currency: string, afterComa: number = 2) => {
	return num.toLocaleString("en-US", {
		minimumFractionDigits: afterComa,
		maximumFractionDigits: afterComa,
		style: "currency",
		currency: currency,
	});
};
