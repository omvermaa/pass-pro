import Navbar from "./component/Navbar.jsx";
import Manager from "./component/Manager.jsx";
import Footer from "./component/Footer";

function App() {
  return (
    <>
      <div className="absolute top-0 z-[-2] min-h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-size-[20px_20px]">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            <Manager />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
