import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Blackhole from "../components/Blackhole";
import CanvasLoader from "../components/CanvasLoader";

const Hero = () => {
  return (
    <section className="min-h-screen w-full flex flex-col relative">
      <div className="w-full mx-auto flex flex-col sm:mt-36 mt-20 c-space gap-3">
        <p className="sm:text-3xl text-xl font-medium text-white text-center font-sans">
          This is the best website...in the world! <span className="waving-hand">👋</span>
        </p>
        <p className="hero_tag text-gray_gradient">Building in progress...</p>
        <div className="w-full h-full absolute inset-0">
          <Canvas className="w-full h-full">
            <Suspense fallback={<CanvasLoader />}>
              <PerspectiveCamera makeDefault position={[0, 0, 30]} />
              <Blackhole scale={5} position={[0, 0, 0]} rotation={[Math.PI / 8, 0, 0]} />{" "}
              {
                // `-Math.PI / 2` to rotate 90deg
                // clockwise
              }
              <ambientLight intensity={1} />
              <directionalLight position={[10, 10, 10]} intensity={0.5} />
            </Suspense>
          </Canvas>
        </div>
      </div>
    </section>
  );
};

export default Hero;
