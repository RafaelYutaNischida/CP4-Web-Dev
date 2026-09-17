import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Detalhe from "./pages/Detalhe.jsx";
import Diario from "./pages/Diario.jsx";
import Perfil from "./pages/Perfil.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PageNotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "titulo/:tipo/:id", element: <Detalhe /> },
      { path: "diario", element: <Diario /> },
      { path: "perfil", element: <Perfil /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
