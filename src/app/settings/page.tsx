"use client";

import React, { useState } from "react";
import { 
  Card, CardHeader, CardBody, Button, Input, Switch, 
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure 
} from "@heroui/react";
import { useApp } from "@/Context/AppContext";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const { user, login, logout } = useApp();
  const { theme, setTheme } = useTheme();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  
  const [newUsername, setNewUsername] = useState(user?.username || "");

  const handleUpdateProfile = () => {
    if (newUsername.trim()) {
      // On simule une mise à jour en ré-appelant login
      login(newUsername, "password_placeholder"); 
      alert("Pseudo mis à jour !");
    }
  };

  const handleFullReset = () => {
    localStorage.clear(); // Supprime tout : comptes, notes, thèmes
    logout();
    router.push("/connexion");
  };

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6">
      <h1 className="text-3xl font-black uppercase italic tracking-tighter">
        Paramètres
      </h1>

      {/* APPARENCE */}
      <Card>
        <CardBody className="flex flex-row items-center justify-between p-6">
          <div>
            <p className="text-lg font-bold">Mode Sombre</p>
            <p className="text-small text-default-500">Activer ou désactiver le thème dark.</p>
          </div>
          <Switch 
            isSelected={theme === "dark"} 
            onValueChange={(isDark) => setTheme(isDark ? "dark" : "light")}
            color="secondary"
            size="lg"
          />
        </CardBody>
      </Card>

      {/* PROFIL */}
      <Card>
        <CardHeader className="px-6 pt-6 flex flex-col items-start">
          <p className="text-lg font-bold">Profil Utilisateur</p>
        </CardHeader>
        <CardBody className="px-6 pb-6 flex flex-col gap-4">
          <Input 
            label="Changer le nom d'utilisateur" 
            variant="bordered"
            value={newUsername}
            onValueChange={setNewUsername}
          />
          <Button color="primary" onPress={handleUpdateProfile} className="font-bold">
            Enregistrer
          </Button>
        </CardBody>
      </Card>

      {/* DANGER ZONE */}
      <Card className="border-none bg-danger-50/20">
        <CardBody className="flex flex-row items-center justify-between p-6">
          <div>
            <p className="text-lg font-bold text-danger">Réinitialisation</p>
            <p className="text-small text-default-500">Supprimer toutes les données locales.</p>
          </div>
          <Button color="danger" variant="flat" onPress={onOpen}>
            Tout effacer
          </Button>
        </CardBody>
      </Card>

      {/* MODAL DE CONFIRMATION */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Confirmation</ModalHeader>
              <ModalBody>
                Attention, cette action supprimera définitivement votre compte, vos notes et vos favoris.
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>Annuler</Button>
                <Button color="danger" onPress={handleFullReset}>Confirmer le Reset</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}