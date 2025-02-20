import { Outlet } from "react-router-dom"
import Navbar from "./pages/shared/Navbar"



function MainLayout() {


  return (
    <div>
      <header className="max-w-screen-2xl mx-auto">
        <Navbar></Navbar>
      </header>
      <main className="pt-16">
          <Outlet></Outlet>
      </main>
    </div>
  )
}

export default MainLayout
