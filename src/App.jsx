import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage.jsx";
import "./App.scss";

function App() {
  const routerMainPage = createBrowserRouter([
    { path: "/", element: <MainPage /> },
  ]);
  return (
    <>
      <RouterProvider router={routerMainPage} />
    </>
  );
}

export default App;
