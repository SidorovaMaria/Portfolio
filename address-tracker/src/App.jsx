import React, { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import IPSearchBar from "./componnets/IPSearchBar";
import { useGeoLocation } from "./hooks/useGeoLocation";
import { getUTCOffset } from "./hooks/getUTCOffset";
import { Locate } from "lucide-react";

const App = () => {
	const [ipInput, setIpInput] = useState("");
	const [submittedIp, setSubmittedIp] = useState("");
	const { data, error, loading } = useGeoLocation(submittedIp);
	const handleSearch = (ip) => {
		setSubmittedIp(ip);
	};
	console.log(data);
	return (
		<main className="flex flex-col">
			{/*IP Search Bar */}
			<div className="flex flex-col gap-6 py-[26px] items-center bg-[url('../public/images/pattern-bg-mobile.png')] md:bg-[url('../public/images/pattern-bg-desktop.png')] bg-cover bg-no-repeat bg-center h-[200px] w-full px-6 min-h-[300px]">
				<h1 className="text-[26px] font-medium text-center text-white">
					IP Address Tracker
				</h1>
				<IPSearchBar ipInput={ipInput} setIpInput={setIpInput} onSubmit={handleSearch} />
			</div>
			{/* IP Details */}
			{loading ? (
				<div className="absolute left-1/2 -translate-x-1/2 top-[167px] bg-white min-w-[327px] md:min-w-[800px] xl:min-w-[1100px] mx-auto rounded-[15px] flex items-center justify-center h-[200px]">
					<p className="text-3xl font-semibold "> Getting your loaction...</p>
				</div>
			) : (
				<>
					<div className="absolute left-1/2 -translate-x-1/2 top-[167px] flex flex-col md:flex-row md:items-stretch gap-3 md:gap-8 px-6 md:px-8 py-6.5 md:py-8.5 bg-white min-w-[327px] md:min-w-[800px] xl:min-w-[1100px] mx-auto rounded-[15px] z-50">
						<div className="id-data">
							<p className="ip-title">Ip Address</p>
							<p className="ip-value">{data?.ip || "N/A"}</p>
						</div>
						<div className="divider" />
						<div className="id-data">
							<p className="ip-title">Location</p>
							<p className="ip-value">
								{data ? `${data.city}, ${data.region} ${data.postal}` : "N/A"}
							</p>
						</div>
						<div className="divider" />
						<div className="id-data">
							<p className="ip-title">TimeZone</p>
							<p className="ip-value">{data ? getUTCOffset(data.timezone) : "N/A"}</p>
						</div>
						<div className="divider" />
						<div className="id-data">
							<p className="ip-title">ISP</p>
							<p className="ip-value">{data ? data.org : "N/A"}</p>
						</div>
					</div>
					<MapContainer
						center={[
							data?.loc?.split(",")[0] || 51.505,
							data?.loc?.split(",")[1] || -0.09,
						]}
						zoom={13}
						scrollWheelZoom={true}
						zoomControl={false}
						dragging={true}
						className="map z-0 h-[calc(100vh-375px)] md:h-[calc(100vh-280px)] w-full"
					>
						<TileLayer
							url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
							attribution={`&copy; <a href="https://www.stadiamaps.com/" target="_blank" rel="noopener noreferrer">Stadia Maps</a>, 
    &copy; <a href="https://openmaptiles.org/" target="_blank" rel="noopener noreferrer">OpenMapTiles</a>, 
    &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer">OpenStreetMap</a> contributors`}
						/>
						<Marker
							icon={L.icon({
								iconUrl: "/images/icon-location.svg",
							})}
							position={[
								data?.loc?.split(",")[0] || 51.505,
								data?.loc?.split(",")[1] || -0.09,
							]}
						>
							<Locate />
						</Marker>
					</MapContainer>
				</>
			)}
		</main>
	);
};

export default App;
