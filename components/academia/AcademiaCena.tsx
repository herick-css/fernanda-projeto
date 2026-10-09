"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Html } from "@react-three/drei";
import { useEffect, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import { ESTACOES, type Estacao as EstacaoDados, type V3 } from "./dados";

/* ------------------------------------------------------------------ */
/* Cores (ajuste aqui para combinar com o site)                        */
/* ------------------------------------------------------------------ */

const COR = {
  piso: "#cddbd4",
  zona: "#c3d6cc",
  parede: "#e3ece7",
  rodape: "#b9c9c0",
  escuro: "#1f2937",
  metal: "#64748b",
  esteira: "#475569",
  verde: "#059669",
  verdeEscuro: "#047857",
  verdeClaro: "#34d399",
  pele: "#c98f6b",
  cabelo: "#3b2a20",
  espelho: "#cfe7e6",
};

/* ------------------------------------------------------------------ */
/* Peças básicas                                                       */
/* ------------------------------------------------------------------ */

function Mat({ c, e }: { c: string; e?: string }) {
  return (
    <meshStandardMaterial
      color={c}
      flatShading
      roughness={0.85}
      metalness={0.05}
      emissive={e ?? "#000000"}
      emissiveIntensity={e ? 0.8 : 0}
    />
  );
}

function Caixa({
  p,
  s,
  c,
  rot,
  e,
}: {
  p: V3;
  s: V3;
  c: string;
  rot?: V3;
  e?: string;
}) {
  return (
    <mesh position={p} rotation={rot}>
      <boxGeometry args={s} />
      <Mat c={c} e={e} />
    </mesh>
  );
}

function Cil({
  p,
  raio,
  h,
  c,
  rot,
  lados = 8,
}: {
  p: V3;
  raio: number;
  h: number;
  c: string;
  rot?: V3;
  lados?: number;
}) {
  return (
    <mesh position={p} rotation={rot}>
      <cylinderGeometry args={[raio, raio, h, lados]} />
      <Mat c={c} />
    </mesh>
  );
}

const EIXO_X: V3 = [0, 0, Math.PI / 2];

/* ------------------------------------------------------------------ */
/* Estação 01 – banco com barra (treino personalizado)                 */
/* ------------------------------------------------------------------ */

function Supino() {
  return (
    <>
      {/* banco */}
      <Caixa p={[0, 0.45, 0.3]} s={[0.5, 0.12, 1.7]} c={COR.verdeEscuro} />
      <Caixa p={[0, 0.2, -0.4]} s={[0.4, 0.4, 0.08]} c={COR.escuro} />
      <Caixa p={[0, 0.2, 1.0]} s={[0.4, 0.4, 0.08]} c={COR.escuro} />

      {/* suportes e anilhas */}
      {[-1, 1].map((lado) => (
        <group key={lado}>
          <Caixa p={[lado * 0.62, 0.8, -0.5]} s={[0.1, 1.6, 0.1]} c={COR.escuro} />
          <Caixa p={[lado * 0.62, 0.04, -0.2]} s={[0.12, 0.08, 0.8]} c={COR.escuro} />
          <Cil p={[lado * 0.92, 1.3, -0.5]} raio={0.4} h={0.07} c={COR.escuro} rot={EIXO_X} lados={10} />
          <Cil p={[lado * 1.02, 1.3, -0.5]} raio={0.32} h={0.07} c={COR.escuro} rot={EIXO_X} lados={10} />
          <Cil p={[lado * 1.1, 1.3, -0.5]} raio={0.2} h={0.06} c={COR.verde} rot={EIXO_X} lados={10} />
        </group>
      ))}

      {/* barra */}
      <Cil p={[0, 1.3, -0.5]} raio={0.03} h={2.5} c={COR.metal} rot={EIXO_X} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Estação 02 – esteira + a profissional (acompanhamento)              */
/* ------------------------------------------------------------------ */

function Esteira() {
  return (
    <group position={[-0.8, 0, -0.1]}>
      <Caixa p={[0, 0.3, 0.1]} s={[1.0, 0.22, 2.4]} c={COR.escuro} />
      <Caixa p={[0, 0.43, 0.15]} s={[0.78, 0.04, 2.0]} c={COR.esteira} />
      {[-1, 1].map((lado) => (
        <group key={lado}>
          <Caixa p={[lado * 0.45, 0.95, -1.0]} s={[0.07, 1.2, 0.07]} c={COR.metal} />
          <Caixa p={[lado * 0.5, 0.85, -0.25]} s={[0.06, 0.06, 1.5]} c={COR.metal} />
        </group>
      ))}
      <Caixa p={[0, 1.6, -1.0]} s={[1.0, 0.34, 0.16]} c={COR.escuro} rot={[-0.45, 0, 0]} />
      <Caixa p={[0, 1.64, -0.92]} s={[0.7, 0.2, 0.02]} c={COR.verdeClaro} rot={[-0.45, 0, 0]} e={COR.verdeClaro} />
    </group>
  );
}

const PRETO = "#0b0f14";

// mechas do cabelo cacheado preso no alto: [posição, raio, cor]
const CACHOS: { p: V3; r: number; c: string }[] = [
  { p: [0, 2.12, -0.1], r: 0.3, c: "#6b1230" },
  { p: [0.24, 2.02, -0.08], r: 0.2, c: "#9f1239" },
  { p: [-0.24, 2.02, -0.08], r: 0.2, c: "#9f1239" },
  { p: [0, 2.38, -0.08], r: 0.2, c: "#9f1239" },
  { p: [0.16, 2.3, -0.2], r: 0.17, c: "#7f1d3a" },
  { p: [-0.16, 2.3, -0.2], r: 0.17, c: "#7f1d3a" },
  { p: [0, 2.0, -0.26], r: 0.22, c: "#7f1d3a" },
  { p: [0.2, 1.84, -0.24], r: 0.16, c: "#9f1239" },
  { p: [-0.2, 1.84, -0.24], r: 0.16, c: "#9f1239" },
];

// braço com a mão na cintura: ombro -> cotovelo (para fora) -> mão (no quadril)
function Braco({ lado, tatuagem = false }: { lado: 1 | -1; tatuagem?: boolean }) {
  return (
    <group scale={[lado, 1, 1]}>
      <Caixa p={[0.4, 1.34, 0]} s={[0.12, 0.38, 0.14]} c={COR.pele} rot={[0, 0, 0.54]} />
      <Caixa p={[0.35, 1.43, 0]} s={[0.17, 0.2, 0.18]} c={PRETO} rot={[0, 0, 0.54]} />
      <Caixa p={[0.4, 1.08, 0]} s={[0.11, 0.3, 0.13]} c={COR.pele} rot={[0, 0, -0.78]} />
      {tatuagem && (
        <Caixa p={[0.4, 1.08, 0]} s={[0.125, 0.2, 0.145]} c="#4b5563" rot={[0, 0, -0.78]} />
      )}
      <Caixa p={[0.3, 0.98, 0]} s={[0.1, 0.1, 0.1]} c={COR.pele} />
    </group>
  );
}

function Treinadora() {
  return (
    // de frente para a esteira (olhando para -x)
    <group position={[1.0, 0, 0.5]} rotation={[0, -Math.PI / 2, 0]}>
      {/* pernas, short e tênis */}
      {[-1, 1].map((lado) => (
        <group key={lado}>
          <Caixa p={[lado * 0.13, 0.345, 0]} s={[0.16, 0.53, 0.18]} c={COR.pele} />
          <Caixa p={[lado * 0.13, 0.04, 0.04]} s={[0.17, 0.08, 0.3]} c={PRETO} />
        </group>
      ))}
      <Caixa p={[0, 0.78, 0]} s={[0.54, 0.34, 0.32]} c={PRETO} />

      {/* camiseta preta + colar */}
      <Caixa p={[0, 1.25, 0]} s={[0.52, 0.7, 0.3]} c={PRETO} />
      <Caixa p={[0, 1.56, 0.155]} s={[0.14, 0.02, 0.01]} c="#f59e0b" />
      <Caixa p={[0, 1.5, 0.16]} s={[0.04, 0.07, 0.02]} c="#f59e0b" />

      {/* braços (um com tatuagem) */}
      <Braco lado={1} />
      <Braco lado={-1} tatuagem />

      {/* cabeça e rosto */}
      <mesh position={[0, 1.82, 0]}>
        <sphereGeometry args={[0.2, 7, 5]} />
        <Mat c={COR.pele} />
      </mesh>
      <Caixa p={[-0.07, 1.84, 0.185]} s={[0.04, 0.04, 0.03]} c="#111827" />
      <Caixa p={[0.07, 1.84, 0.185]} s={[0.04, 0.04, 0.03]} c="#111827" />
      <Caixa p={[0, 1.76, 0.19]} s={[0.09, 0.03, 0.03]} c="#dc2626" />

      {/* cabelo cacheado, preso no alto */}
      <mesh position={[0, 1.84, -0.01]}>
        <sphereGeometry args={[0.215, 7, 4, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <Mat c="#3b0a1c" />
      </mesh>
      {CACHOS.map((cacho, i) => (
        <mesh key={i} position={cacho.p}>
          <icosahedronGeometry args={[cacho.r, 0]} />
          <Mat c={cacho.c} />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Estação 03 – rack de halteres crescentes (evolução contínua)        */
/* ------------------------------------------------------------------ */

function Halter({ p, carga }: { p: V3; carga: number }) {
  const raio = 0.09 + carga * 0.07;
  const largura = 0.08 + carga * 0.04;
  return (
    <group position={p}>
      <Cil p={[0, 0, 0]} raio={0.025} h={0.36} c={COR.metal} rot={EIXO_X} />
      {[-1, 1].map((lado) => (
        <Cil key={lado} p={[lado * 0.15, 0, 0]} raio={raio} h={largura} c={COR.escuro} rot={EIXO_X} lados={6} />
      ))}
    </group>
  );
}

function RackHalteres() {
  const xs = [-1.0, -0.5, 0, 0.5, 1.0];
  const prateleiras = [
    { y: 1.05, cargas: [0, 0.1, 0.2, 0.3, 0.4] },
    { y: 0.5, cargas: [0.5, 0.65, 0.8, 0.9, 1] },
  ];

  return (
    <>
      {[-1.25, 1.25].flatMap((x) =>
        [-0.6, 0].map((z) => (
          <Caixa key={`${x}${z}`} p={[x, 0.7, z]} s={[0.08, 1.4, 0.08]} c={COR.escuro} />
        )),
      )}

      {prateleiras.map(({ y, cargas }) => (
        <group key={y}>
          <Caixa p={[0, y, -0.3]} s={[2.6, 0.07, 0.7]} c={COR.metal} />
          {cargas.map((carga, i) => (
            <Halter key={i} p={[xs[i], y + 0.035 + 0.09 + carga * 0.07, -0.3]} carga={carga} />
          ))}
        </group>
      ))}

      {/* gráfico de barras crescentes na parede */}
      <group position={[0, 0, -0.85]}>
        <Caixa p={[0, 2.48, 0]} s={[1.0, 0.04, 0.03]} c={COR.verdeEscuro} />
        {[0.35, 0.65, 0.95].map((h, i) => (
          <Caixa
            key={h}
            p={[(i - 1) * 0.3, 2.5 + h / 2, 0]}
            s={[0.2, h, 0.04]}
            c={i === 2 ? COR.verde : COR.verdeClaro}
          />
        ))}
      </group>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Sala e decoração                                                    */
/* ------------------------------------------------------------------ */

function Planta() {
  return (
    <group position={[-4.3, 0, -2.9]}>
      <Cil p={[0, 0.25, 0]} raio={0.28} h={0.5} c="#c2703d" lados={7} />
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh
          key={i}
          position={[Math.cos(i * 1.26) * 0.12, 0.85, Math.sin(i * 1.26) * 0.12]}
          rotation={[Math.sin(i * 1.26) * 0.45, 0, -Math.cos(i * 1.26) * 0.45]}
        >
          <coneGeometry args={[0.13, 0.9, 5]} />
          <Mat c={i % 2 ? COR.verde : COR.verdeClaro} />
        </mesh>
      ))}
    </group>
  );
}

function Kettlebell({ p }: { p: V3 }) {
  return (
    <group position={p}>
      <mesh position={[0, 0.2, 0]}>
        <icosahedronGeometry args={[0.2, 1]} />
        <Mat c={COR.escuro} />
      </mesh>
      <mesh position={[0, 0.45, 0]}>
        <torusGeometry args={[0.1, 0.03, 5, 8]} />
        <Mat c={COR.escuro} />
      </mesh>
    </group>
  );
}

function Sala() {
  return (
    <>
      {/* piso e paredes */}
      <Caixa p={[0, -0.1, 0]} s={[10.4, 0.2, 7.4]} c={COR.piso} />
      <Caixa p={[0, 0.01, 0.2]} s={[9.2, 0.02, 4.8]} c={COR.zona} />
      <Caixa p={[0, 2, -3.6]} s={[10.4, 4, 0.2]} c={COR.parede} />
      <Caixa p={[-5.1, 2, 0]} s={[0.2, 4, 7.4]} c={COR.parede} />
      <Caixa p={[0, 0.12, -3.47]} s={[10, 0.24, 0.06]} c={COR.rodape} />
      <Caixa p={[-4.97, 0.12, 0]} s={[0.06, 0.24, 7]} c={COR.rodape} />

      {/* espelho na parede do fundo */}
      <Caixa p={[-0.8, 2.1, -3.47]} s={[3.3, 1.8, 0.04]} c={COR.escuro} />
      <Caixa p={[-0.8, 2.1, -3.44]} s={[3.1, 1.6, 0.03]} c={COR.espelho} />

      {/* quadro na parede esquerda */}
      <Caixa p={[-4.96, 2.3, 0.4]} s={[0.04, 1.1, 1.8]} c={COR.verde} />
      <Caixa p={[-4.93, 2.3, 0.4]} s={[0.02, 0.9, 1.6]} c={COR.verdeClaro} />

      <Planta />

      {/* itens soltos na frente */}
      <Caixa p={[-3.0, 0.045, 2.2]} s={[0.8, 0.05, 2.2]} c={COR.verdeClaro} />
      <Kettlebell p={[-1.6, 0.03, 2.4]} />
      <Kettlebell p={[-1.1, 0.03, 2.7]} />
      <mesh position={[0.3, 0.3, 2.5]}>
        <icosahedronGeometry args={[0.3, 1]} />
        <Mat c={COR.verdeEscuro} />
      </mesh>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Estação (destaque ao ativar) e marcador clicável                    */
/* ------------------------------------------------------------------ */

function Estacao({
  dados,
  ativa,
  children,
}: {
  dados: EstacaoDados;
  ativa: boolean;
  children: ReactNode;
}) {
  const grupo = useRef<THREE.Group>(null);
  const anel = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((_, dt) => {
    if (grupo.current) {
      const s = THREE.MathUtils.damp(grupo.current.scale.x, ativa ? 1.04 : 1, 6, dt);
      grupo.current.scale.setScalar(s);
    }
    if (anel.current) {
      anel.current.opacity = THREE.MathUtils.damp(anel.current.opacity, ativa ? 0.9 : 0, 6, dt);
    }
  });

  return (
    <group position={dados.centro}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, 0]}>
        <ringGeometry args={[dados.raio, dados.raio + 0.12, 6]} />
        <meshBasicMaterial ref={anel} color="#10b981" transparent opacity={0} />
      </mesh>
      <group ref={grupo}>{children}</group>
    </group>
  );
}

function Marcador({
  dados,
  ativa,
  definir,
}: {
  dados: EstacaoDados;
  ativa: boolean;
  definir: (valor: boolean) => void;
}) {
  const tipo = useRef("mouse");

  return (
    <div className="relative">
      <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/40 motion-reduce:animate-none" />

      <button
        type="button"
        aria-expanded={ativa}
        aria-label={`${dados.numero} ${dados.titulo}`}
        onPointerDown={(ev) => {
          tipo.current = ev.pointerType;
        }}
        onPointerEnter={(ev) => {
          if (ev.pointerType === "mouse") definir(true);
        }}
        onPointerLeave={(ev) => {
          if (ev.pointerType === "mouse") definir(false);
        }}
        onClick={() => (tipo.current === "mouse" ? definir(true) : definir(!ativa))}
        onFocus={(ev) => {
          // só abre no foco do teclado (no clique/toque quem decide é o onClick)
          if (ev.currentTarget.matches(":focus-visible")) definir(true);
        }}
        onBlur={() => definir(false)}
        className={`relative grid h-9 w-9 place-items-center rounded-full border-2 border-white text-xs font-bold text-white shadow-lg transition-transform ${
          ativa ? "scale-110 bg-emerald-700" : "bg-emerald-600 hover:scale-110"
        }`}
      >
        {dados.numero}
      </button>
    </div>
  );
}

function ConteudoCartao({ dados }: { dados: EstacaoDados }) {
  return (
    <>
      <p className="text-xs font-bold tracking-widest text-emerald-700">{dados.numero}</p>
      <p className="mt-1 text-base font-semibold text-slate-800">{dados.titulo}</p>
      <p className="mt-1 text-sm leading-relaxed text-slate-600">{dados.texto}</p>
    </>
  );
}

// Cartão do desktop: fica ao lado do marcador, num elemento próprio com
// z-index alto, para nunca ficar por baixo de outro marcador.
function Cartao({ dados }: { dados: EstacaoDados }) {
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMostrar(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="pointer-events-none relative h-9 w-9">
      <div
        className={`absolute top-1/2 w-64 -translate-y-1/2 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-xl transition-opacity duration-200 ${
          dados.lado === "dir" ? "left-full ml-4" : "right-full mr-4"
        } ${mostrar ? "opacity-100" : "opacity-0"}`}
      >
        <ConteudoCartao dados={dados} />
      </div>
    </div>
  );
}

// Cartão do celular: centralizado na largura da cena, na faixa livre de baixo.
function CartaoFixo({ dados }: { dados: EstacaoDados }) {
  return (
    <div className="pointer-events-none absolute inset-x-4 bottom-4 z-50 mx-auto max-w-sm rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-xl">
      <ConteudoCartao dados={dados} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Câmera: parallax com o mouse (ou balanço lento no toque)            */
/* ------------------------------------------------------------------ */

const FOV = 32;
// ponto para onde a câmera olha e direção (do ponto para a câmera) no enquadramento padrão
const ALVO_BASE = new THREE.Vector3(0, 1.2, -0.5);
const DIR_BASE = new THREE.Vector3(6.5, 5.2, 9).sub(ALVO_BASE);
// fração da tela que a sala pode ocupar (o resto é folga para o parallax)
const MARGEM = 0.85;

// cantos da caixa que envolve a sala (piso + paredes)
const CANTOS: THREE.Vector3[] = [];
for (const x of [-5.2, 5.2])
  for (const y of [-0.2, 4])
    for (const z of [-3.7, 3.7]) CANTOS.push(new THREE.Vector3(x, y, z));

/**
 * Descobre o quanto afastar a câmera (e para onde olhar) para a sala inteira
 * caber na tela, centralizada, seja qual for o formato da área de 3D.
 */
function enquadrar(aspect: number) {
  const cam = new THREE.PerspectiveCamera(FOV, aspect, 0.1, 80);
  const alvo = ALVO_BASE.clone();
  const ponto = new THREE.Vector3();
  const direita = new THREE.Vector3();
  const cima = new THREE.Vector3();
  const tras = new THREE.Vector3();

  const posicionar = (fit: number) => {
    cam.position.copy(alvo).addScaledVector(DIR_BASE, fit);
    cam.lookAt(alvo);
    cam.updateMatrixWorld();
  };

  // limites dos cantos na tela (-1 a 1)
  const limites = () => {
    let xmin = Infinity;
    let xmax = -Infinity;
    let ymin = Infinity;
    let ymax = -Infinity;
    for (const canto of CANTOS) {
      ponto.copy(canto).project(cam);
      xmin = Math.min(xmin, ponto.x);
      xmax = Math.max(xmax, ponto.x);
      ymin = Math.min(ymin, ponto.y);
      ymax = Math.max(ymax, ponto.y);
    }
    return { xmin, xmax, ymin, ymax };
  };

  // menor distância em que todos os cantos cabem (busca binária)
  const buscar = () => {
    let lo = 1;
    let hi = 6;
    for (let i = 0; i < 30; i++) {
      const meio = (lo + hi) / 2;
      posicionar(meio);
      const b = limites();
      const maior = Math.max(Math.abs(b.xmin), Math.abs(b.xmax), Math.abs(b.ymin), Math.abs(b.ymax));
      if (maior <= MARGEM) hi = meio;
      else lo = meio;
    }
    return hi;
  };

  let fit = buscar();
  for (let rodada = 0; rodada < 3; rodada++) {
    // centraliza: desloca o ponto de olhar para a sala ficar no meio da tela
    posicionar(fit);
    const b = limites();
    const cx = (b.xmin + b.xmax) / 2;
    const cy = (b.ymin + b.ymax) / 2;
    const meiaAltura = DIR_BASE.length() * fit * Math.tan(THREE.MathUtils.degToRad(FOV / 2));
    cam.matrixWorld.extractBasis(direita, cima, tras);
    alvo.addScaledVector(direita, cx * meiaAltura * aspect);
    alvo.addScaledVector(cima, cy * meiaAltura);
    fit = buscar();
  }

  return { fit, centro: alvo };
}

function Camera({ hover, reduzir }: { hover: boolean; reduzir: boolean }) {
  const enq = useRef<{ aspect: number; fit: number; centro: THREE.Vector3 } | null>(null);
  const pronto = useRef(false);
  const olhar = useRef(new THREE.Vector3());
  const posDestino = useRef(new THREE.Vector3());
  const olharDestino = useRef(new THREE.Vector3());

  useFrame((state, dt) => {
    const { camera, pointer, size, clock } = state;
    const aspect = size.width / size.height;

    // recalcula o enquadramento só quando o formato da área muda
    if (!enq.current || enq.current.aspect !== aspect) {
      enq.current = { aspect, ...enquadrar(aspect) };
    }
    const { fit, centro } = enq.current;

    const t = clock.elapsedTime;
    const px = reduzir ? 0 : hover ? pointer.x : Math.sin(t * 0.35) * 0.6;
    const py = reduzir ? 0 : hover ? pointer.y : Math.cos(t * 0.27) * 0.35;

    // posição desejada = enquadramento + deslocamento do parallax
    posDestino.current.copy(centro).addScaledVector(DIR_BASE, fit);
    posDestino.current.x += px * 2.2 * fit;
    posDestino.current.y += py * 1.0 * fit;

    olharDestino.current.copy(centro);

    if (!pronto.current) {
      // primeiro frame: já começa enquadrada (sem animação de zoom)
      camera.position.copy(posDestino.current);
      olhar.current.copy(olharDestino.current);
      pronto.current = true;
    } else {
      const d = THREE.MathUtils.damp;
      camera.position.x = d(camera.position.x, posDestino.current.x, 3, dt);
      camera.position.y = d(camera.position.y, posDestino.current.y, 3, dt);
      camera.position.z = d(camera.position.z, posDestino.current.z, 3, dt);
      olhar.current.x = d(olhar.current.x, olharDestino.current.x, 3, dt);
      olhar.current.y = d(olhar.current.y, olharDestino.current.y, 3, dt);
      olhar.current.z = d(olhar.current.z, olharDestino.current.z, 3, dt);
    }

    camera.lookAt(olhar.current);
  });

  return null;
}

/* ------------------------------------------------------------------ */
/* Cena e componente exportado                                         */
/* ------------------------------------------------------------------ */

function Cena({
  ativa,
  setAtiva,
  hover,
  reduzir,
  pequeno,
}: {
  ativa: number | null;
  setAtiva: (fn: (atual: number | null) => number | null) => void;
  hover: boolean;
  reduzir: boolean;
  pequeno: boolean;
}) {
  const fechar = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => () => clearTimeout(fechar.current), []);

  // fechar tem um pequeno atraso: se o mouse escorregar do marcador por um
  // instante, o cartão não pisca
  const definir = (i: number) => (valor: boolean) => {
    clearTimeout(fechar.current);
    if (valor) {
      setAtiva(() => i);
    } else {
      fechar.current = setTimeout(
        () => setAtiva((atual) => (atual === i ? null : atual)),
        150,
      );
    }
  };

  const estacoes: ReactNode[] = [
    <Supino key="s" />,
    <group key="e">
      <Esteira />
      <Treinadora />
    </group>,
    <RackHalteres key="r" />,
  ];

  const ativaDados = ativa === null ? null : ESTACOES[ativa];

  return (
    <>
      <ambientLight intensity={0.9} />
      <hemisphereLight args={["#ffffff", "#c9d6cf", 0.6]} />
      <directionalLight position={[6, 9, 5]} intensity={2.2} />

      <Camera hover={hover} reduzir={reduzir} />

      <Sala />

      {ESTACOES.map((e, i) => (
        <Estacao key={e.id} dados={e} ativa={ativa === i}>
          {estacoes[i]}
        </Estacao>
      ))}

      {ESTACOES.map((e, i) => (
        <Html key={e.id} position={e.marcador} center zIndexRange={[20, 0]}>
          <Marcador dados={e} ativa={ativa === i} definir={definir(i)} />
        </Html>
      ))}

      {ativaDados && !pequeno && (
        <Html
          key={ativaDados.id}
          position={ativaDados.marcador}
          center
          zIndexRange={[100, 90]}
          pointerEvents="none"
        >
          <Cartao dados={ativaDados} />
        </Html>
      )}

      <ContactShadows
        position={[0, 0.03, 0]}
        opacity={0.35}
        scale={12}
        blur={2.4}
        far={3.2}
        resolution={512}
        frames={1}
        color="#0f2a1f"
      />
    </>
  );
}

export default function AcademiaCena() {
  const caixa = useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = useState(false);
  const [ativa, setAtiva] = useState<number | null>(null);
  const [modo, setModo] = useState({ hover: true, reduzir: false, pequeno: false });

  useEffect(() => {
    const telaPequena = window.matchMedia("(max-width: 639px)");
    const atualizar = () =>
      setModo({
        hover: window.matchMedia("(hover: hover)").matches,
        reduzir: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
        pequeno: telaPequena.matches,
      });

    atualizar();
    telaPequena.addEventListener("change", atualizar);
    return () => telaPequena.removeEventListener("change", atualizar);
  }, []);

  useEffect(() => {
    const el = caixa.current;
    if (!el) return;

    // pausa o render quando a seção sai da tela (economiza GPU)
    const obs = new IntersectionObserver(
      ([entrada]) => setVisivel(entrada.isIntersecting),
      { rootMargin: "120px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={caixa} className="relative h-[min(78vh,720px)] min-h-[460px] w-full">
      <Canvas
        frameloop={visivel ? "always" : "never"}
        dpr={[1, 1.5]}
        camera={{ fov: FOV, position: [6.5, 5.2, 9], near: 0.1, far: 80 }}
      >
        <Cena
          ativa={ativa}
          setAtiva={setAtiva}
          hover={modo.hover}
          reduzir={modo.reduzir}
          pequeno={modo.pequeno}
        />
      </Canvas>

      {modo.pequeno && ativa !== null && <CartaoFixo dados={ESTACOES[ativa]} />}
    </div>
  );
}
