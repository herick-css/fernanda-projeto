"use client";

import { useState } from "react";
import { escolherPlano, type Grupo } from "@/lib/planoEscolhido";

// Configure os planos aqui.
// - preco: deixe "" para mostrar "Valor a definir" (ex.: "R$ 250")
// - desconto: aparece como selo quando preenchido (ex.: "15% off por pessoa")
// - grupo: opção que já vem marcada no formulário ao clicar no botão do plano
// - selo: texto que fica sempre em cima do card (ex.: "Melhor custo-benefício")
// Todos os cards começam iguais; o destaque aparece ao passar o mouse ou clicar.
type Plano = {
  nome: string;
  grupo: Grupo;
  pessoas: string;
  frase: string;
  preco: string;
  periodo: string;
  desconto: string;
  itens: string[];
  selo?: string;
};

const planos: Plano[] = [
  {
    nome: "Solo",
    grupo: "Sozinho(a)",
    pessoas: "1 pessoa",
    frase: "Atenção total em você, do aquecimento ao último exercício.",
    preco: "",
    periodo: "/mês",
    desconto: "",
    itens: [
      "Treino montado para o seu objetivo",
      "Acompanhamento em todas as sessões",
      "Ajustes no treino ao longo do mês",
    ],
  },
  {
    nome: "Dupla",
    grupo: "Em dupla",
    pessoas: "2 pessoas",
    frase: "Treine com quem te motiva e pague menos por pessoa.",
    preco: "",
    periodo: "/mês por pessoa",
    desconto: "",
    itens: [
      "Tudo do plano Solo",
      "Sessões em conjunto com quem você escolher",
      "Desconto no valor por pessoa",
    ],
    selo: "Melhor custo-benefício",
  },
  {
    nome: "Trio",
    grupo: "Em trio",
    pessoas: "3 pessoas",
    frase: "Junte a turma: mais energia no treino e o maior desconto.",
    preco: "",
    periodo: "/mês por pessoa",
    desconto: "",
    itens: [
      "Tudo do plano Solo",
      "Sessões em grupo de até três pessoas",
      "O maior desconto por pessoa",
    ],
  },
];

function Check() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="mt-0.5 size-4 shrink-0 text-brand"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 8.5l3 3 7-7" />
    </svg>
  );
}

export default function Planos() {
  // Card escolhido com clique/toque (no celular não existe hover).
  const [ativo, setAtivo] = useState<string | null>(null);

  return (
    <div className="mt-12 grid gap-8 md:grid-cols-3 md:items-stretch">
      {planos.map((plano) => (
        <article
          key={plano.nome}
          data-ativo={ativo === plano.nome}
          onClick={() => setAtivo(plano.nome)}
          className="group relative flex cursor-pointer flex-col rounded-3xl border border-white/10 bg-white/3 p-7 transition-[translate,border-color,background-color,box-shadow] duration-300 ease-out hover:-translate-y-1.5 hover:border-brand/60 hover:bg-brand/6 hover:shadow-[0_0_60px_-20px_var(--color-brand)] focus-within:border-brand/60 focus-within:bg-brand/6 data-[ativo=true]:-translate-y-1.5 data-[ativo=true]:border-brand/60 data-[ativo=true]:bg-brand/6 data-[ativo=true]:shadow-[0_0_60px_-20px_var(--color-brand)] motion-reduce:translate-y-0! motion-reduce:transition-none"
        >
          {plano.selo && (
            <span className="absolute -top-3 left-7 rounded-full bg-brand px-3 py-1 text-xs font-bold text-black">
              {plano.selo}
            </span>
          )}

          <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">
            {plano.pessoas}
          </p>
          <h3 className="mt-2 text-3xl font-bold text-white">{plano.nome}</h3>
          <p className="mt-3 text-sm leading-relaxed text-white/60">
            {plano.frase}
          </p>

          <div className="mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            {plano.preco ? (
              <>
                <span className="text-4xl font-black text-white">
                  {plano.preco}
                </span>
                <span className="text-sm text-white/50">{plano.periodo}</span>
              </>
            ) : (
              <span className="text-xl font-semibold text-white/40">
                Valor a definir
              </span>
            )}
          </div>
          {plano.desconto && (
            <span className="mt-3 w-fit rounded-full border border-brand/40 px-3 py-1 text-xs font-semibold text-brand">
              {plano.desconto}
            </span>
          )}

          <ul className="mt-6 space-y-3 border-t border-white/10 pt-6 text-sm text-white/80">
            {plano.itens.map((item) => (
              <li key={item} className="flex gap-3">
                <Check />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-8">
            <a
              href="#horarios"
              onClick={() => escolherPlano(plano.grupo)}
              className="block rounded-xl border border-white/15 py-3 text-center font-bold text-white transition-colors duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-black group-focus-within:border-brand group-focus-within:bg-brand group-focus-within:text-black group-data-[ativo=true]:border-brand group-data-[ativo=true]:bg-brand group-data-[ativo=true]:text-black hover:bg-brand-light!"
            >
              Agendar com o plano {plano.nome}
            </a>
          </div>
        </article>
      ))}
    </div>
  );
}
