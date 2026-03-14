"use client";

import { 
  Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button 
} from "@heroui/react";
import { useApp } from "@/Context/AppContext";
import Image from "next/image";
import NextLink from "next/link";

export const Logo = () => (
  <div className="flex items-center justify-center">
    <Image 
      src="/images/logo.png" 
      alt="Logo" 
      width={36} 
      height={36} 
      className="object-contain"
      priority 
    />
  </div>
);

export default function AppNavbar() {
  const { user, lang } = useApp();

  const labels = {
    fr: {
      trending: "Trending",
      notes: "Notes",
      profil: "Profil",
      connexion: "Connexion"
    },
    en: {
      trending: "Trending",
      notes: "Notes",
      profil: "Profile",
      connexion: "Login"
    }
  };

  const t = labels[lang as "fr" | "en"] || labels.fr;

  return (
    <Navbar shouldHideOnScroll isBordered className="bg-white h-20">
      <NavbarBrand as={NextLink} href="/" className="cursor-pointer">
        <Logo />
        <p className="font-bold text-inherit ml-2 text-xl tracking-tight">DevTracker</p>
      </NavbarBrand>

      {user && (
        <NavbarContent className="hidden sm:flex gap-10" justify="center">
          <NavbarItem>
            <Link 
              as={NextLink}
              href="/trending" 
              color="foreground" 
              className="font-bold text-sm uppercase tracking-wide"
            >
              {t.trending}
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link 
              as={NextLink}
              href="/notes" 
              color="foreground" 
              className="font-bold text-sm uppercase tracking-wide"
            >
              {t.notes}
            </Link>
          </NavbarItem>
        </NavbarContent>
      )}

      <NavbarContent justify="end">
        {user ? (
          <NavbarItem>
            <Button 
              as={NextLink}
              href="/settings" 
              variant="solid" 
              className="
                bg-blue-600 
                text-white 
                font-bold 
                text-sm
                w-32 
                h-11 
                rounded-4px 
                flex 
                items-center 
                justify-center 
                hover:bg-blue-700 
                transition-all 
                shadow-none
              "
            >
              {t.profil}
            </Button>
          </NavbarItem>
        ) : (
          <NavbarItem>
            <Button 
              as={NextLink} 
              color="primary" 
              href="/connexion" 
              variant="flat" 
              className="font-bold rounded-md"
            >
              {t.connexion}
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
}