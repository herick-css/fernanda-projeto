import { NextResponse } from "next/server";
import { buscarOcupados } from "@/lib/calendar";
import { gerarSlots } from "@/lib/slots";

// Cache de 60s: evita bater na API do Google a cada visita.
export const revalidate = 60;

export async function GET() {
  try {
    const ocupados = await buscarOcupados();
    return NextResponse.json({ dias: gerarSlots(ocupados) });
  } catch (e) {
    console.error("[api/horarios]", e);
    return NextResponse.json(
      { erro: "Não foi possível carregar os horários agora." },
      { status: 502 }
    );
  }
}
