import { config } from "./config";

export const NOMES_DIAS = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const hora = (hhmm: string) => {
  const [h, m] = hhmm.split(":");
  return m === "00" ? `${Number(h)}h` : `${Number(h)}h${m}`;
};

// Gera [{ dias: "Seg a Sáb", faixas: "15h às 22h" }] direto do expediente,
// então rodapé e agenda acompanham qualquer mudança de horário.
export function resumoExpediente() {
  const grupos: { dias: number[]; faixas: string }[] = [];
  for (let d = 1; d <= 7; d++) {
    const dia = d % 7; // começa na segunda e termina no domingo
    const faixas = (config.expediente[dia] ?? [])
      .map(([ini, fim]) => `${hora(ini)} às ${hora(fim)}`)
      .join(" e ");
    if (!faixas) continue;
    const ultimo = grupos.at(-1);
    const anterior = ultimo?.dias.at(-1);
    if (ultimo && ultimo.faixas === faixas && anterior === (dia + 6) % 7) {
      ultimo.dias.push(dia);
    } else {
      grupos.push({ dias: [dia], faixas });
    }
  }
  return grupos.map(({ dias, faixas }) => ({
    dias:
      dias.length > 1
        ? `${NOMES_DIAS[dias[0]]} a ${NOMES_DIAS[dias.at(-1)!]}`
        : NOMES_DIAS[dias[0]],
    faixas,
  }));
}
