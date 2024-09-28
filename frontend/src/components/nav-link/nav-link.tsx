import { NavLink, useMatch, useResolvedPath } from "react-router-dom";

interface ICustomNavLinkProps {
  to: string;
  className: string;
  children: React.ReactNode;
}

const CustomNavLink = ({ to, children, className }: ICustomNavLinkProps) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <NavLink
      to={to}
      className={`${className} ${match?.pattern.end ? "active" : "inactive"}`}
    >
      {children}
    </NavLink>
  );
};

export default CustomNavLink;
