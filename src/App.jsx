import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.scss";
import MainPage from "./pages/MainPage/MainPage.jsx";
import TableItemPage from "./pages/TableItemPage/TableItemPage.jsx";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <MainPage /> },
    { path: "/items", element: <TableItemPage /> },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
