import { Link } from "react-router-dom";

import "./menu.css";

export const Menu = ({ menuLinks }) => {
  return (
    <menu>
      <ul>
        {menuLinks.map((link) => {
          return (
            <li key={link.id}>
              {link.to.includes('/') ? <Link to={link.to}>{link.name}</Link> : <a href={link.to}>{link.name}</a>}
              <div className="line-hover">
                <div className="first-line"></div>
                <div className="second-line"></div>
              </div>
            </li>
          );
        })}
      </ul>
    </menu>
  );
};
