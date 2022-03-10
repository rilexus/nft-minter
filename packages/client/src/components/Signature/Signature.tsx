import styled, { css, keyframes } from "styled-components";
import React, { useLayoutEffect, useRef, useState, VFC } from "react";

const useLength = () => {
  const ref = useRef<SVGPathElement>(null);
  const [length, set] = useState(1);

  useLayoutEffect(() => {
    const l = ref.current?.getTotalLength() ?? 1;
    set(l);
  }, [ref]);

  return {
    ref,
    style: {
      strokeDasharray: length,
      strokeDashoffset: length,
    },
  };
};

const StyledSVGRect = styled.svg<{ stroke: string; strokeWidth: number }>`
  mix-blend-mode: hard-light;
  path {
    stroke: ${({ stroke }) => stroke};
    stroke-width: ${({ strokeWidth }) => strokeWidth};
    stroke-linecap: round;
  }
`;

const StyledS1Pah = styled.path<{ animate: boolean }>`
  ${({ animate }: any) => css`
    animation-duration: 1s;
    animation-timing-function: cubic-bezier(0.64, 0, 0.78, 0);
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
    animation-name: ${animate
      ? keyframes`
      0% {
        
      }
      100%{
        stroke-dashoffset: 0;
      }
    `
      : undefined};
  `};
`;

const StyledTPath = styled.path<{ animate: boolean }>`
  ${({ animate }: any) => css`
    animation-name: ${animate
      ? keyframes`
      0% {
        
      }
      100%{
        stroke-dashoffset: 0;
      }
    `
      : undefined};
    animation-duration: 1s;
    animation-delay: 1s;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
  `};
`;

const StyledA1Pah = styled.path<{ animate: boolean }>`
  ${({ animate }: any) => css`
    animation-name: ${animate
      ? keyframes`
      0% {
        
      }
      100%{
        stroke-dashoffset: 0;
      }
    `
      : undefined};
    animation-duration: 1s;
    animation-delay: 2s;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
  `};
`;

const S1path: VFC<{ animate: boolean }> = ({ animate }) => {
  const { ref, style } = useLength();
  return (
    <StyledS1Pah
      animate={animate}
      style={style}
      ref={ref}
      className={"s1"}
      d="M242.274097,89.0697431 C263.725547,73.9518534 275.661231,61.8151347 278.081148,52.6595868 C281.711025,38.926265 251.786159,7.55999861 203.743126,2.19687565 C155.700093,-3.16624731 123.576192,2.15388821 99.3092532,8.88770688 C75.0423149,15.6215255 31.0274645,28.1000164 14.8131595,52.6595868 C-1.40114556,77.2191572 -8.1851276,92.9590224 14.8131595,126.749431 C30.1453509,149.276369 50.7820696,167.743817 76.7233157,182.151774 L141.611988,218.522868 L223.895191,259.464274 C258.734644,279.157562 274.276106,292.082041 270.519577,298.237712 C266.763048,304.393383 249.510418,309.858632 218.761689,314.633459 C188.897999,319.31841 163.181432,322.351859 141.611988,323.733806 C109.257821,325.806725 83.6249928,327.893485 76.7233157,323.733806 C69.8216386,319.574126 89.0245185,307.244466 99.3092532,298.237712 C106.165743,292.233209 117.771212,283.975397 134.125659,273.464274"
      id="s1"
    />
  );
};

const TPatch: VFC<{ animate: boolean }> = ({ animate }) => {
  const { ref, style } = useLength();
  return (
    <StyledTPath
      animate={animate}
      ref={ref}
      style={style}
      className={"t"}
      d="M285.467662,145.778067 C304.205627,125.938225 314.931115,110.35281 317.644127,99.02182 C321.713643,82.0253354 323.880263,74.6229071 317.644127,68.7891752 C311.40799,62.9554433 309.473861,65.472178 303.509106,72.9314431 C299.532603,77.9042865 289.196158,111.150041 272.499772,172.668706 L240.723439,272.117239 L222.29694,307.012777 C210.621898,317.367689 200.842932,317.367689 192.960043,307.012777 C181.13571,291.480409 181.060685,272.653778 187.010364,265.292273 C192.960043,257.930767 202.23354,252.438056 225.60939,249.209724 C241.19329,247.057503 282.668259,248.079808 350.034297,252.276639"
      id="t"
    />
  );
};

const A1Path: VFC<{ animate: boolean }> = ({ animate }) => {
  const { ref, style } = useLength();
  return (
    <StyledA1Pah
      animate={animate}
      ref={ref}
      style={style}
      className={"a1"}
      d="M369.592986,239.929407 C369.246704,232.541574 363.63769,228.847658 352.765941,228.847658 C336.458319,228.847658 318.180242,228.847658 296.33941,242.775795 C274.498578,256.703933 268.73498,263.717798 266.028329,269.877026 C263.321679,276.036254 268.582757,286.173382 283.45665,283.00416 C298.330542,279.834939 327.849719,267.111034 346.769582,254.943414 C359.382824,246.831668 370.702449,240.619785 380.728457,236.307764 C371.302575,242.764327 365.06565,249.310806 362.01768,255.947201 C357.445726,265.901794 346.726394,286.626366 358.15969,290.63013 C369.592986,294.633894 380.555673,285.955869 401.185168,261.131817 C414.938164,244.582449 428.188723,227.348007 440.936844,209.428492"
      id="a1"
    />
  );
};

const StyledNPath = styled.path<{ animate: boolean }>`
  ${({ animate }: any) => css`
    animation-name: ${animate
      ? keyframes`
      0% {
        
      }
      100%{
        stroke-dashoffset: 0;
      }
    `
      : undefined};
    animation-duration: 500ms;
    animation-delay: 3s;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
  `}
`;

const NPath: VFC<{ animate: boolean }> = ({ animate }) => {
  const { ref, style } = useLength();
  return (
    <StyledNPath
      animate={animate}
      ref={ref}
      style={style}
      className={"n"}
      d="M442.152545,208.279623 C432.480792,226.930037 426.910689,239.243726 425.442236,245.22069 C423.239557,254.186137 419.804145,267.700164 421.022173,273.97572 C422.2402,280.251277 428.664733,280.836953 432.584798,276.861901 C435.198175,274.211866 454.088358,253.702762 489.255347,215.334589 C484.695578,232.356918 482.600103,244.648442 482.96892,252.209161 C483.522147,263.550239 486.175433,270.081231 494.193312,273.97572 C498.160502,275.902687 509.306835,274.21957 522.068549,266.116409 C535.098865,257.842697 547.62334,242.060561 551.824216,236.531458 C557.367653,229.235304 561.051146,221.603399 562.874695,213.635745"
      id="n"
    />
  );
};

const StyleIPath = styled.path<{ animate: boolean }>`
  ${({ animate }: any) => css`
    animation-name: ${animate
      ? keyframes`
      0% {
        
      }
      100%{
        stroke-dashoffset: 0;
      }
    `
      : undefined};
    animation-duration: 300ms;
    animation-delay: 4s;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
  `}
`;

const IPath: VFC<{ animate: boolean }> = ({ animate }) => {
  const { ref, style } = useLength();
  return (
    <StyleIPath
      animate={animate}
      ref={ref}
      style={style}
      className={"i"}
      d="M562.874695,211.71081 C558.038164,231.617795 555.014545,246.061181 553.803838,255.040968 C551.987779,268.51065 551.072039,290.385604 553.803838,298.327439 C556.535638,306.269274 559.610947,311.089303 565.251868,313.906148 C570.89279,316.722994 579.686117,316.722994 585.900982,304.14397 C590.044226,295.757954 593.943329,288.113942 597.598292,281.211932"
      id="i"
    />
  );
};

const StyledS2Path = styled.path<{ animate: boolean }>`
  ${({ animate }: any) => css`
    animation-name: ${animate
      ? keyframes`
      0% {
        
      }
      100% {
        stroke-dashoffset: 0;
      }
    `
      : undefined};
    animation-duration: 700ms;
    animation-delay: 5s;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
  `}
`;

const S2Path: VFC<{ animate: boolean }> = ({ animate }) => {
  const { ref, style } = useLength();
  return (
    <StyledS2Path
      animate={animate}
      ref={ref}
      style={style}
      className={"s2"}
      d="M669.02084,217.051053 C672.552448,213.999398 673.118682,211.458544 670.719541,209.428492 C667.12083,206.383415 653.077206,201.336996 634.505424,206.523903 C615.933643,211.71081 601.720405,222.900993 596.285932,231.508431 C592.684651,236.324416 589.874898,252.311739 593.080415,262.221258 C595.217426,268.827604 605.00359,279.865307 622.438906,295.334367 L634.505424,305.006599 C637.174709,306.229298 636.315083,306.840648 631.926548,306.840648 C627.538013,306.840648 610.580264,308.284073 581.053302,311.170922"
      id="s2"
    />
  );
};

const StyledLPath = styled.path<{ animate: boolean }>`
  ${({ animate }: any) => css`
    animation-name: ${animate
      ? keyframes`
      0% {
        
      }
      100% {
        stroke-dashoffset: 0;
      }
    `
      : undefined};
    animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
    animation-duration: 400ms;
    animation-delay: 6s;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
  `}
`;

const LPath: VFC<{ animate: boolean }> = ({ animate }) => {
  const { ref, style } = useLength();
  return (
    <StyledLPath
      ref={ref}
      animate={animate}
      style={style}
      className={"l"}
      d="M751.716929,46.6218528 C739.143361,107.327434 730.099041,146.223507 724.583969,163.310073 C719.068897,180.396639 709.921437,211.869406 697.141591,257.728375 C692.716549,278.785359 691.26684,292.956697 692.792464,300.242387 C695.080899,311.170922 701.322658,317.687584 705.599535,319.955601 C708.450787,321.467613 713.904723,322.288539 721.961343,322.418379"
      id="l"
    />
  );
};

const StyledA2Path = styled.path<{ animate: boolean }>`
  ${({ animate }: any) => css`
    animation-name: ${animate
      ? keyframes`
      0% {
      }
      100% {
        stroke-dashoffset: 0;
      }
    `
      : undefined};
    animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
    animation-duration: 1s;
    animation-delay: 7s;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
  `}
`;

const A2Path: VFC<{ animate: boolean }> = ({ animate }) => {
  const { ref, style } = useLength();
  return (
    <StyledA2Path
      animate={animate}
      ref={ref}
      style={style}
      className={"a2"}
      d="M809.527803,240.399092 C808.146078,236.703401 806.461819,233.525816 804.475026,230.866335 C802.488233,228.206854 799.753696,225.469529 796.271415,222.65436 C785.783622,215.991729 774.556983,215.213687 762.591498,220.320234 C750.626014,225.426781 743.042591,232.54109 739.841231,241.66316 C737.235769,249.604676 736.443798,254.627873 737.465317,256.73275 C740.341143,262.658488 750.254734,262.553398 754.007167,262.638208 C762.493203,262.830004 773.276553,260.307128 777.993895,258.930321 C784.336175,257.079258 794.847478,252.044709 809.527803,243.826675 L804.475026,257.728375 C801.952641,271.357307 804.699221,279.030211 812.714766,280.747087 C824.738084,283.3224 847.688389,271.225957 852.635933,266.793818 C855.934296,263.839059 862.670776,256.183344 872.845373,243.826675"
      id="a2"
    />
  );
};

const StyledVPath = styled.path<{ animate: boolean }>`
  ${({ animate }: any) => css`
    animation-name: ${animate
      ? keyframes`
      0% {
        
      }
      100% {
        stroke-dashoffset: 0;
      }
    `
      : undefined};
    animation-timing-function: cubic-bezier(0.64, 0, 0.78, 0);
    animation-duration: 1s;
    animation-delay: 8s;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
  `}
`;

const VPath: VFC<{ animate: boolean }> = ({ animate }) => {
  const { ref, style } = useLength();
  return (
    <StyledVPath
      animate={animate}
      ref={ref}
      style={style}
      className={"v"}
      d="M868.363452,238.658121 C866.885627,253.136913 867.640689,265.186048 870.628636,274.805526 C872.568765,281.051629 878.417428,297.716179 889.798466,302.094319 C904.708936,307.830188 926.313012,299.456052 932.848071,289.206189 C944.371285,271.132689 951.624337,252.905073 951.624337,220.071489 C951.624337,198.182432 949.532975,173.182961 945.350252,145.073075"
      id="v"
    />
  );
};

const Signature: VFC<{
  width?: string;
  height?: string;
  animate: boolean;
  stroke?: string;
  strokeWidth?: number;
  viewBox?: string;
}> = ({
  strokeWidth = 5,
  viewBox = `0 -20 955 380`,
  width = "953",
  height = "328",
  stroke = "black",
  animate,
}) => {
  return (
    <StyledSVGRect
      strokeWidth={strokeWidth}
      stroke={stroke}
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
    >
      <g
        id="Page-1"
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <S1path animate={animate} />
        <TPatch animate={animate} />
        <A1Path animate={animate} />
        <NPath animate={animate} />
        <IPath animate={animate} />
        <S2Path animate={animate} />
        <LPath animate={animate} />
        <A2Path animate={animate} />
        <VPath animate={animate} />
      </g>
    </StyledSVGRect>
  );
};

export { Signature };
