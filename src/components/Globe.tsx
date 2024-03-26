import { useEffect, useRef } from "react";

import { useSpring } from "@react-spring/web";

import cobe from "cobe";

const color = (() => {
  const convert = (v: string) => {
    const n = Number(v);
    if (isNaN(n)) throw new Error("color convert error");
    return n / 255;
  };

  return <T extends [string, string, string]>(t: T) => [convert(t[0]), convert(t[1]), convert(t[2])] as [number, number, number];
})();

const getPropertyValueFrom = (style: CSSStyleDeclaration, varName: string) =>
  style.getPropertyValue(varName).split(" ") as [string, string, string];

const Globe = () => {
  const ref = useRef<HTMLCanvasElement | null>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef<number>(0);
  const [{ r }, api] = useSpring(() => ({ r: 0, config: { mass: 1, tension: 280, friction: 40, precision: 0.001 } }));

  useEffect(() => {
    let phi = 0;
    let width = 0;
    const onResize = () => ref.current && (width = ref.current.offsetWidth);
    window.addEventListener("resize", onResize);
    onResize();

    const style = getComputedStyle(document.documentElement);

    const globe = cobe(ref.current!, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.3,
      dark: 1,
      diffuse: 3,
      mapSamples: 16000,
      mapBrightness: 2,
      baseColor: color(getPropertyValueFrom(style, "--neutral-9")),
      markerColor: color(getPropertyValueFrom(style, "--primary-9")),
      glowColor: color(getPropertyValueFrom(style, "--neutral-11")),
      markers: [
        {
          // TODO : update location. https://cobe.vercel.app/docs/api#markers
          location: [-7.5360639, 112.2384017],
          size: 0.1,
        },
      ],
      onRender: (state) => {
        if (!pointerInteracting.current) phi += 0.005;
        state.phi = phi + r.get();
        state.width = width * 2;
        state.height = width * 2;
      },
    });
    setTimeout(() => (ref.current!.style.opacity = "1"));
    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center w-full h-full">
      <div className="relative w-full max-w-[900px] aspect-square m-auto">
        <canvas
          ref={ref}
          onPointerDown={(e) => {
            pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
            ref.current!.style.cursor = "grabbing";
          }}
          onPointerUp={() => {
            pointerInteracting.current = null;
            ref.current!.style.cursor = "grab";
          }}
          onPointerOut={() => {
            pointerInteracting.current = null;
            ref.current!.style.cursor = "grab";
          }}
          onMouseMove={(e) => {
            if (pointerInteracting.current !== null) {
              const delta = e.clientX - pointerInteracting.current;
              pointerInteractionMovement.current = delta;
              api.start({ r: delta / 200 });
            }
          }}
          onTouchMove={(e) => {
            if (pointerInteracting.current !== null && e.touches[0]) {
              const delta = e.touches[0].clientX - pointerInteracting.current;
              pointerInteractionMovement.current = delta;
              api.start({ r: delta / 100 });
            }
          }}
          className="w-full h-full"
          style={{ cursor: "grab", contain: "layout paint size", opacity: 0, transition: "opacity 1s ease" }}
        />
      </div>
    </div>
  );
};

export default Globe;
