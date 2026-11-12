// Guarda o plano clicado em "Agendar com o plano X" para o formulário já
// abrir com "Sozinho(a) / Em dupla / Em trio" marcado.
export type Grupo = "Sozinho(a)" | "Em dupla" | "Em trio";

const EVENTO = "plano-escolhido";
let atual: Grupo | "" = "";

export function escolherPlano(grupo: Grupo) {
  atual = grupo;
  window.dispatchEvent(new CustomEvent<Grupo>(EVENTO, { detail: grupo }));
}

export function planoAtual() {
  return atual;
}

// Avisa quem já está na tela (ex.: formulário aberto) quando o plano muda.
export function aoEscolherPlano(callback: (grupo: Grupo) => void) {
  const ouvir = (e: Event) => callback((e as CustomEvent<Grupo>).detail);
  window.addEventListener(EVENTO, ouvir);
  return () => window.removeEventListener(EVENTO, ouvir);
}
