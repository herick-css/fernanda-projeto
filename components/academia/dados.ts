export type V3 = [number, number, number];

export type Estacao = {
  id: string;
  numero: string;
  titulo: string;
  texto: string;
  /** centro da estação no chão (onde aparece o anel de destaque) */
  centro: V3;
  /** onde o ponto numerado flutua na cena */
  marcador: V3;
  /** lado em que o cartão de texto abre */
  lado: "dir" | "esq";
  /** raio do anel de destaque no chão */
  raio: number;
};

// Textos iguais aos dos cards atuais. Para editar, mexa só aqui.
export const ESTACOES: Estacao[] = [
  {
    id: "treino",
    numero: "01",
    titulo: "Treino personalizado",
    texto:
      "Um planejamento construído a partir dos seus objetivos, da sua rotina e do seu nível de experiência.",
    centro: [-2.6, 0, -1.0],
    marcador: [-2.6, 2.3, -1.5],
    lado: "dir",
    raio: 1.8,
  },
  {
    id: "acompanhamento",
    numero: "02",
    titulo: "Acompanhamento",
    texto:
      "Orientação durante os exercícios, atenção à execução e ajustes ao longo do treinamento.",
    centro: [1.2, 0, -1.3],
    marcador: [1.2, 2.6, -1.3],
    lado: "dir",
    raio: 1.9,
  },
  {
    id: "evolucao",
    numero: "03",
    titulo: "Evolução contínua",
    texto:
      "Um processo de acompanhamento para revisar o treino e construir consistência na sua rotina.",
    centro: [3.3, 0, -2.6],
    marcador: [3.3, 2.0, -2.6],
    lado: "esq",
    raio: 1.5,
  },
];
