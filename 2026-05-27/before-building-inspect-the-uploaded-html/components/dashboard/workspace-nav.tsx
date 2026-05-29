"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const navGroups = [
  {
    label: "Ready",
    items: [
      ["Data", "/data-governance"],
      ["Shadow AI", "/shadow-ai"],
      ["Controls", "/risk-controls"]
    ]
  },
  {
    label: "Set",
    items: [
      ["Intake", "/use-cases"],
      ["Workflows", "/workflows"],
      ["Agents", "/orchestration"],
      ["Models & Cost", "/cost"],
      ["Tokens", "/token-governance"],
      ["Memos", "/memos"]
    ]
  },
  {
    label: "Grow",
    items: [
      ["Dashboard", "/dashboard"],
      ["Testing & EWS", "/testing"],
      ["Learning", "/learning"],
      ["Meta Harness", "/meta-harness"],
      ["Memory", "/memory"],
      ["Skills", "/skills"],
      ["Audit", "/audit"],
      ["Settings", "/settings"]
    ]
  }
];

function isActivePath(pathname: string, href: string) {
  return pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));
}

export function WorkspaceNav() {
  const pathname = usePathname();
  const activeGroup = useMemo(
    () => navGroups.find((group) => group.items.some(([, href]) => isActivePath(pathname, href)))?.label ?? "Ready",
    [pathname]
  );
  const [openGroup, setOpenGroup] = useState(activeGroup);

  useEffect(() => {
    setOpenGroup(activeGroup);
  }, [activeGroup]);

  return (
    <nav aria-label="Member workspace navigation" className="workspace-nav-tree">
      {navGroups.map((group) => {
        const isOpen = openGroup === group.label;
        const isGroupActive = activeGroup === group.label;

        return (
          <section className="nav-group" key={group.label}>
            <button
              aria-expanded={isOpen}
              className={isGroupActive ? "nav-parent active" : "nav-parent"}
              onClick={() => setOpenGroup(group.label)}
              type="button"
            >
              <span>{group.label}</span>
              <ChevronDown aria-hidden="true" size={16} strokeWidth={2.4} />
            </button>
            <div className={isOpen ? "nav-children open" : "nav-children"}>
              {group.items.map(([label, href]) => {
                const active = isActivePath(pathname, href);

                return (
                  <Link aria-current={active ? "page" : undefined} className={active ? "active" : ""} key={href} href={href}>
                    {label}
                  </Link>
                );
              })}
            </div>
          </section>
        );
      })}
    </nav>
  );
}
