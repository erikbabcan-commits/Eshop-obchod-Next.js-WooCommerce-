import React from 'react';
interface CubeLogoProps {
  size?: number;
  className?: string;
}
export function CubeLogo({ size = 32, className = '' }: CubeLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true">

      {/* Back face */}
      <path
        d="M24 4L42 14V34L24 44L6 34V14L24 4Z"
        fill="currentColor"
        opacity="0.15" />

      {/* Left face */}
      <path d="M6 14L24 24V44L6 34V14Z" fill="currentColor" opacity="0.35" />
      {/* Right face */}
      <path d="M42 14L24 24V44L42 34V14Z" fill="currentColor" opacity="0.2" />
      {/* Top face */}
      <path
        d="M24 4L42 14L24 24L6 14L24 4Z"
        fill="currentColor"
        opacity="0.5" />

      {/* Edge lines */}
      <path
        d="M24 4L42 14L24 24L6 14L24 4Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
        opacity="0.6"
        fill="none" />

      <path
        d="M24 24V44M6 14V34L24 44L42 34V14"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
        opacity="0.4"
        fill="none" />

      {/* Inner cube (smaller, nested) */}
      <path
        d="M24 12L33 17.5L24 23L15 17.5L24 12Z"
        fill="currentColor"
        opacity="0.7" />

      <path
        d="M15 17.5L24 23V33L15 27.5V17.5Z"
        fill="currentColor"
        opacity="0.5" />

      <path
        d="M33 17.5L24 23V33L33 27.5V17.5Z"
        fill="currentColor"
        opacity="0.35" />

    </svg>);

}