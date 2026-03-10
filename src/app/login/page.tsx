"use client";

import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardBody, Input, Button, Link } from '@heroui/react';
import NextLink from 'next/link';

export default function LoginPage() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  
  // On récupère 'user' en plus de 'login' et 'loading'
  const { login, loading, user } = useAppContext();
  const router = useRouter();

  // Correction 1 : Utiliser un useEffect pour rediriger dès que l'utilisateur est connecté
  useEffect(() => {
    if (user) {
      router.push('/');
      router.refresh(); // Force Next.js à rafraîchir la Navbar
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      // Correction 2 : Vérification locale simple avant l'appel
      if (!formData.username || !formData.password) {
        setError("Veuillez remplir tous les champs");
        return;
      }

      await login(formData.username, formData.password);
      // On ne met pas le router.push ici, le useEffect s'en occupe !
      
    } catch (err: any) {
      setError(err.message || "Identifiants invalides");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <Card className="w-full max-w-[400px] p-4 shadow-xl border-none">
        <CardHeader className="flex flex-col gap-1 items-center pb-0">
          <h1 className="text-2xl font-black italic uppercase tracking-tighter">Connexion</h1>
          <p className="text-small text-default-500">Accédez à ACME DEV</p>
        </CardHeader>
        <CardBody className="py-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <Input
              isRequired
              label="Nom d'utilisateur"
              labelPlacement="outside"
              placeholder="Entrez votre pseudo"
              variant="bordered"
              value={formData.username}
              onValueChange={(v) => setFormData({...formData, username: v})}
              classNames={{ label: "font-bold" }}
            />
            <Input
              isRequired
              label="Mot de passe"
              labelPlacement="outside"
              type="password"
              placeholder="••••••••"
              variant="bordered"
              value={formData.password}
              onValueChange={(v) => setFormData({...formData, password: v})}
              classNames={{ label: "font-bold" }}
            />

            {error && (
              <div className="bg-danger-50 text-danger p-3 rounded-medium text-xs font-medium border border-danger-100 animate-appearance-in">
                {error}
              </div>
            )}

            <Button 
              color="primary" 
              type="submit" 
              isLoading={loading} 
              fullWidth 
              size="lg"
              className="font-bold shadow-lg shadow-primary/30"
            >
              Se connecter
            </Button>

            <p className="text-center text-small mt-2">
              Pas de compte ?{" "}
              <Link as={NextLink} href="/register" size="sm" className="font-bold">
                Créer un compte
              </Link>
            </p>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}