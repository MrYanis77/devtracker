"use client";

import React, { useState } from "react";
import { 
  Card, 
  CardBody, 
  Input, 
  Button, 
  Tabs, 
  Tab, 
  CardHeader
} from "@heroui/react";
import { useApp } from "@/Context/AppContext";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  const { login } = useApp();
  const router = useRouter();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleAction = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (username.trim().length < 3 || password.length < 4) {
      setError("Identifiants trop courts.");
      return;
    }
    
    // login renvoie true si succès, false si mauvais mot de passe
    const success = login(username, password);
    
    if (success) {
      router.push("/trending");
    } else {
      setError("Mot de passe incorrect pour cet utilisateur.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <Card className="w-full max-w-[400px] shadow-2xl">
        <CardHeader className="flex flex-col gap-1 items-center pt-8">
          <h1 className="text-3xl font-black uppercase italic tracking-tighter text-primary">
            DevTracker
          </h1>
          <p className="text-default-500 text-small">Gérez votre veille technique</p>
        </CardHeader>
        <CardBody className="overflow-hidden p-6">
          <Tabs
            fullWidth
            size="lg"
            aria-label="Options d'accès"
            variant="underlined"
            color="primary"
            onSelectionChange={() => setError("")} // Reset l'erreur au changement d'onglet
          >
            {/* --- CONNEXION --- */}
            <Tab key="connexion" title="Connexion">
              <form onSubmit={handleAction} className="flex flex-col gap-4 mt-4">
                <Input
                  isRequired
                  label="Nom d'utilisateur"
                  placeholder="Entrez votre pseudo"
                  variant="bordered"
                  value={username}
                  onValueChange={setUsername}
                />
                <Input
                  isRequired
                  label="Mot de passe"
                  placeholder="••••••••"
                  variant="bordered"
                  type={isVisible ? "text" : "password"}
                  value={password}
                  onValueChange={setPassword}
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                      {isVisible ? "👁️" : "🙈"}
                    </button>
                  }
                />
                {error && <p className="text-tiny text-danger font-bold">{error}</p>}
                <Button type="submit" color="primary" className="font-bold uppercase">
                  Se connecter
                </Button>
              </form>
            </Tab>

            {/* --- INSCRIPTION --- */}
            <Tab key="inscription" title="Inscription">
              <form onSubmit={handleAction} className="flex flex-col gap-4 mt-4">
                <Input
                  isRequired
                  label="Choisir un pseudo"
                  placeholder="Ex: DevMaster99"
                  variant="bordered"
                  value={username}
                  onValueChange={setUsername}
                />
                <Input
                  isRequired
                  label="Créer un mot de passe"
                  placeholder="Minimum 4 caractères"
                  variant="bordered"
                  type={isVisible ? "text" : "password"}
                  value={password}
                  onValueChange={setPassword}
                />
                <p className="text-tiny text-default-400 px-1">
                  Un nouveau compte sera créé si le pseudo n'existe pas.
                </p>
                <Button type="submit" color="secondary" className="font-bold uppercase">
                  Créer mon compte
                </Button>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}