"use client";

import React from "react";
import { Button, Card, CardBody } from "@heroui/react";
import { useApp } from "@/context/AppContext";
import NextLink from "next/link";

export default function Home() {
  const { lang } = useApp();

  const t = {
    hero: "TON DASHBOARD DE DÉVELOPPEUR.",
    sub: "Suivez les tendances GitHub, gérez vos notes techniques et optimisez votre veille technologique au même endroit.",
    getStarted: "Commencer l'aventure",
    features: [
      { 
        title: "Trending", 
        desc: "Les meilleurs dépôts GitHub filtrés par langage en temps réel.", 
        icon: "🚀" 
      },
      { 
        title: "Notes", 
        desc: "Gardez une trace de vos apprentissages et de vos snippets favoris.", 
        icon: "📝" 
      },
      { 
        title: "Favoris", 
        desc: "Sauvegardez les pépites Open Source pour ne plus jamais les perdre.", 
        icon: "❤️" 
      }
    ]
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-white flex flex-col items-center justify-center px-6 overflow-hidden">
    
      <div className="max-w-5xl text-center space-y-8 relative z-10">
        <h1 className="text-6xl md:text-9xl font-[1000] italic uppercase tracking-tighter text-slate-900 leading-[0.85]">
          {t.hero.split(' ').map((word, i) => (
            <span key={i} className={word.includes("DÉVELOPPEUR") ? "text-blue-600" : ""}>
              {word}{" "}
            </span>
          ))}
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-400 font-bold max-w-2xl mx-auto leading-tight">
          {t.sub}
        </p>

        <div className="pt-8">
          <Button 
            as={NextLink}
            href="/trending"
            className="bg-blue-600 text-white font-[1000] italic uppercase text-2xl px-16 h-20 rounded-full shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:scale-105 transition-transform"
          >
            {t.getStarted}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-32 max-w-6xl w-full relative z-10">
        {t.features.map((f, i) => (
          <Card key={i} shadow="none" className="bg-slate-50 border border-slate-100 rounded-40px p-6 hover:bg-slate-100 transition-colors">
            <CardBody className="flex flex-col gap-4">
              <div className="bg-white w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shadow-sm">
                {f.icon}
              </div>
              <h3 className="text-2xl font-black uppercase italic tracking-tighter text-slate-800">
                {f.title}
              </h3>
              <p className="text-slate-500 font-bold leading-snug">
                {f.desc}
              </p>
            </CardBody>
          </Card>
        ))}
      </div>
      <div className="fixed top-1/4 -right-20 w-600px h-600px bg-blue-100 rounded-full blur-[140px] -z-10 opacity-40 animate-pulse" />
      <div className="fixed -bottom-20 -left-20 w-500px h-500px bg-slate-200 rounded-full blur-[120px] -z-10 opacity-30" />
    </div>
  );
}