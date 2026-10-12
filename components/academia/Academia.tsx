"use client";

import dynamic from "next/dynamic";
import { ESTACOES } from "./dados";

const AcademiaCena = dynamic(() => import("./AcademiaCena"), {
  ssr: false,
  loading: () => (
    <div className="h-[min(88vh,820px)] min-h-140 w-full" aria-hidden="true" />
  ),
});

export default function Academia() {
  return (
    <div>
      <AcademiaCena />

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
