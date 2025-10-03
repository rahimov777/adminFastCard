import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layout/layout";
import Home from "./pages/home/home";
import Orders from "./pages/orders/orders";
import Other from "./pages/other/other";
import Login from "./pages/login/login";
import LoginLayout from "./layout/loginLayout";
import { Products } from "./pages/products/products";
import Addproduct from "./pages/addproduct/addproduct";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/orders",
          element: <Orders />,
        },
        {
          path: "/other",
          element: <Other />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/addnew",
          element: <Addproduct />,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginLayout />,
      children: [{ path: "/login", element: <Login /> }],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
