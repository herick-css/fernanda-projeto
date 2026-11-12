"use client";

import { useEffect, useState } from "react";
import { config } from "@/lib/config";
import type { Dia, Slot } from "@/lib/slots";
import FormAgendamento from "./FormAgendamento";

type Escolha = { dia: Dia; slot: Slot };

const dataPorExtenso = new Intl.DateTimeFormat("pt-BR", {
  timeZone: config.timeZone,
  weekday: "long",
  day: "numeric",
  month: "long",
});

// "sexta-feira, 13 de novembro" -> "Sexta, 13 de novembro"
function tituloDoDia(data: string) {
  const texto = dataPorExtenso
    .format(new Date(`${data}T12:00:00${config.utcOffset}`))
    .replace("-feira", "");
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}

const maiuscula = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

export default function Agenda() {
  const [dias, setDias] = useState<Dia[] | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [diaAtivo, setDiaAtivo] = useState(0);
  const [selecionado, setSelecionado] = useState<Slot | null>(null);
  const [escolha, setEscolha] = useState<Escolha | null>(null);

  useEffect(() => {
    fetch("/api/horarios")
      .then(async (r) => {
        const json = await r.json();
        if (!r.ok) throw new Error(json.erro ?? "Erro ao carregar horários.");
        const lista = json.dias as Dia[];
        setDias(lista);
        // Abre no primeiro dia que tem expediente (pula a folga).
        setDiaAtivo(Math.max(0, lista.findIndex((d) => d.slots.length > 0)));
      })
      .catch((e: Error) => setErro(e.message));
  }, []);

  if (erro) {
    return (
      <p className="rounded-xl border border-red-400/30 bg-red-500/10 p-4 text-red-200">
        {erro}
      </p>
    );
  }
  if (!dias) {
    return <p className="p-2 text-white/50">Carregando horários…</p>;
  }
  if (!dias.some((d) => d.slots.length > 0)) {
    return (
      <p className="p-2 text-white/50">Nenhum horário disponível no momento.</p>
    );
  }

  if (escolha) {
    return (
      <FormAgendamento
        horario={`${maiuscula(escolha.dia.label)} às ${escolha.slot.hora}`}
        onVoltar={() => setEscolha(null)}
      />
    );
  }

  const dia = dias[diaAtivo];
  const livres = dia.slots.filter((s) => s.livre).length;

  function trocarDia(i: number) {
    setDiaAtivo(i);
    setSelecionado(null);
  }

  return (
    <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-6">
      {/* Dias: chips roláveis no celular, lista vertical a partir do md */}
      <div
        role="tablist"
        aria-label="Dias da semana"
        className="-mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] md:mx-0 md:flex-col md:overflow-visible md:px-0 md:pb-0"
      >
        {dias.map((d, i) => {
          const folga = d.slots.length === 0;
          const qtd = d.slots.filter((s) => s.livre).length;
          const ativo = i === diaAtivo;
          return (
            <button
              key={d.data}
              role="tab"
              aria-selected={ativo}
              disabled={folga}
              onClick={() => trocarDia(i)}
              className={`flex shrink-0 snap-start items-center justify-between gap-4 rounded-full px-4 py-2 text-sm font-semibold transition md:w-full md:rounded-xl md:py-3 ${
                ativo
                  ? "bg-brand text-black"
                  : folga
                    ? "cursor-not-allowed text-white/25"
                    : "bg-white/5 text-white/80 hover:bg-white/10"
              }`}
            >
              <span>{maiuscula(d.label)}</span>
              <span
                className={`hidden text-xs font-normal md:inline ${ativo ? "" : "opacity-60"}`}
              >
                {folga
                  ? "folga"
                  : qtd > 0
                    ? `${qtd} livre${qtd > 1 ? "s" : ""}`
                    : "lotado"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Horários do dia escolhido */}
      <div className="flex flex-col rounded-2xl bg-white/5 p-5">
        <p className="text-sm text-white/50">{tituloDoDia(dia.data)}</p>
        <p className="mt-1 text-xl font-bold text-white">
          {livres > 0
            ? `${livres} horário${livres > 1 ? "s" : ""} livre${livres > 1 ? "s" : ""}`
            : "Dia lotado"}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {dia.slots.map((s) => {
            const ativo = selecionado?.inicio === s.inicio;
            return (
              <button
                key={s.inicio}
                disabled={!s.livre}
                aria-pressed={ativo}
                onClick={() => setSelecionado(s)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  ativo
                    ? "bg-brand text-black"
                    : s.livre
                      ? "border border-brand/50 text-brand hover:bg-brand/10"
                      : "cursor-not-allowed bg-white/5 text-white/25 line-through"
                }`}
              >
                {s.hora}
              </button>
            );
          })}
        </div>

        <div className="mt-6 md:mt-auto md:pt-6">
        <button
          disabled={!selecionado}
          onClick={() => selecionado && setEscolha({ dia, slot: selecionado })}
          className="w-full rounded-xl bg-brand py-3 font-bold text-black transition hover:bg-brand-light disabled:cursor-not-allowed disabled:bg-white/10 disabled:text-white/40"
        >
          {selecionado ? `Continuar com ${selecionado.hora}` : "Escolha um horário"}
        </button>
        </div>
      </div>
    </div>
  );
}
