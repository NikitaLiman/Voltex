"use client";

import React from "react";
import Styles from "../app/page.module.scss";
import { usePathname } from "next/navigation";
import Link from "next/link";
export const TopBarPage = ({
  productId,
}: {
  productId: number | undefined;
}) => {
  const pathname = usePathname();

  const list = [
    { label: "All about the product", href: `/Product/${productId}` },
    { label: "Characteristics", href: `/Product/${productId}/Characteristics` },
  ];

  return (
    <div className={Styles.TopBar}>
      <ul>
        {list.map(({ label, href }, index) => (
          <li className={pathname === href ? Styles.active : ""} key={index}>
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
