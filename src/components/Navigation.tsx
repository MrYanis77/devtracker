"use client"

import { 
  Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, 
  Dropdown, DropdownTrigger, DropdownMenu, DropdownItem 
} from "@heroui/react";
import { useApp } from "@/Context/AppContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
  const { user, logout } = useApp();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/connexion");
  };

  return (
    <Navbar shouldHideOnScroll isBordered>
      <NavbarBrand>
        <Logo />
        <p className="font-bold text-inherit ml-2">DevTracker</p>
      </NavbarBrand>

      {/* Liens centraux : uniquement si connecté */}
      {user && (
        <NavbarContent className="hidden sm:flex gap-6" justify="center">
          <NavbarItem>
            <Link color="foreground" href="/trending">Trending</Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="/notes">Notes</Link>
          </NavbarItem>
        </NavbarContent>
      )}

      <NavbarContent as="div" justify="end">
        {user ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              {/* On remplace l'Avatar par un bouton affichant le nom de l'utilisateur */}
              <Button 
                variant="bordered" 
                color="secondary" 
                size="sm" 
                className="font-bold italic uppercase"
              >
                {user.username} ▼
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Actions profil" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-semibold">Connecté en tant que</p>
                <p className="font-semibold text-secondary">{user.username}</p>
              </DropdownItem>
              <DropdownItem key="settings">Mes Paramètres</DropdownItem>
              <DropdownItem 
                key="logout" 
                color="danger" 
                onPress={handleLogout}
              >
                Déconnexion
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <NavbarItem>
            <Button as={Link} color="primary" href="/connexion" variant="flat">
              Connexion
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
    </Navbar>
  );
}