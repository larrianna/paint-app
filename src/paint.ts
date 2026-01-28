import { amtPrimaries } from './color_ops';
import { concat, cons, List, nil } from './list';

/** Convinient constant for RED color */
export const RED: "RED" = "RED";
/** Convinient constant for YELLOW color */
export const YELLOW: "YELLOW" = "YELLOW";
/** Convinient constant for ORANGE color */
export const ORANGE: "ORANGE" = "ORANGE";
/** Convinient constant for BLUE color */
export const BLUE: "BLUE" = "BLUE";
/** Convinient constant for PURPLE color */
export const PURPLE: "PURPLE" = "PURPLE";
/** Convinient constant for GREEN color */
export const GREEN: "GREEN" = "GREEN";

/** All the possible colors of paints */
export type Color = "RED" | "ORANGE" | "YELLOW" | "GREEN" | "BLUE" | "PURPLE";

/** All the secondary colors of paints (all paints besides ORANGE, PURPLE, GREEN) */
export type Primary = "RED" | "YELLOW" | "BLUE";

/** All the secondary colors of paints (all paints besides BLUE, RED, YELLOW) */
export type Secondary = "ORANGE" | "PURPLE" | "GREEN";

/** All the paint colors! */
export const COLORS: Color[] = [RED, ORANGE, YELLOW, GREEN, BLUE, PURPLE];

/** Dot of paint on canvas: its (x, y) location and color */
export type Dot = {x: number, y: number, color: Color};

/**
 * Creates a Color from a string
 * @param s string to convert to color
 * @returns color associated with string
 */
export const stringToColor = (s: string): Color | undefined => {
  switch(s) {
    case "RED": return RED;
    case "ORANGE": return ORANGE;
    case "YELLOW": return YELLOW;
    case "GREEN": return GREEN;
    case "BLUE": return BLUE;
    case "PURPLE": return PURPLE;
    default: return undefined;
  }
}

/**
 * Determines the mix of two primary colors and returns an updated inventory
 * of paints reflecting the mix
 *
 * @param paintInventory current amounts of 6 colors of paints
 * @param c1 first color to be mixed
 * @param c2 second color to be mixed
 * @returns updated paintInventory with the count for the color resulting from
 *          mixing c1 and c2 increased by 1, and the count for c1 and c2 decreased
 *          by 0.5 each
 * @throws an Error if c1 and c2 are not mixable
 */
export const mix = (paintInventory: number[], c1: Color, c2: Color): number[] => {
  if ((c1 === RED && c2 === BLUE) || (c2 === RED && c1 === BLUE)) {
    // Decrease RED (0) and BLUE (4), and increase PURPLE (5)
    return [paintInventory[0] - 0.5, paintInventory[1], paintInventory[2],
    paintInventory[3], paintInventory[4] - 0.5, paintInventory[5] + 1];

  } else if ((c1 === RED && c2 === YELLOW) || (c2 === RED && c1 === YELLOW)) {
    // Decrease RED (0) and YELLOW (2), and increase ORANGE (1)
    return [paintInventory[0] - 0.5, paintInventory[1] + 1, paintInventory[2] - 0.5,
    paintInventory[3], paintInventory[4], paintInventory[5]];

  } else if ((c1 === BLUE && c2 === YELLOW) || (c2 === BLUE && c1 === YELLOW)) {
    // Decrease BLUE (4) and YELLOW (2), and increase GREEN (3)
    return [paintInventory[0], paintInventory[1], paintInventory[2] - 0.5,
    paintInventory[3] + 1, paintInventory[4] - 0.5, paintInventory[5]];

  } else {
    throw new Error(`You can't mix ${c1} and ${c2}.`);
  }
}

/**
 * Takes in an array of paints representing the user's inventory and un-mixes
 * the secondary colors into their primary components.
 * @param paintInventory array of colors in the inventory to be unmixed
 */
export const unmix = (paintInventory: number[]): number[] => {
  const secondaryList: List<Secondary> = secondariesToList(paintInventory);

  const [r, b, y] = amtPrimaries(secondaryList);

  return [paintInventory[0] + r, 0,
    paintInventory[2] + y, 0,
    paintInventory[4] + b, 0];
}

// Reads paintInventory for all secondary colors and creates a list of Secondary
// colors with one element for each unit of paint
const secondariesToList = (paintInventory: number[]): List<Secondary> => {
  // Safe to convert to BigInt becuase there is no instance of
  const orangeList = secondaryList(paintInventory[1], ORANGE);
  const greenList = secondaryList(paintInventory[3], GREEN);
  const purpleList = secondaryList(paintInventory[5], PURPLE);

  return concat(orangeList, concat(greenList, purpleList));
}

// Returns a list of size k where each element is `color`
const secondaryList = (k: number, color: Secondary): List<Secondary> => {
  if (k === 0) {
    return nil;
  } else {
    return cons(color, secondaryList(k - 1, color));
  }
}
