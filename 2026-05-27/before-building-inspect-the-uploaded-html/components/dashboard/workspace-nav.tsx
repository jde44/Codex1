"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const navGroups = [
  {
    label: "Ready",
    items: [
      ["Use Case Intake", "/use-cases"],
      ["Data Exposure", "/data-governance"],
      ["Risk Scoring", "/risk-controls"]
    ]
  },
  {
    label: "Set",
    items: [
      ["PARCM Mapper", "/workflows"],
      ["Controls", "/risk-controls"],
      ["Testing Plan", "/testing"],
      ["Review Handoffs", "/orchestration"]
    ]
  },
  {
    label: "Know",
    items: [
      ["Dashboard", "/dashboard"],
      ["Governance Memo", "/memos"],
      ["Audit", "/audit"],
      ["Issues", "/alerts"],
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
