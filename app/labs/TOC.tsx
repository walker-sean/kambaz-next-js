"use client";
import { Nav, NavItem, NavLink } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function TOC() {
  const pathname = usePathname();
  return (
    <Nav variant="pills">
      <NavItem>
        <NavLink
          href="/labs"
          as={Link}
          className={`nav-link ${pathname.endsWith("labs") ? "active" : ""}`}
        >
          Labs{" "}
        </NavLink>{" "}
      </NavItem>
      {[1, 2, 3, 4, 5].map((n) => (
        <NavItem key={n}>
          <NavLink
            href={`/labs/lab${n}`}
            as={Link}
            className={`nav-link ${pathname.endsWith(`lab${n}`) ? "active" : ""}`}
          >
            {`Lab ${n} `}
          </NavLink>
        </NavItem>
      ))}
      <NavItem>
        <NavLink href="/" as={Link}>
          Kambaz{" "}
        </NavLink>{" "}
      </NavItem>
      <NavItem>
        <NavLink
          id="wd-github"
          href="https://github.com/walker-sean/kambaz-next-js"
        >
          Frontend GitHub
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          id="wd-github-be"
          href="https://github.com/walker-sean/kambaz-node-server-app"
        >
          Backend GitHub
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink
          id="wd-be-root"
          href="https://kambaz-node-server-app-12tv.onrender.com"
        >
          Backend Root
        </NavLink>
      </NavItem>
    </Nav>
  );
}
