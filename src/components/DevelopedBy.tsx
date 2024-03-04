import { useEffect, useState } from "react";

import { useTrail, animated } from "@react-spring/web";

const text = "flamrdevs".split("");

export default () => {
  const [state, setState] = useState(true);

  const [opacity] = useTrail(
    text.length,
    () => ({
      from: {
        opacity: 0,
        y: state ? -5 : 5,
        padding: state ? 0 : 1,
      },
      to: {
        opacity: 1,
        y: state ? 5 : -5,
        padding: state ? 1 : 0,
      },
    }),
    [state]
  );

  const [color] = useTrail(
    text.length,
    () => ({
      from: {
        color: `rgb(var(--${state ? "neutral" : "primary"}-9))`,
      },
      to: {
        color: `rgb(var(--${state ? "primary" : "neutral"}-9))`,
      },
    }),
    [state]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setState((v: boolean) => !v);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="relative flex items-center justify-center p-1 w-full h-full">
      <div className="flex items-center gap-2 font-mono font-medium text-2xl lg:text-3xl select-none">
        {opacity.map((props, i) => (
          <animated.span key={i} style={props}>
            <animated.span style={color[i]}>{text[i]}</animated.span>
          </animated.span>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-1 mb-8 font-mono text-neutral-10 text-xs text-center">
        <span>
          Developed by{" "}
          <a
            href="https://github.com/flamrdevs"
            className="inline-block transition duration-300 hover:-translate-y-px outline-none hover:text-primary-10 focus-visible:text-primary-10"
            target="_blank"
            aria-label="Developer"
          >
            {" "}
            flamrdevs
          </a>
        </span>
      </div>
    </div>
  );
};
