import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <>
      <h1>Sorry page was not found</h1>
      <Link to="/">go back</Link>
    </>
  );
}
