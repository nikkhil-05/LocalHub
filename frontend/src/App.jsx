import { BrowserRouter, Routes, Route } from "react-router-dom"

import AppLayout from "./components/layout/AppLayout"

import Home from "./pages/Home"
import Files from "./pages/Files"
import Camera from "./pages/Camera"
import { APP_ROUTES } from "./api/urls"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path={APP_ROUTES.home} element={<Home />} />
          <Route path={APP_ROUTES.files} element={<Files />} />
          <Route path={APP_ROUTES.camera} element={<Camera />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
