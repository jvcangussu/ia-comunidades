import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

function RootLayout() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow flex flex-col">
          <Outlet />
        </main>
        <Footer />
      </div >
    </>
  )
}

export default RootLayout;