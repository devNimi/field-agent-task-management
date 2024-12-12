// src/app/(components)/Header.tsx
"use client";

import Link from "next/link";
import styled from "styled-components";

const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #333;
  color: white;
  align-items: center;
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;

  a {
    color: white;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export function Header() {
  return (
    <NavContainer>
      <Link href="/">
        <h1
          style={{
            color: "white",
            textDecoration: "underline",
            textDecorationColor: "#333333",
          }}
        >
          Field Agent Task Management
        </h1>
      </Link>

      <NavLinks>
        <Link href="/">Tasks</Link>
        <Link href="/new-task">Create Task</Link>
        <Link href="/all-agents-location">Agent Locations</Link>
      </NavLinks>
    </NavContainer>
  );
}
