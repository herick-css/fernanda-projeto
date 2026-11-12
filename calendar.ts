import { calendar, auth } from "@googleapis/calendar";
import { config } from "./config";
import { intervaloDaBusca, type Ocupado } from "./slots";

// Lê só os intervalos "ocupados" (free/busy) — o site nunca vê título,
// descrição ou nome de cliente dos eventos.
export async function buscarOcupados(): Promise<Ocupado[]> {
  const calendarId = config.calendarId;
  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL?.trim();
  // Aceita a chave com \n literais e/ou entre aspas (como a Vercel costuma guardar).
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.trim()
    .replace(/^["']|["']$/g, "")
    .replace(/\\n/g, "\n");

  if (!calendarId || !clientEmail || !privateKey) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Credenciais do Google Calendar não configuradas.");
    }
    console.warn(
      "[calendar] Credenciais ausentes: mostrando todos os horários como livres (modo desenvolvimento)."
    );
    return [];
  }

  const googleAuth = new auth.GoogleAuth({
    credentials: { client_email: clientEmail, private_key: privateKey },
    scopes: ["https://www.googleapis.com/auth/calendar.readonly"],
  });

  const cal = calendar({ version: "v3", auth: googleAuth });
  const { timeMin, timeMax } = intervaloDaBusca();

  const res = await cal.freebusy.query({
    requestBody: {
      timeMin,
      timeMax,
      timeZone: config.timeZone,
      items: [{ id: calendarId }],
    },
  });

  const resultado = res.data.calendars?.[calendarId];
  // Sem isso, uma agenda não compartilhada/ID errado voltava "sem ocupados"
  // e o site mostrava TUDO como livre, sem avisar.
  if (resultado?.errors?.length) {
    throw new Error(
      `Google Calendar recusou a agenda (${resultado.errors
        .map((e) => e.reason)
        .join(", ")}). Confira o ID e se ela foi compartilhada com ${clientEmail}.`
    );
  }

  const busy = resultado?.busy ?? [];
  return busy
    .filter((b): b is { start: string; end: string } => !!b.start && !!b.end)
    .map((b) => ({ start: b.start, end: b.end }));
}
