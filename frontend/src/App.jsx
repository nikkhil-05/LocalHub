import { BrowserRouter, Routes, Route } from "react-router-dom"

import AppLayout from "./components/layout/AppLayout"

import Home from "./pages/Home"
import Files from "./pages/Files"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/files" element={<Files />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App