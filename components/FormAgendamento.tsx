"use client";

import { useState } from "react";

type Props = { horario: string; onVoltar: () => void };

export default function FormAgendamento({ horario, onVoltar }: Props) {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [praticou, setPraticou] = useState<"sim" | "nao" | "">("");
  const [lesao, setLesao] = useState("");

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    const numero = process.env.NEXT_PUBLIC_WHATSAPP ?? "";
    const texto = [
      `Olá! Quero agendar o horário: ${horario}`,
      `Nome: ${nome}`,
      `Idade: ${idade}`,
      `Já praticou atividade física: ${praticou === "sim" ? "Sim" : "Não"}`,
      `Lesões/limitações: ${lesao.trim() || "Nenhuma"}`,
    ].join("\n");

    // Os dados vão direto para o WhatsApp do cliente; nada é guardado no servidor.
    window.open(
      `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  const campo =
    "mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

  return (
    <form onSubmit={enviar} className="mx-auto max-w-lg space-y-4">
      <button
        type="button"
        onClick={onVoltar}
        className="text-sm text-emerald-700 hover:underline"
      >
        ← Escolher outro horário
      </button>

      <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-900">
        Horário escolhido: <strong className="capitalize">{horario}</strong>
      </p>

      <label className="block text-sm font-medium">
        Nome
        <input
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className={campo}
          autoComplete="name"
        />
      </label>

      <label className="block text-sm font-medium">
        Idade
        <input
          required
          type="number"
          min={10}
          max={110}
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          className={campo}
          inputMode="numeric"
        />
      </label>

      <fieldset className="text-sm font-medium">
        <legend>Já praticou atividade física antes?</legend>
        <div className="mt-2 flex gap-6 font-normal">
          {(["sim", "nao"] as const).map((v) => (
            <label key={v} className="flex items-center gap-2">
              <input
                required
                type="radio"
                name="praticou"
                checked={praticou === v}
                onChange={() => setPraticou(v)}
              />
              {v === "sim" ? "Sim" : "Não"}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block text-sm font-medium">
        Possui alguma lesão ou limitação?
        <textarea
          rows={3}
          value={lesao}
          onChange={(e) => setLesao(e.target.value)}
          className={campo}
          placeholder="Se não, pode deixar em branco"
        />
      </label>

      <button
        type="submit"
        className="w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700"
      >
        Enviar pelo WhatsApp
      </button>

      <p className="text-xs text-slate-500">
        Ao clicar, o WhatsApp abrirá com a mensagem pronta para você enviar.
        Suas respostas não ficam armazenadas neste site.
      </p>
    </form>
  );
}
