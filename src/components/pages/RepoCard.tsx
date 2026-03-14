"use client";

import React from "react";
import { Card, CardBody, Button, Chip, Link, Avatar } from "@heroui/react";
import { useApp, Repo } from "@/context/AppContext";

export const RepoCard = ({ repo, isFav }: { repo: Repo; isFav: boolean }) => {
  const { toggleFavorite, lang } = useApp(); 

  const t = {
    fr: {
      view: "Voir",
      status: "Global / Open Source"
    },
    en: {
      view: "View",
      status: "Global / Open Source" 
    }
  }[lang as "fr" | "en"] || { view: "Voir", status: "Global / Open Source" };

  const pillStyle = { borderRadius: "9999px" };

  return (
    <Card 
      style={{ borderRadius: "40px" }}
      className="p-2 border-none shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] transition-all bg-white"
    >
      <CardBody className="gap-5 p-4">
        <div className="flex justify-between items-start px-2">
          <div className="flex gap-4 items-center">
            <Avatar
              radius="full"
              size="lg"
              name={repo.language?.[0] || "R"}
              style={pillStyle}
              className="w-14 h-14 text-xl font-black bg-slate-100 text-slate-600"
            />
            <div>
              <h3 className="text-xl font-[1000] tracking-tighter line-clamp-1 text-slate-800">
                {repo.name}
              </h3>
              <p className="text-slate-400 text-sm font-bold uppercase tracking-tight">
                {repo.full_name.split('/')[0]}
              </p>
            </div>
          </div>
        </div>

        <div 
          style={{ borderRadius: "30px" }}
          className="bg-slate-50/80 p-6 space-y-3"
        >
          <div className="text-slate-500 font-bold text-sm tracking-tight italic">
            {t.status}
          </div>
          
          <div className="flex items-center gap-2 text-slate-700">
            <span className="text-amber-400 text-xl">★</span>
            <span className="font-[1000] text-xl tracking-tighter">
              {repo.stargazers_count.toLocaleString()}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {repo.language && (
              <Chip 
                radius="full" 
                style={pillStyle}
                className="bg-white shadow-sm font-black text-[11px] px-4 h-7 border-none text-slate-600"
              >
                {repo.language}
              </Chip>
            )}
            <Chip 
              radius="full" 
              style={pillStyle} 
              className="bg-white shadow-sm font-black text-[11px] px-4 h-7 border-none text-slate-600"
            >
              Microservices
            </Chip>
            <Chip 
              radius="full" 
              style={pillStyle} 
              className="bg-white shadow-sm font-black text-[11px] px-4 h-7 border-none text-slate-400"
            >
              +3
            </Chip>
          </div>
        </div>

        <div className="flex items-center gap-3 px-1">
          <Button
            isIconOnly
            variant="bordered"
            radius="full"
            style={pillStyle}
            className={`min-w-58px h-58px border-slate-100 text-xl transition-transform active:scale-90 ${
              isFav ? "bg-red-50 border-red-100 text-red-500" : "bg-white text-slate-300"
            }`}
            onPress={() => toggleFavorite(repo.id)}
          >
            {isFav ? "❤️" : "♡"}
          </Button>
          
          <Button
            as={Link}
            href={repo.html_url}
            isExternal
            radius="full"
            style={pillStyle}
            className="grow h-58px font-[1000] bg-[#5865F2] text-white uppercase italic tracking-tight shadow-xl shadow-blue-500/20 flex items-center justify-center px-0 text-lg"
          >
            {t.view}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};