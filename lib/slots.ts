import { config } from "./config";

export type Slot = { inicio: string; hora: string; livre: boolean };
export type Dia = { data: string; label: string; slots: Slot[] };
export type Ocupado = { start: string; end: string };

const fmtData = new Intl.DateTimeFormat("en-CA", { timeZone: config.timeZone });

function meioDia(data: string): Date {
  return new Date(`${data}T12:00:00${config.utcOffset}`);
}

function somaDias(data: string, n: number): string {
  const d = meioDia(data);
  d.setUTCDate(d.getUTCDate() + n);
  return fmtData.format(d);
}

function minutos(hhmm: string): number {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
}

function hhmm(total: number): string {
  const h = String(Math.floor(total / 60)).padStart(2, "0");
  const m = String(total % 60).padStart(2, "0");
  return `${h}:${m}`;
}

export function intervaloDaBusca(): { timeMin: string; timeMax: string } {
  const hoje = fmtData.format(new Date());
  const ultimo = somaDias(hoje, config.diasAFrente);
  return {
    timeMin: new Date(`${hoje}T00:00:00${config.utcOffset}`).toISOString(),
    timeMax: new Date(`${ultimo}T23:59:59${config.utcOffset}`).toISOString(),
  };
}

export function gerarSlots(ocupados: Ocupado[]): Dia[] {
  const agora = Date.now();
  const hoje = fmtData.format(new Date());
  const rotulo = new Intl.DateTimeFormat("pt-BR", {
    timeZone: config.timeZone,
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
  });

  const busy = ocupados.map((o) => ({
    start: new Date(o.start).getTime(),
    end: new Date(o.end).getTime(),
  }));

  const dias: Dia[] = [];

  for (let i = 0; i <= config.diasAFrente; i++) {
    const data = somaDias(hoje, i);
    const diaSemana = meioDia(data).getUTCDay();
    const faixas = config.expediente[diaSemana] ?? [];
    const slots: Slot[] = [];

    for (const [ini, fim] of faixas) {
      for (
        let t = minutos(ini);
        t + config.duracaoMin <= minutos(fim);
        t += config.duracaoMin
      ) {
        const inicio = new Date(`${data}T${hhmm(t)}:00${config.utcOffset}`);
        const ini_ms = inicio.getTime();
        const fim_ms = ini_ms + config.duracaoMin * 60_000;
        const conflito = busy.some((b) => b.start < fim_ms && b.end > ini_ms);
        slots.push({
          inicio: inicio.toISOString(),
          hora: hhmm(t),
          livre: ini_ms > agora && !conflito,
        });
      }
    }

    if (slots.length > 0) {
      dias.push({ data, label: rotulo.format(meioDia(data)), slots });
    }
  }

  return dias;
}
