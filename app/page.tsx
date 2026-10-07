import Image from "next/image";
import Agenda from "@/components/Agenda";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import ScrollReveal from "@/components/ScrollReveal";
import TrabalhosGrid from "@/components/TrabalhosGrid";
import FotoFernanda from "@/components/FotoFernanda";
import BokehBackground from "@/components/BokehBackground";

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

export default function Home() {
  return (
    <>
      <Header />
      <Navbar />
      <main id="conteudo">
        <section
          id="sobre-mim"
          data-dark
          aria-labelledby="titulo-sobre"
          className="relative isolate z-0 section-anchor bg-[#101312] text-white"
        >
          <BokehBackground />

          <ScrollReveal
            id="sobre-mim-conteudo"
            className="relative z-10 min-h-[calc(100dvh-var(--navbar-height,0px))] flex items-center"
          >
            <div className="section-container w-full grid items-center gap-10 md:grid-cols-2 md:gap-16">
              <div>
                <p className="eyebrow">Sobre mim</p>

                <h1
                  id="titulo-sobre"
                  className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl"
                >
                  Seu movimento.
                  <br />
                  <span className="text-brand">Seu próximo passo.</span>
                </h1>
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
                  Consultar horários{" "}
                  <span aria-hidden="true" className="ml-3">
                    ↗
                  </span>
                </a>
              </div>

              <FotoFernanda />
            </div>
          </ScrollReveal>
        </section>

        <ScrollReveal
          id="trabalhos"
          aria-labelledby="titulo-trabalhos"
          className="relative section-anchor bg-[#f6f8f7] z-10 min-h-[calc(100dvh-var(--navbar-height,0px))]  flex items-center "
        >
          <div className="section-container">
            <p className="eyebrow">Trabalhos</p>
            <h2 id="titulo-trabalhos" className="section-title">
              Treino com propósito.
            </h2>
            <p className="section-description">
              Uma apresentação inicial dos serviços. As modalidades serão
              ajustadas aos atendimentos oferecidos pela Fernanda.
            </p>
            <TrabalhosGrid trabalhos={trabalhos} />
          </div>
        </ScrollReveal>

        <section
          id="galeria"
          aria-labelledby="titulo-galeria"
          className="section-anchor bg-white"
        >
          <div className="section-container">
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
                        className="relative flex aspect-[3/4] items-center justify-center bg-[#f1f5f3] p-4"
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
          id="depoimentos"
          data-dark
          aria-labelledby="titulo-depoimentos"
          className="section-anchor bg-[#101312] text-white"
        >
          <div className="section-container">
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
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-7"
                >
                  <span aria-hidden="true" className="text-4xl text-brand">
                    “
                  </span>
                  <p className="mt-3 leading-relaxed text-white/50">
                    Depoimento a adicionar.
                  </p>
                  <p className="mt-6 text-sm text-white/40">Nome do aluno</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="horarios"
          aria-labelledby="titulo-horarios"
          className="section-anchor bg-[#f6f8f7]"
        >
          <div className="section-container">
            <p className="eyebrow">Agendar horário</p>
            <h2 id="titulo-horarios" className="section-title">
              Vamos começar?
            </h2>
            <p className="section-description">
              Escolha um horário disponível e continue pelo WhatsApp. O
              atendimento será confirmado diretamente com a Fernanda.
            </p>
            <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-8">
              <Agenda />
            </div>
          </div>
        </section>
      </main>

      <footer
        id="contato"
        aria-labelledby="titulo-contato"
        className="section-anchor bg-black text-white"
      >
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-2">
          <div>
            <Image
              src="/logo-fernanda.png"
              alt="Fernanda Bezerra — Personal Trainer"
              width={520}
              height={138}
              className="h-auto w-64 max-w-full"
            />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/50">
              Treinamento personalizado. Um passo de cada vez, com orientação e
              acompanhamento.
            </p>
          </div>
          <div>
            <h2 id="titulo-contato" className="text-xl font-bold">
              Contato
            </h2>
            <p className="mt-4 text-sm text-white/50">
              Contatos, local de atendimento e CREF serão adicionados aqui.
            </p>
            <a
              href="#horarios"
              className="mt-5 inline-block text-sm font-semibold text-brand underline-offset-4 hover:underline"
            >
              Solicitar horário pelo WhatsApp ↗
            </a>
          </div>
        </div>
        <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Fernanda Bezerra. Todos os direitos
          reservados.
        </div>
      </footer>
    </>
  );
}
