import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <p>Temporary Home Page</p>
      <ul>
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/quote">Quote</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </>
  );
}
