import { Link } from "react-router-dom";

import "./menu.css";

export const Menu = ({ menuLinks }) => {
  return (
    <menu>
      <ul>
        {menuLinks.map((link) => {
          return (
            <li key={link.id}>
              <Link to={link.to}>{link.name}</Link>
            </li>
          );
        })}
      </ul>
    </menu>
  );
};
