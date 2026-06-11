import { Outlet } from "react-router-dom";
import Footer from "../sections/Footer";

function App() {
  return (
    <main id="canvas-container max-w-7xl mx-auto">
      <div id="body">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}

export default App;
