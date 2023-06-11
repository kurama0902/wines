import "./menu.css";

export const Menu = ({ menuLinks }) => {
  return (
    <menu>
      <ul>
        {menuLinks.map((link) => {
          return (
            <li key={link.id}>
              <a href={link.to}>{link.name}</a>
            </li>
          );
        })}
      </ul>
    </menu>
  );
};
