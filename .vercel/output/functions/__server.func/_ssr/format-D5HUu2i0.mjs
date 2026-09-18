//#region node_modules/.nitro/vite/services/ssr/assets/format-D5HUu2i0.js
function money(n, opts) {
	const abs = Math.abs(n);
	const fraction = opts?.cents || abs % 1 !== 0 ? {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	} : { maximumFractionDigits: 0 };
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		...fraction
	}).format(n);
}
function daysLabel(n) {
	if (!Number.isFinite(n)) return "open";
	if (n <= 0) return "0 days";
	if (n < 1) return "under a day";
	const rounded = Math.floor(n);
	return `${rounded} day${rounded === 1 ? "" : "s"}`;
}
function shortDate(iso) {
	return new Date(iso).toLocaleDateString("en-US", {
		month: "short",
		day: "numeric"
	});
}
//#endregion
export { money as n, shortDate as r, daysLabel as t };
