"use client";

import dynamic from "next/dynamic";
import { ESTACOES } from "./dados";

// A cena 3D só carrega no navegador (three não roda no servidor)
const AcademiaCena = dynamic(() => import("./AcademiaCena"), {
  ssr: false,
  loading: () => (
    <div
      className="h-[min(88vh,820px)] min-h-[560px] w-full"
      aria-hidden="true"
    />
  ),
});

export default function Academia() {
  return (
    <div>
      <AcademiaCena />

      {/* Mesmo conteúdo em texto, para leitores de tela e buscadores */}
      <ul className="sr-only">
        {ESTACOES.map((e) => (
          <li key={e.id}>
            <strong>{e.titulo}</strong>: {e.texto}
          </li>
        ))}
      </ul>
    </div>
  );
}
