import { createBrowserRouter, RouterProvider } from "react-router-dom";

import History from "./routes/history/History";
import Login from "./routes/login/Login";
import Profile from "./routes/profile/Profile";
import Quote from "./routes/quote/Quote";
import Register from "./routes/register";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <h1>Home Page</h1>
        <p>
          We will quote stuff for you and store it so you can look at it later!
        </p>
        <p>
          We could probably turn this into an entire component. Alternatively, I
          don't think I'd be a bad idea to not have an actual home page at all
          but instead let "/" redirect to "/login" or "/quote" depending on if
          the user is logged in or not. But for now, I'm just going to leave it
          as a fragment.
        </p>
      </>
    ),
  },
  {
    path: "/history",
    element: <History />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/quote",
    element: <Quote />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
