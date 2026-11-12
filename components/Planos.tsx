// Configure os planos aqui.
// - preco: deixe "" para mostrar "Valor a definir" (ex.: "R$ 250")
// - desconto: aparece como selo quando preenchido (ex.: "15% off por pessoa")
// - destaque: deixa o card em evidência; selo é o texto que aparece em cima dele
type Plano = {
  nome: string;
  pessoas: string;
  frase: string;
  preco: string;
  periodo: string;
  desconto: string;
  itens: string[];
  destaque?: boolean;
  selo?: string;
};

const planos: Plano[] = [
  {
    nome: "Solo",
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
    destaque: true,
    selo: "Melhor custo-benefício",
  },
  {
    nome: "Trio",
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
  return (
    <div className="mt-12 grid gap-5 md:grid-cols-3 md:items-stretch">
      {planos.map((plano) => (
        <article
          key={plano.nome}
          className={`relative flex flex-col rounded-3xl border p-7 ${
            plano.destaque
              ? "border-brand/60 bg-brand/[0.06] shadow-[0_0_60px_-20px_var(--color-brand)]"
              : "border-white/10 bg-white/3"
          }`}
        >
          {plano.destaque && plano.selo && (
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
            className={`block rounded-xl py-3 text-center font-bold transition ${
              plano.destaque
                ? "bg-brand text-black hover:bg-brand-light"
                : "border border-white/15 text-white hover:border-brand hover:text-brand"
            }`}
          >
            Agendar com o plano {plano.nome}
          </a>
          </div>
        </article>
      ))}
    </div>
  );
}
