import * as THREE from "three";
const LaptopLights = () => {
	return (
		<>
			<spotLight position={[0, 8, -4]} angle={0.5} intensity={100} color="white" />
			<pointLight position={[-4, 0.2, 2]} intensity={200} color="#A67B5B" />
			<pointLight position={[3.5, 0, 2.5]} intensity={120} color="#A67B5B" />
			<primitive
				object={new THREE.RectAreaLight("white", 0, 5, 2)}
				position={[1, 3, 4]}
				intensity={5}
			/>
		</>
	);
};

export default LaptopLights;
