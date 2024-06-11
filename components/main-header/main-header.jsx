import Link from "next/link";
import Image from "next/image";

import logoImg from "@/assets/logo.png";

import classes from "./main-header.module.css";
import MainHeaderBackground from "./main-header-background";

export default function MainHeader() {
  return (
    <>
        <MainHeaderBackground/>
        <header className={classes.header}>
        <Link href="/" className={classes.logo}>
            <Image src={logoImg} alt="A plate with food on it" priority />
            Next level food
        </Link>
        <nav className={classes.nav}>
            <ul>
            <li>
                <Link href="/meals">Browse meals</Link>
            </li>
            <li>
                <Link href="/community">Foodies community</Link>
            </li>
            </ul>
        </nav>
        </header>
    </>
  );
}
