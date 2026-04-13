"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../store";
export default function AccountNavigation() {
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const links = currentUser ? ["profile"] : ["signin", "signup"];
  const pathname = usePathname();
  return (
    <Nav variant="pills">
      {links.map((link) => {
        const [first, ...rest] = link;
        const capitalizedLink = [first.toUpperCase(), ...rest].join("");
        return (
          <NavItem key={link}>
            <NavLink as={Link} href={link} active={pathname.endsWith(link)}>
              {capitalizedLink}{" "}
            </NavLink>{" "}
          </NavItem>
        );
      })}
      <NavItem>
        {currentUser && currentUser.role === "ADMIN" && (
          <NavLink
            as={Link}
            href={`/account/users`}
            active={pathname.endsWith("users")}
          >
            {" "}
            Users{" "}
          </NavLink>
        )}
      </NavItem>
    </Nav>
  );
}
