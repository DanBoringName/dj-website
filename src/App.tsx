import { Canvas } from "@react-three/fiber";
import Navbar from "./sections/Navbar";

function App() {
  return (
    <main id="canvas-container max-w-7xl mx-auto">
      <Canvas>
        <ambientLight intensity={0.1} />
        <directionalLight color="red" position={[0, 0, 5]} />
        <mesh>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial />
        </mesh>
      </Canvas>
      <Navbar />
    </main>
  );
}

export default App;
