import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import App from "./App"
import "./index.css"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
)

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js")
      .then((registration) => {
        console.log(
          "LocalHub service worker registered:",
          registration.scope
        )
      })
      .catch((error) => {
        console.error(
          "LocalHub service worker registration failed:",
          error
        )
      })
  })
}