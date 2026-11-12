import Image from "next/image";
import { config } from "@/lib/config";
import { NOMES_DIAS, resumoExpediente } from "@/lib/expediente";

// Preencha aqui. Campo vazio aparece como "Em breve" no rodapé.
const dados = {
  instagram: "", // só o usuário, sem @ (ex.: "fernandabezerra.personal")
  email: "",
  local: "", // ex.: "Academia X — Bairro, Manaus/AM"
  cref: "", // ex.: "000000-G/AM"
  cidade: "Manaus · AM",
};

const navegacao = [
  { href: "#sobre-mim", label: "Sobre mim" },
  { href: "#mentoria", label: "Mentoria" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#galeria", label: "Galeria" },
  { href: "#planos", label: "Planos" },
  { href: "#horarios", label: "Agendar horário" },
];

function Valor({ children }: { children?: React.ReactNode }) {
  return children ? (
    <>{children}</>
  ) : (
    <span className="text-white/35">Em breve</span>
  );
}

export default function Footer() {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP;
  const expediente = resumoExpediente();
  const folgas = NOMES_DIAS.filter((_, i) => !config.expediente[i]?.length);

  return (
    <footer
      id="contato"
      aria-labelledby="titulo-contato"
      className="section-anchor flex min-h-[calc(100dvh-var(--navbar-height,0px))] flex-col bg-black text-white"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-6 pt-16 pb-10 sm:pt-20">
        {/* Chamada */}
        <div className="flex flex-col gap-6 border-b border-white/10 pb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <Image
              src="/images/logo-fernanda.png"
              alt="Fernanda Bezerra — Personal Trainer"
              width={520}
              height={138}
              className="h-auto w-56 max-w-full"
            />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/55">
              Treinamento personalizado. Um passo de cada vez, com orientação e
              acompanhamento.
            </p>
          </div>
          <a
            href="#horarios"
            className="inline-flex w-fit items-center rounded-lg bg-brand px-6 py-3 font-bold text-black transition hover:bg-brand-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
          >
            Agendar horário
          </a>
        </div>

        {/* Colunas */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 py-12 lg:grid-cols-4">
          <nav aria-label="Rodapé">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
              Navegação
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {navegacao.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-white/70 transition-colors hover:text-brand"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
              Atendimento
            </h2>
            <dl className="mt-5 space-y-3 text-sm">
              {expediente.map((e) => (
                <div key={e.dias}>
                  <dt className="text-white/50">{e.dias}</dt>
                  <dd className="text-white/85">{e.faixas}</dd>
                </div>
              ))}
              {folgas.length > 0 && (
                <div>
                  <dt className="text-white/50">{folgas.join(", ")}</dt>
                  <dd className="text-white/40">Folga</dd>
                </div>
              )}
              <div>
                <dt className="text-white/50">Sessão</dt>
                <dd className="text-white/85">{config.duracaoMin} min</dd>
              </div>
            </dl>
          </div>

          <div>
            <h2
              id="titulo-contato"
              className="text-xs font-bold uppercase tracking-[0.2em] text-brand"
            >
              Contato
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <span className="block text-white/50">WhatsApp</span>
                {whatsapp ? (
                  <a
                    href={`https://wa.me/${whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/85 transition-colors hover:text-brand"
                  >
                    Enviar mensagem
                  </a>
                ) : (
                  <Valor />
                )}
              </li>
              <li>
                <span className="block text-white/50">Instagram</span>
                {dados.instagram ? (
                  <a
                    href={`https://instagram.com/${dados.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/85 transition-colors hover:text-brand"
                  >
                    @{dados.instagram}
                  </a>
                ) : (
                  <Valor />
                )}
              </li>
              <li>
                <span className="block text-white/50">E-mail</span>
                {dados.email ? (
                  <a
                    href={`mailto:${dados.email}`}
                    className="break-all text-white/85 transition-colors hover:text-brand"
                  >
                    {dados.email}
                  </a>
                ) : (
                  <Valor />
                )}
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-brand">
              Onde treinar
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <span className="block text-white/50">Local</span>
                <span className="text-white/85">
                  <Valor>{dados.local}</Valor>
                </span>
              </li>
              <li>
                <span className="block text-white/50">Cidade</span>
                <span className="text-white/85">
                  <Valor>{dados.cidade}</Valor>
                </span>
              </li>
              <li>
                <span className="block text-white/50">CREF</span>
                <span className="text-white/85">
                  <Valor>{dados.cref}</Valor>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-6 text-xs text-white/40 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} Fernanda Bezerra. Todos os direitos
            reservados.
          </p>
          <a href="#header-principal" className="transition-colors hover:text-brand">
            Voltar ao topo
          </a>
        </div>
      </div>
    </footer>
  );
}
