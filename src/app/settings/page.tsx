"use client";

import React, { useEffect, useState } from "react";
import { Card, CardBody, Button, Select, SelectItem, Switch } from "@heroui/react";
import { useApp } from "@/context/AppContext";

export default function SettingsPage() {
  const { user, logout, lang, setLang, resetApp } = useApp();
  
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  const handleFullReset = () => {
    if (window.confirm(lang === "fr" ? "Supprimer définitivement toutes vos données ?" : "Delete all data permanently?")) {
      resetApp();
      logout();
      window.location.href = "/";
    }
  };

  const t = {
    fr: {
      title: "PARAMÈTRES",
      langTitle: "Langue de l'interface",
      langDesc: "Choisir entre Français et Anglais",
      themeTitle: "Mode Sombre",
      themeDesc: "Passer en interface obscure",
      account: "Compte",
      logout: "Déconnexion",
      danger: "Réinitialisation",
      dangerDesc: "Supprimer toutes les données locales.",
      resetBtn: "Tout effacer"
    },
    en: {
      title: "SETTINGS",
      langTitle: "Interface Language",
      langDesc: "Choose between French and English",
      themeTitle: "Dark Mode",
      themeDesc: "Switch to dark interface",
      account: "Account",
      logout: "Logout",
      danger: "Reset Data",
      dangerDesc: "Delete all local data.",
      resetBtn: "Clear all"
    }
  }[lang as "fr" | "en"] || { title: "SETTINGS" };

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-8 pb-10 pt-10 px-4">
      <div className="flex flex-col gap-1">
        <h1 className="text-5xl font-[1000] italic uppercase tracking-tighter text-black dark:text-white transition-colors">
          {t.title}
        </h1>
        {user && <p className="text-blue-600 font-bold ml-1 tracking-widest uppercase">/ {user.username}</p>}
      </div>

      <div className="flex flex-col gap-4">
        
        <Card radius="sm" className="shadow-none border-b border-slate-100 dark:border-zinc-800 bg-transparent">
          <CardBody className="p-6 flex flex-row items-center justify-between">
            <div className="flex flex-col">
              <p className="text-lg font-bold dark:text-white">{t.langTitle}</p>
              <p className="text-small text-default-500">{t.langDesc}</p>
            </div>

            <Select 
              aria-label="Sélection de la langue"
              disallowEmptySelection
              selectedKeys={[lang]}
              onSelectionChange={(keys) => setLang(Array.from(keys)[0] as "fr" | "en")}
              className="w-40"
              variant="flat"
              selectorIcon={<span />}
              classNames={{
                trigger: "bg-white dark:bg-zinc-900 shadow-sm border border-slate-200 dark:border-zinc-800 rounded-xl px-4",
                value: "text-right font-semibold text-slate-700 dark:text-zinc-300",
                popoverContent: "bg-white dark:bg-zinc-900 rounded-xl border border-slate-200 dark:border-zinc-800 shadow-xl",
              }}
            >
              <SelectItem key="fr" textValue="Français" className="rounded-lg">Français</SelectItem>
              <SelectItem key="en" textValue="English" className="rounded-lg">English</SelectItem>
            </Select>
          </CardBody>
        </Card>

        <Card radius="sm" className="shadow-none border-b border-slate-100 dark:border-zinc-800 bg-transparent">
          <CardBody className="p-6 flex flex-row items-center justify-between">
            <div className="flex flex-col">
              <p className="text-lg font-bold dark:text-white">{t.themeTitle}</p>
              <p className="text-small text-default-500">{t.themeDesc}</p>
            </div>

            <Switch 
              isSelected={isDark} 
              onValueChange={setIsDark}
              color="primary"
              size="lg"
              startContent={<span>🌙</span>}
              endContent={<span>☀️</span>}
            />
          </CardBody>
        </Card>

        <Card radius="sm" className="shadow-sm border border-slate-100 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
          <CardBody className="p-6 flex flex-row items-center justify-between">
            <p className="text-lg font-bold dark:text-white">{t.account}</p>
            <Button 
              onPress={() => { logout(); window.location.href = "/"; }}
              className="bg-blue-600 text-white font-bold text-sm w-32 h-11 rounded hover:bg-blue-700 shadow-none"
            >
              {t.logout}
            </Button>
          </CardBody>
        </Card>

        <Card radius="sm" className="border-none bg-danger-50/30 dark:bg-danger-900/10">
          <CardBody className="flex flex-row items-center justify-between p-6">
            <div>
              <p className="text-lg font-bold text-danger">{t.danger}</p>
              <p className="text-small text-default-500">{t.dangerDesc}</p>
            </div>
            <Button 
              color="danger" 
              variant="flat" 
              onPress={handleFullReset} 
              className="font-bold rounded-md"
            >
              {t.resetBtn}
            </Button>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}