"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const workspaceRoutes = [
  "/dashboard",
  "/workspace",
  "/app-library",
  "/data-governance",
  "/shadow-ai",
  "/risk-controls",
  "/use-cases",
  "/workflows",
  "/orchestration",
  "/cost",
  "/token-governance",
  "/memos",
  "/testing",
  "/alerts",
  "/learning",
  "/meta-harness",
  "/memory",
  "/skills",
  "/audit",
  "/settings",
  "/organization",
  "/access-management"
];

function navClass(pathname: string, href: string, currentHash: string, section?: "workspace" | "product") {
  if (section === "workspace") {
    return workspaceRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`)) ? "active" : "";
  }

  if (section === "product") {
    const targetHash = href.includes("#") ? href.slice(href.indexOf("#")) : "";
    return pathname === "/product" && (currentHash || "#ready") === targetHash ? "active" : "";
  }

  return pathname === href ? "active" : "";
}

export function SiteNav() {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState("");

  useEffect(() => {
    const updateHash = () => setCurrentHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  return (
    <nav aria-label="Primary navigation">
      <Link className={navClass(pathname, "/product#ready", currentHash, "product")} href="/product#ready">
        Ready
      </Link>
      <Link className={navClass(pathname, "/product#set", currentHash, "product")} href="/product#set">
        Set
      </Link>
      <Link className={navClass(pathname, "/product#grow", currentHash, "product")} href="/product#grow">
        Grow
      </Link>
      <Link className={navClass(pathname, "/dashboard", currentHash, "workspace")} href="/dashboard">
        Workspace
      </Link>
      <Link className={navClass(pathname, "/login", currentHash)} href="/login">
        Member Access
      </Link>
    </nav>
  );
}
