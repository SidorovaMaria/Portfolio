import { useEffect, useState } from "react";

export function useGeoLocation(ipAddress) {
	const [data, setData] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const token = import.meta.env.VITE_IPINFO_TOKEN;

	useEffect(() => {
		if (!token) {
			setError("IPINFO token is not set");
			setLoading(false);
			return;
		}
		const fetchIPINFO = async () => {
			setLoading(true);
			try {
				const url = `https://ipinfo.io/${ipAddress}?token=${token}`;
				const res = await fetch(url);
				if (!res.ok) {
					throw new Error("Failed to fetch data");
				}
				const json = await res.json();
				setData(json);
			} catch (err) {
				setError("Failed to fetch data", err);
			} finally {
				setLoading(false);
			}
		};
		fetchIPINFO();
	}, [token, ipAddress]);
	return { data, error, loading };
}
