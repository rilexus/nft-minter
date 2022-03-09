import styled, { css, keyframes } from "styled-components";
import React, {
  CSSProperties,
  FC,
  ReactElement,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

const stroke = keyframes`
  30%,
  55% {
    opacity: 1;
  }
  100% {
    stroke-dashoffset: 4;
    opacity: 0;
  }
`;
const StyledSVG = styled.svg`
  pointer-events: none;
  display: block;
  position: absolute;
  inset: 0;
  overflow: visible;
  fill: none;
  stroke-width: 2;
  stroke: #c9e9ff;
  width: 100%;
  height: 100%;
  stroke-dasharray: 2 10;
  stroke-dashoffset: 14;
  opacity: 0;
`;

const SVGRect = ({ rx = "0px", ...props }: any) => {
  return (
    <StyledSVG {...props}>
      <rect
        x={0}
        y={0}
        width={"100%"}
        height={"100%"}
        rx={rx}
        pathLength={10}
      />
    </StyledSVG>
  );
};

const StyledLines = styled.div<{
  animate: boolean;
  timeout: number;
  delay: number;
  ease: string;
}>`
  mix-blend-mode: hard-light;
  position: relative;
  display: inline-block;

  svg {
    ${({ animate, timeout, delay, ease }) => css`
      animation: ${animate ? stroke : undefined} ${timeout}ms ${ease} ${delay}ms;
    `};
  }
`;

const OutlineGlowAnimation: FC<{
  in: boolean;
  children: ReactElement;
  timeout?: number;
  delay?: number;
  ease?: string;
  style?: CSSProperties;
}> = ({
  style,
  in: _in,
  timeout = 1000,
  delay = 0,
  ease = "linear",
  children,
}) => {
  const childRef = useRef<HTMLElement>(null);

  const [viewBox, setViewBox] = useState("0 0 0 0");
  const [borderRadius, setBorderRadius] = useState("0px");

  useLayoutEffect(() => {
    const { width, height } =
      childRef.current?.getBoundingClientRect() as DOMRect;
    setViewBox(`0 0 ${width} ${height}`);
    //eslint-disable-next-line
    //@ts-ignore
    const radius = getComputedStyle(childRef.current).borderRadius;
    if (!!radius) {
      setBorderRadius(radius);
    }
  }, [childRef]);

  return (
    <StyledLines
      animate={_in}
      timeout={timeout}
      ease={ease}
      delay={delay}
      style={style}
    >
      <div
        style={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
        }}
      >
        <SVGRect
          rx={borderRadius}
          viewBox={viewBox}
          style={{
            stroke: "#f8fcff",
          }}
        />
        <SVGRect
          rx={borderRadius}
          viewBox={viewBox}
          style={{
            strokeWidth: "6px",
            filter: "blur(20px)",
          }}
        />
        <SVGRect
          rx={borderRadius}
          viewBox={viewBox}
          style={{
            strokeWidth: "5px",
            filter: "blur(6px)",
          }}
        />
        <SVGRect
          rx={borderRadius}
          viewBox={viewBox}
          style={{
            strokeWidth: "10px",
            filter: "blur(56px)",
          }}
        />
      </div>
      <div
        style={{
          pointerEvents: "none",
          transform: "rotate(180deg)",
          position: "absolute",
          inset: 0,
        }}
      >
        <SVGRect
          rx={borderRadius}
          viewBox={viewBox}
          style={{
            stroke: "#f8fcff",
          }}
        />
        <SVGRect
          rx={borderRadius}
          viewBox={viewBox}
          style={{
            strokeWidth: "6px",
            filter: "blur(20px)",
          }}
        />
        <SVGRect
          rx={borderRadius}
          viewBox={viewBox}
          style={{
            strokeWidth: "5px",
            filter: "blur(6px)",
          }}
        />
        <SVGRect
          rx={borderRadius}
          viewBox={viewBox}
          style={{
            strokeWidth: "10px",
            filter: "blur(56px)",
          }}
        />
      </div>
      {React.cloneElement(children, { ref: childRef })}
    </StyledLines>
  );
};

export { OutlineGlowAnimation };
