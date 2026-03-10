"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Link,
} from "@heroui/react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useAppContext } from "@/context/AppContext";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  const { user, logout } = useAppContext();

  React.useEffect(() => setMounted(true), []);

  return (
    <Navbar 
      onMenuOpenChange={setIsMenuOpen} 
      isMenuOpen={isMenuOpen}
      isBordered 
      maxWidth="xl"
    >
      {/* GAUCHE : Logo */}
      <NavbarContent justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Fermer" : "Ouvrir"} className="sm:hidden" />
        <NavbarBrand as={NextLink} href="/">
          <p className="font-bold text-inherit italic tracking-tighter text-xl">ACME DEV</p>
        </NavbarBrand>
      </NavbarContent>

      {/* CENTRE : Liens Desktop (Visibles seulement si connecté) */}
      <NavbarContent className="hidden sm:flex gap-10" justify="center">
        <NavbarItem isActive={pathname === "/"}>
          <Link as={NextLink} href="/" color={pathname === "/" ? "primary" : "foreground"}>Accueil</Link>
        </NavbarItem>
        
        {user && (
          <>
            <NavbarItem isActive={pathname === "/trending"}>
              <Link as={NextLink} href="/trending" color={pathname === "/trending" ? "primary" : "foreground"}>Trending</Link>
            </NavbarItem>
            <NavbarItem isActive={pathname === "/notes"}>
              <Link as={NextLink} href="/notes" color={pathname === "/notes" ? "primary" : "foreground"}>Notes</Link>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      {/* DROITE : Thème + Login/Menu User */}
      <NavbarContent justify="end">
        <NavbarItem>
          {mounted && (
            <Button isIconOnly variant="light" radius="full" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? "☀️" : "🌙"}
            </Button>
          )}
        </NavbarItem>

        <NavbarItem className="hidden sm:flex">
          {user ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Button variant="flat" color="primary" className="font-bold">
                  {user.username} ▾
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Menu utilisateur" variant="flat">
                <DropdownItem key="profile" as={NextLink} href={`/user/${user.id}`}>Mon Profil</DropdownItem>
                <DropdownItem key="settings" as={NextLink} href="/settings">Paramètres</DropdownItem>
                <DropdownItem key="logout" color="danger" className="text-danger" onClick={logout}>Déconnexion</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <div className="flex gap-2">
              <Button as={NextLink} href="/login" variant="light">Connexion</Button>
              <Button as={NextLink} href="/register" color="primary" shadow="sm">S'inscrire</Button>
            </div>
          )}
        </NavbarItem>
      </NavbarContent>

      {/* MOBILE MENU */}
      <NavbarMenu>
        <NavbarMenuItem className="mt-4">
          <Link as={NextLink} href="/" className="w-full" size="lg" color={pathname === "/" ? "primary" : "foreground"}>Accueil</Link>
        </NavbarMenuItem>

        {user && (
          <>
            <NavbarMenuItem>
              <Link as={NextLink} href="/trending" className="w-full" size="lg" color={pathname === "/trending" ? "primary" : "foreground"}>Trending</Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link as={NextLink} href="/notes" className="w-full" size="lg" color={pathname === "/notes" ? "primary" : "foreground"}>Notes</Link>
            </NavbarMenuItem>
          </>
        )}
        
        <hr className="my-2 border-default-100" />
        
        {user ? (
          <>
            <NavbarMenuItem>
              <Link as={NextLink} href={`/user/${user.id}`} className="w-full" size="lg">Mon Profil</Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link as={NextLink} href="/settings" className="w-full" size="lg">Paramètres</Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Button color="danger" variant="flat" className="w-full justify-start px-0 bg-transparent text-danger" onClick={logout}>Déconnexion</Button>
            </NavbarMenuItem>
          </>
        ) : (
          <div className="flex flex-col gap-2">
            <NavbarMenuItem>
              <Button as={NextLink} href="/login" variant="bordered" className="w-full" onClick={() => setIsMenuOpen(false)}>Connexion</Button>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Button as={NextLink} href="/register" color="primary" className="w-full" onClick={() => setIsMenuOpen(false)}>S'inscrire</Button>
            </NavbarMenuItem>
          </div>
        )}
      </NavbarMenu>
    </Navbar>
  );
}