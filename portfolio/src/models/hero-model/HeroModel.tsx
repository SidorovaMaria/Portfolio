import { Canvas } from "@react-three/fiber";
import { useMediaQuery } from "react-responsive";
import { Laptop } from "./Frontend-laptop";
import { OrbitControls } from "@react-three/drei";
import LaptopLights from "./LaptopLights";

const HeroModel = ({ name }: { name: string }) => {
	const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

	return (
		<Canvas camera={{ position: [0, 3, 10], fov: 45 }}>
			<ambientLight intensity={1} color={"white"} />
			<OrbitControls
				enablePan={false} // Prevents panning of the scene
				// Disables zoom on tablets
				maxDistance={20} // Maximum distance for zooming out
				enableZoom={!isTabletOrMobile} // Enable zoom only on desktop
				minDistance={10} // Minimum distance for zooming in
				minPolarAngle={Math.PI / 5} // Minimum angle for vertical rotation
				maxPolarAngle={Math.PI / 2} // Maximum angle for vertical rotation
			/>
			<LaptopLights />
			<Laptop customText={`Hello${name ? ", " + name + "!" : "!"} `} />
		</Canvas>
	);
};

export default HeroModel;
// Removed the incorrect implementation of useMediaQuery
