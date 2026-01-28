import { List } from './list';
import { GREEN, PURPLE, Secondary } from './paint';

/**
 * Returns the amount of each primary color present in list of secondary colors
 * @param L list of Secondary colors to count the primaries colors in
 * @returns [amt-red(L), amt-blue(L), amt-yellow(L)], where amt-red/blue/yellow
 *    are defined as follows:
 * amt-red: List<Secondary> -> R
 *   amt-red(nil)          := 0
 *   amt-red(PURPLE :: cs) := 0.5 + amt-red(cs)
 *   amt-red(GREEN :: cs)  := amt-red(cs)
 *   amt-red(ORANGE :: cs) := 0.5 + amt-red(cs)
 * 
 * amt-blue: List<Secondary> -> R
 *   amt-blue(nil)          := 0
 *   amt-blue(PURPLE :: cs) := 0.5 + amt-blue(cs)
 *   amt-blue(GREEN :: cs)  := 0.5 + amt-blue(cs)
 *   amt-blue(ORANGE :: cs) := amt-blue(cs)
 * 
 * amt-yellow: List<Secondary> -> R
 *   amt-yellow(nil)          := 0
 *   amt-yellow(PURPLE :: cs) := amt-yellow(cs)
 *   amt-yellow(GREEN :: cs)  := 0.5 + amt-yellow(cs)
 *   amt-yellow(ORANGE :: cs) := 0.5 + amt-yellow(cs)
 */
export const amtPrimaries = (L: List<Secondary>): [number, number, number] => {
  let r: number = 0;
  let b: number = 0;
  let y: number = 0;
  // Inv: amt-red(L_0) = r + amt-red(L) and amt-blue(L_0) = b + amt-blue(L)
  //      and amt-yellow(L_0) = y + amt-yellow(L)
  while (L.kind !== "nil") {
    if (L.hd === PURPLE) {
      r = r + 0.5;
      b = b + 0.5;
    } else if (L.hd === GREEN) {
      b = b + 0.5;
      y = y + 0.5;
    } else { // ORANGE
      r = r + 0.5;
      y = y + 0.5;
    }
    L = L.tl;
  }
  return [r, b, y];
}