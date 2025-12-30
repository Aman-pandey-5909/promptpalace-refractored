"use client";
import NavLink from "./Navlink";
import { useUser } from "@/stores/userStore";

const Navbar = () => {
  const user = useUser((state: any) => state.user);
  return (
    <nav className="flex justify-between border border-red-500">
      <h1>PromptPalace</h1>
      <ul className="flex gap-4">
        <li>
          <NavLink href="/">Home</NavLink>
        </li>
        <li>
          {user ? (
            <NavLink href="/user">Dashboard</NavLink>
          ) : (
            <NavLink href="/auth/login">Login</NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
