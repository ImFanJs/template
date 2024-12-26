import { createBrowserRouter } from "react-router-dom";
import { About, App, ErrorPage } from "../containers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
]);

export default router;
