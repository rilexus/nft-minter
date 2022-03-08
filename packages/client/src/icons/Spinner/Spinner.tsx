import React, { VFC } from "react";
import styled, { keyframes } from "styled-components";

const animation = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;
const StyledMediumSpinner = styled.div`
  color: official;
  display: inline-block;
  position: relative;
  width: 2.5rem;
  height: 2.5rem;

  div {
    transform-origin: 1.25rem 1.25rem;
    animation: ${animation} 1.2s linear infinite;
  }

  div:after {
    content: " ";
    display: block;
    position: absolute;
    top: 0;
    left: 1.125rem;
    width: 0.1875rem;
    height: 0.5rem;
    border-radius: 20%;
    background: #fff;
  }
  div:nth-child(1) {
    transform: rotate(0deg);
    animation-delay: -1.1s;
  }
  div:nth-child(2) {
    transform: rotate(30deg);
    animation-delay: -1s;
  }
  div:nth-child(3) {
    transform: rotate(60deg);
    animation-delay: -0.9s;
  }
  div:nth-child(4) {
    transform: rotate(90deg);
    animation-delay: -0.8s;
  }
  div:nth-child(5) {
    transform: rotate(120deg);
    animation-delay: -0.7s;
  }
  div:nth-child(6) {
    transform: rotate(150deg);
    animation-delay: -0.6s;
  }
  div:nth-child(7) {
    transform: rotate(180deg);
    animation-delay: -0.5s;
  }
  div:nth-child(8) {
    transform: rotate(210deg);
    animation-delay: -0.4s;
  }
  div:nth-child(9) {
    transform: rotate(240deg);
    animation-delay: -0.3s;
  }
  div:nth-child(10) {
    transform: rotate(270deg);
    animation-delay: -0.2s;
  }
  div:nth-child(11) {
    transform: rotate(300deg);
    animation-delay: -0.1s;
  }
  div:nth-child(12) {
    transform: rotate(330deg);
    animation-delay: 0s;
  }
`;

const StyledSmallSpinner = styled.div`
  color: official;
  display: inline-block;
  position: relative;
  width: 1.5rem;
  height: 1.5rem;

  div {
    transform-origin: 0.75rem 0.75rem;
    animation: ${animation} 1.2s linear infinite;
  }

  div:after {
    content: " ";
    display: block;
    position: absolute;
    top: 0.25rem;
    left: 0.6875rem;
    width: 0.125rem;
    height: 0.25rem;
    border-radius: 20%;
    background: #fff;
  }
  div:nth-child(1) {
    transform: rotate(0deg);
    animation-delay: -1.1s;
  }
  div:nth-child(2) {
    transform: rotate(30deg);
    animation-delay: -1s;
  }
  div:nth-child(3) {
    transform: rotate(60deg);
    animation-delay: -0.9s;
  }
  div:nth-child(4) {
    transform: rotate(90deg);
    animation-delay: -0.8s;
  }
  div:nth-child(5) {
    transform: rotate(120deg);
    animation-delay: -0.7s;
  }
  div:nth-child(6) {
    transform: rotate(150deg);
    animation-delay: -0.6s;
  }
  div:nth-child(7) {
    transform: rotate(180deg);
    animation-delay: -0.5s;
  }
  div:nth-child(8) {
    transform: rotate(210deg);
    animation-delay: -0.4s;
  }
  div:nth-child(9) {
    transform: rotate(240deg);
    animation-delay: -0.3s;
  }
  div:nth-child(10) {
    transform: rotate(270deg);
    animation-delay: -0.2s;
  }
  div:nth-child(11) {
    transform: rotate(300deg);
    animation-delay: -0.1s;
  }
  div:nth-child(12) {
    transform: rotate(330deg);
    animation-delay: 0s;
  }
`;

const MediumSpinner = () => {
  return (
    <StyledMediumSpinner>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </StyledMediumSpinner>
  );
};

const SmallSpinner = () => {
  return (
    <StyledSmallSpinner>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </StyledSmallSpinner>
  );
};

const Spinner: VFC<{ size?: "small" | "medium" }> = ({ size = "medium" }) => {
  switch (size) {
    case "small": {
      return <SmallSpinner />;
    }
    case "medium": {
      return <MediumSpinner />;
    }
    default: {
      return null;
    }
  }
};

export { Spinner };
