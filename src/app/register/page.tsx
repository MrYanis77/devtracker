"use client";

import React, { useState } from 'react';
import { Card, CardHeader, CardBody, Input, Button, Link } from '@heroui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulation d'inscription
    setTimeout(() => {
      setLoading(false);
      router.push('/login');
    }, 1500);
  };

  return (
    <div className="flex justify-center items-center min-h-[80vh] px-4">
      <Card className="w-full max-w-[400px] p-4">
        <CardHeader className="flex flex-col gap-1 items-center">
          <h1 className="text-2xl font-bold">Inscription</h1>
          <p className="text-small text-default-500">Rejoignez la communauté ACME</p>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <Input isRequired label="Pseudo" variant="bordered" />
            <Input isRequired label="Email" type="email" variant="bordered" />
            <Input isRequired label="Mot de passe" type="password" variant="bordered" />
            <Button color="primary" type="submit" isLoading={loading} fullWidth>
              Créer mon compte
            </Button>
            <p className="text-center text-small">
              Déjà inscrit ? <Link as={NextLink} href="/login" size="sm">Se connecter</Link>
            </p>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}