"use client";

import React from "react";
import { Select, SelectItem, Skeleton, Card } from "@heroui/react";
import { useApp } from "@/context/AppContext";
import { RepoCard } from "@/components/pages/RepoCard";

export default function TrendingPage() {
  const { repos, loading, error, favorites, setFilter, lang } = useApp(); 

  const t = {
    fr: {
      title: "Trending",
      subtitle: "Découvrez les pépites Open Source du moment.",
      placeholder: "Choisir un langage",
      all: "Tous les langages",
    },
    en: {
      title: "Trending",
      subtitle: "Discover the latest Open Source gems.",
      placeholder: "Choose a language",
      all: "All Languages",
    }
  }[lang as "fr" | "en"] || { title: "Trending" };

  const LANGUAGES = [
    { label: t.all, value: "all" },
    { label: "JavaScript", value: "javascript" },
    { label: "TypeScript", value: "typescript" },
    { label: "Python", value: "python" },
    { label: "Rust", value: "rust" },
  ];

  if (error) return <div className="p-20 text-center text-red-500 font-black uppercase italic">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto p-6 pt-10 space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 relative z-20">
        <div className="space-y-1">
          <h1 className="text-7xl font-[1000] italic uppercase tracking-tighter text-[#1e40af] leading-none">
            {t.title}
          </h1>
          <p className="text-slate-400 font-bold text-lg ml-1">
            {t.subtitle}
          </p>
        </div>

        <Select 
          placeholder={t.placeholder}
          className="max-w-280"
          variant="bordered"
          disallowEmptySelection
          defaultSelectedKeys={["all"]}
          startContent={<span className="text-slate-400">🌐</span>}
          selectorIcon={<span className="text-slate-300 text-xs">⌵</span>}
          classNames={{
            base: "bg-transparent",
            trigger: [
              "bg-white",
              "border-slate-200",
              "h-14",
              "px-4",
              "rounded-2xl",
              "shadow-sm",
              "hover:border-slate-300",
              "data-[open=true]:border-blue-500",
              "transition-colors"
            ].join(" "),
            value: "font-semibold text-slate-700 text-sm ml-2",
            popoverContent: [
              "rounded-2xl",
              "border-slate-100",
              "shadow-2xl",
              "bg-white",
              "mt-2"
            ].join(" "),
          }}
          onSelectionChange={(keys) => {
            const val = Array.from(keys)[0] as string;
            setFilter(val === "all" ? "" : val);
          }}
        >
          {LANGUAGES.map((langItem) => (
            <SelectItem 
              key={langItem.value} 
              textValue={langItem.label} 
              className="py-3 px-4 rounded-xl data-[hover=true]:bg-slate-50 border-b border-slate-50 last:border-none"
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-medium text-slate-600">{langItem.label}</span>
              </div>
            </SelectItem>
          ))}
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="h-480px rounded-40px p-2 border-none shadow-none bg-slate-50">
              <Skeleton className="rounded-[35px] h-full w-full opacity-50" />
            </Card>
          ))
        ) : (
          repos.map((repo) => (
            <RepoCard key={repo.id} repo={repo} isFav={favorites.includes(repo.id)} />
          ))
        )}
      </div>
    </div>
  );
}