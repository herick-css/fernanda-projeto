import Agenda from "@/components/Agenda";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import TrabalhosGrid from "@/components/TrabalhosGrid";
import FotoFernanda from "@/components/FotoFernanda";
import BokehBackground from "@/components/BokehBackground";
import HeadingSobre from "@/components/HeadingSobre";
import Academia from "@/components/academia/Academia";
import Footer from "@/components/Footer";
import Planos from "@/components/Planos";
import { config } from "@/lib/config";
import { resumoExpediente } from "@/lib/expediente";

const links = [
  { href: "#sobre-mim", label: "Sobre mim" },
  { href: "#trabalhos", label: "Trabalhos" },
  { href: "#galeria", label: "Galeria" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#horarios", label: "Agendar horário" },
  { href: "#contato", label: "Contato" },
];

const trabalhos = [
  {
    numero: "01",
    titulo: "Treino personalizado",
    texto:
      "Um planejamento construído a partir dos seus objetivos, da sua rotina e do seu nível de experiência.",
  },
  {
    numero: "02",
    titulo: "Acompanhamento",
    texto:
      "Orientação durante os exercícios, atenção à execução e ajustes ao longo do treinamento.",
  },
  {
    numero: "03",
    titulo: "Evolução contínua",
    texto:
      "Um processo de acompanhamento para revisar o treino e construir consistência na sua rotina.",
  },
];

// Textos dos passos do agendamento (gerados a partir do expediente em lib/config.ts).
const passos = [
  {
    titulo: "Escolha o dia",
    texto: resumoExpediente()
      .map((e) => `${e.dias}, das ${e.faixas}`)
      .join(" · "),
  },
  { titulo: "Escolha o horário", texto: `Sessões de ${config.duracaoMin} minutos` },
  { titulo: "Confirme no WhatsApp", texto: "Um formulário rápido e a mensagem já sai pronta" },
];

export default function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <main id="conteudo">
        <section
          id="sobre-mim"
          data-dark
          aria-labelledby="titulo-sobre"
          className="relative isolate z-0 section-anchor overflow-x-clip bg-[#101312] text-white"
        >
          <BokehBackground />

          <ScrollReveal
            id="sobre-mim-conteudo"
            className="relative z-10 min-h-[calc(100dvh-var(--navbar-height,0px))] flex items-stretch *:flex"
          >
            <div className="section-container w-full grid items-end gap-10 pb-0 md:grid-cols-2 md:gap-16">
              <div className="self-center">
                <p className="eyebrow">Sobre mim</p>

                <HeadingSobre />
                <p className="mt-6 text-lg font-semibold">
                  Fernanda Bezerra · Personal Trainer
                </p>
                <p className="mt-4 max-w-lg leading-relaxed text-white/65">
                  Treinamento personalizado com atenção aos seus objetivos e à
                  sua rotina. Conheça meu trabalho e consulte os horários para
                  conversarmos sobre seu próximo passo.
                </p>
                <p className="mt-4 text-sm text-white/45">
                  Biografia, formação e CREF serão adicionados aqui.
                </p>
                <a
                  href="#horarios"
                  className="mt-8 inline-flex rounded-lg bg-brand px-6 py-3 font-bold text-black transition hover:bg-brand-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                >
                  Consultar horários
                </a>
              </div>

              <FotoFernanda />
            </div>
          </ScrollReveal>
        </section>

        <ScrollReveal
          id="mentoria"
          aria-labelledby="titulo-trabalhos"
          className="relative section-anchor bg-[#f6f8f7] z-10 min-h-[calc(100dvh-var(--navbar-height,0px))]  flex items-center"
        >
          <div className="section-container">
            <p className="eyebrow">Mentoria</p>
            <h2 id="titulo-trabalhos" className="section-title">
              Treino com propósito.
            </h2>
            <p className="section-description">
              Um corpo sauvadel e uma mente pronta para treinos não se constrói
              sem um planejamento ou orientação adequada, por isso que treinando
              comigo, seguiremos um modelo de:
            </p>
            <Academia />
          </div>
        </ScrollReveal>

        <section
          id="depoimentos"
          data-dark
          aria-labelledby="titulo-depoimentos"
          className="section-anchor flex min-h-[calc(100dvh-var(--navbar-height,0px))] items-center bg-[#101312] text-white"
        >
          <div className="section-container w-full">
            <p className="eyebrow">Depoimentos</p>
            <h2 id="titulo-depoimentos" className="section-title">
              Quem treina, conta.
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-white/60">
              Este espaço receberá relatos reais de alunos sobre a experiência
              de treinar com a Fernanda.
            </p>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex min-h-64 flex-col rounded-3xl border border-white/10 bg-white/3 p-8"
                >
                  <span aria-hidden="true" className="text-6xl leading-none text-brand">
                    “
                  </span>
                  <p className="mt-3 leading-relaxed text-white/50">
                    Depoimento a adicionar.
                  </p>
                  <p className="mt-auto pt-6 text-sm text-white/40">Nome do aluno</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="galeria"
          aria-labelledby="titulo-galeria"
          className="section-anchor flex min-h-[calc(100dvh-var(--navbar-height,0px))] items-center bg-white"
        >
          <div className="section-container w-full">
            <p className="eyebrow">Galeria</p>
            <h2 id="titulo-galeria" className="section-title">
              Histórias de evolução.
            </h2>
            <p className="section-description">
              Espaço para registros de antes e depois, com autorização dos
              alunos.
            </p>
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {[1, 2].map((item) => (
                <figure
                  key={item}
                  className="overflow-hidden rounded-2xl border border-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="grid grid-cols-2 gap-px bg-slate-200">
                    {["Antes", "Depois"].map((label) => (
                      <div
                        key={label}
                        className="relative flex aspect-3/4 items-center justify-center bg-[#f1f5f3] p-4"
                      >
                        <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold">
                          {label}
                        </span>
                        <p className="text-center text-sm text-slate-400">
                          Foto a adicionar
                        </p>
                      </div>
                    ))}
                  </div>
                  <figcaption className="p-5 text-sm text-slate-500">
                    Registro {item} · Fotos e descrição serão adicionadas.
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>


        <section
          id="planos"
          data-dark
          aria-labelledby="titulo-planos"
          className="section-anchor flex min-h-[calc(100dvh-var(--navbar-height,0px))] items-center bg-[#101312] text-white"
        >
          <div className="section-container w-full">
            <p className="eyebrow">Planos</p>
            <h2 id="titulo-planos" className="section-title">
              Escolha como você quer treinar.
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-white/60">
              Sozinho(a), em dupla ou em trio: treinando junto, o valor por
              pessoa fica menor.
            </p>
            <Planos />
          </div>
        </section>

        <section
          id="horarios"
          data-dark
          aria-labelledby="titulo-horarios"
          className="section-anchor relative isolate flex min-h-[calc(100dvh-var(--navbar-height,0px))] items-center overflow-hidden bg-[#101312] text-white"
        >
          {/* Linha fina que separa Planos e Agenda; o brilho "nasce" dela */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-6 top-0 mx-auto h-px max-w-6xl bg-linear-to-r from-transparent via-brand/70 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 -right-32 -z-10 size-96 rounded-full bg-brand/15 blur-3xl lg:right-auto lg:left-1/2 lg:-top-96 lg:size-176 lg:-translate-x-1/2 lg:bg-brand/25"
          />
          <div className="section-container grid w-full items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
            <div>
              <p className="eyebrow">Agendar horário</p>
              <h2 id="titulo-horarios" className="section-title">
                Vamos começar?
              </h2>
              <p className="mt-4 max-w-md leading-relaxed text-white/60">
                O atendimento é confirmado diretamente com a Fernanda pelo
                WhatsApp.
              </p>
              <ol className="mt-8 space-y-5">
                {passos.map((passo, i) => (
                  <li key={passo.titulo} className="flex gap-4">
                    <span className="grid size-9 shrink-0 place-items-center rounded-full border border-brand/40 text-sm font-bold text-brand">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold">{passo.titulo}</p>
                      <p className="text-sm text-white/50">{passo.texto}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="rounded-3xl border border-white/10 bg-[#171a19] p-4 sm:p-6">
              <Agenda />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
