import Navbar from "../sections/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <main id="canvas-container max-w-7xl mx-auto">
      <Navbar />
      <div id="body">
        <Outlet />
      </div>
    </main>
  );
}

export default App;
