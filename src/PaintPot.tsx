import React from 'react';
import RedPaint from './img/red.jpg';
import YellowPaint from './img/yellow.jpg';
import OrangePaint from './img/orange.jpg';
import BluePaint from './img/blue.jpg';
import PurplePaint from './img/purple.jpg';
import GreenPaint from './img/green.jpg';
import { Color, RED, ORANGE, YELLOW, GREEN, BLUE, PURPLE } from "./paint";

type paintPotProps = {
  // color of paint
  color: Color,
  // whether pot should display as opaque (full) or transparent
  full: boolean,
  // size of pot graphic: large or small
  size: "l" | "s",
  // whether pot should display as 'selected' (slightly larger)
  selected: boolean,
  // to execute when this paint pot is clicked on
  onPaintClick: (color: Color) => void
}

const colorMap: Record<Color, { src: string; label: string }> = {
  [RED]: { src: RedPaint, label: 'Red' },
  [ORANGE]: { src: OrangePaint, label: 'Orange' },
  [YELLOW]: { src: YellowPaint, label: 'Yellow' },
  [GREEN]: { src: GreenPaint, label: 'Green' },
  [BLUE]: { src: BluePaint, label: 'Blue' },
  [PURPLE]: { src: PurplePaint, label: 'Purple' },
};

/**
 * Creates a paint pot graphic
 * @param props attributes to define paint pot appearance
 * @returns image of paint pot with specified attributes
 */
export const PaintPot = (props: paintPotProps): JSX.Element => {
  // const cls = props.full ? `paint ${props.size}` : `paint ${props.size} empty`;
  const cls = `paint ${props.size} ${props.full ? '' : 'empty'} ${props.selected ? 'selected' : ''}`;
  const paint = colorMap[props.color];

  return <button
      onClick={() => props.onPaintClick(props.color)}
      aria-label={`${paint.label} paint pot`}
      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
      <img src={paint.src} alt={`${paint.label} paint pot`} className={cls} />
    </button>;
}
