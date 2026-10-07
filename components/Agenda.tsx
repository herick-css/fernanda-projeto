"use client";

import { useEffect, useState } from "react";
import type { Dia, Slot } from "@/lib/slots";
import FormAgendamento from "./FormAgendamento";

type Escolha = { dia: Dia; slot: Slot };

export default function Agenda() {
  const [dias, setDias] = useState<Dia[] | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [diaAtivo, setDiaAtivo] = useState(0);
  const [escolha, setEscolha] = useState<Escolha | null>(null);

  useEffect(() => {
    fetch("/api/horarios")
      .then(async (r) => {
        const json = await r.json();
        if (!r.ok) throw new Error(json.erro ?? "Erro ao carregar horários.");
        setDias(json.dias as Dia[]);
      })
      .catch((e: Error) => setErro(e.message));
  }, []);

  if (erro) {
    return <p className="rounded-lg bg-red-50 p-4 text-red-700">{erro}</p>;
  }
  if (!dias) {
    return <p className="text-slate-500">Carregando horários…</p>;
  }
  if (dias.length === 0) {
    return <p className="text-slate-500">Nenhum horário disponível no momento.</p>;
  }

  if (escolha) {
    return (
      <FormAgendamento
        horario={`${escolha.dia.label} às ${escolha.slot.hora}`}
        onVoltar={() => setEscolha(null)}
      />
    );
  }

  const dia = dias[diaAtivo];

  return (
    <div>
      <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-3" role="tablist">
        {dias.map((d, i) => {
          const livres = d.slots.filter((s) => s.livre).length;
          return (
            <button
              key={d.data}
              role="tab"
              aria-selected={i === diaAtivo}
              onClick={() => setDiaAtivo(i)}
              className={`shrink-0 rounded-xl border px-4 py-2 text-sm capitalize transition ${
                i === diaAtivo
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : "border-slate-200 bg-white hover:border-emerald-400"
              }`}
            >
              <span className="block font-medium">{d.label}</span>
              <span className="block text-xs opacity-80">
                {livres > 0 ? `${livres} livre${livres > 1 ? "s" : ""}` : "lotado"}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
        {dia.slots.map((s) => (
          <button
            key={s.inicio}
            disabled={!s.livre}
            onClick={() => setEscolha({ dia, slot: s })}
            className={`rounded-lg border py-3 text-sm font-medium transition ${
              s.livre
                ? "border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
                : "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400 line-through"
            }`}
          >
            {s.hora}
          </button>
        ))}
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Verde = disponível · Cinza = ocupado. Ao escolher um horário você preenche
        um breve formulário e confirma a conversa pelo WhatsApp.
      </p>
    </div>
  );
}
