import React from "react";
import Link from "next/link";

const header = ({ currentUser }) => {
  const links = [
    !currentUser && { label: "Sign Up", href: "/auth/signup" },
    !currentUser && { label: "Sign In", href: "/auth/signin" },
    currentUser && { label: "Sign Out", href: "/auth/signout" },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => (
      <li key={href}>
        <Link href={href}>
          <a>{label}</a>
        </Link>
      </li>
    ));
  return (
    <nav>
      <Link href="/"></Link>

      <div className="d-flex justify-content-end">
        <ul>{links}</ul>
      </div>
    </nav>
  );
};

export default header;
