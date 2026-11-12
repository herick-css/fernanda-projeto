"use client";

import { useState } from "react";

type Props = { horario: string; onVoltar: () => void };

export default function FormAgendamento({ horario, onVoltar }: Props) {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [praticou, setPraticou] = useState<"sim" | "nao" | "">("");
  const [lesao, setLesao] = useState("");
  const [sexo, setSexo] = useState<"Masculino" | "Feminino" | "">("");
  const [altura, setAltura] = useState("");
  const [peso, setPeso] = useState("");
  const [grupo, setGrupo] = useState<"Sozinho(a)" | "Em dupla" | "Em trio" | "">("");
  const [indicacao, setIndicacao] = useState("");

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    const numero = process.env.NEXT_PUBLIC_WHATSAPP ?? "";
    const texto = [
      `Olá! Quero agendar o horário: ${horario}`,
      `Nome: ${nome}`,
      `Idade: ${idade}`,
      `Sexo: ${sexo}`,
      altura.trim() && `Altura: ${altura.trim()}`,
      peso.trim() && `Peso: ${peso.trim()}`,
      `Vai treinar: ${grupo}`,
      `Já praticou atividade física: ${praticou === "sim" ? "Sim" : "Não"}`,
      `Lesões/limitações: ${lesao.trim() || "Nenhuma"}`,
      indicacao && `Indicação médica/fisioterapeuta: ${indicacao}`,
    ]
      .filter(Boolean) // campos opcionais em branco não entram na mensagem
      .join("\n");

    // Os dados vão direto para o WhatsApp do cliente; nada é guardado no servidor.
    window.open(
      `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  const campo =
    "mt-1 w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-white outline-none placeholder:text-white/30 focus:border-brand focus:ring-2 focus:ring-brand/20";

  return (
    <form onSubmit={enviar} className="mx-auto max-w-lg space-y-4 text-white">
      <button
        type="button"
        onClick={onVoltar}
        className="text-sm text-brand hover:underline"
      >
        Voltar e escolher outro horário
      </button>

      <p className="rounded-lg bg-brand/10 p-3 text-sm text-brand-light">
        Horário escolhido: <strong>{horario}</strong>
      </p>

      <label className="block text-sm font-medium text-white/85">
        Nome
        <input
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className={campo}
          autoComplete="name"
        />
      </label>

      <label className="block text-sm font-medium text-white/85">
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

      <fieldset className="text-sm font-medium text-white/85">
        <legend>Sexo</legend>
        <div className="mt-2 flex gap-6 font-normal">
          {(["Masculino", "Feminino"] as const).map((v) => (
            <label key={v} className="flex items-center gap-2">
              <input
                required
                type="radio"
                className="accent-brand"
                name="sexo"
                checked={sexo === v}
                onChange={() => setSexo(v)}
              />
              {v}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid grid-cols-2 gap-4">
        <label className="block text-sm font-medium text-white/85">
          Altura <span className="font-normal text-white/40">(opcional)</span>
          <input
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            className={campo}
            inputMode="decimal"
            placeholder="Ex.: 1,65 m"
          />
        </label>
        <label className="block text-sm font-medium text-white/85">
          Peso <span className="font-normal text-white/40">(opcional)</span>
          <input
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            className={campo}
            inputMode="decimal"
            placeholder="Ex.: 70 kg"
          />
        </label>
      </div>

      <fieldset className="text-sm font-medium text-white/85">
        <legend>Você treinará sozinho(a), em dupla ou em trio?</legend>
        <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 font-normal">
          {(["Sozinho(a)", "Em dupla", "Em trio"] as const).map((v) => (
            <label key={v} className="flex items-center gap-2">
              <input
                required
                type="radio"
                className="accent-brand"
                name="grupo"
                checked={grupo === v}
                onChange={() => setGrupo(v)}
              />
              {v}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="text-sm font-medium text-white/85">
        <legend>Já praticou atividade física antes?</legend>
        <div className="mt-2 flex gap-6 font-normal">
          {(["sim", "nao"] as const).map((v) => (
            <label key={v} className="flex items-center gap-2">
              <input
                required
                type="radio"
                className="accent-brand"
                name="praticou"
                checked={praticou === v}
                onChange={() => setPraticou(v)}
              />
              {v === "sim" ? "Sim" : "Não"}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block text-sm font-medium text-white/85">
        Possui alguma lesão ou limitação?
        <textarea
          rows={3}
          value={lesao}
          onChange={(e) => setLesao(e.target.value)}
          className={campo}
          placeholder="Se não, pode deixar em branco"
        />
      </label>

      <label className="block text-sm font-medium text-white/85">
        Está começando por indicação médica ou de fisioterapeuta?{" "}
        <span className="font-normal text-white/40">(opcional)</span>
        <select
          value={indicacao}
          onChange={(e) => setIndicacao(e.target.value)}
          className={`${campo} [&>option]:bg-[#101312]`}
        >
          <option value="">Prefiro não informar</option>
          <option value="Sim, médica">Sim, indicação médica</option>
          <option value="Sim, de fisioterapeuta">Sim, de fisioterapeuta</option>
          <option value="Sim, de ambos">Sim, dos dois</option>
          <option value="Não">Não</option>
        </select>
      </label>

      <button
        type="submit"
        className="w-full rounded-xl bg-brand py-3 font-bold text-black transition hover:bg-brand-light"
      >
        Enviar pelo WhatsApp
      </button>

      <p className="text-xs text-white/45">
        Ao clicar, o WhatsApp abrirá com a mensagem pronta para você enviar.
        Suas respostas não ficam armazenadas neste site.
      </p>
    </form>
  );
}
