import * as assert from 'assert';
import { amtPrimaries } from './color_ops';
import { cons, nil } from './list';
import { PURPLE, GREEN, ORANGE } from './paint';

// TODO (Task 6b): 
// - Write tests according to our class requirements for even_zeros
// - Include comments describing which requirements each test fulfills

describe('color_ops', function() {

  it('amtPrimaries', function() {
    // Statement coverage:
    // [] executes the return at start, [PURPLE], [GREEN], [ORANGE] execute their branches

    // Branch & loop coverage: 0-case (empty list)
    assert.deepStrictEqual(amtPrimaries(nil), [0, 0, 0]);

    // Branch & loop coverage: 1-case for PURPLE
    // PURPLE contributes 0.5 red, 0.5 blue
    assert.deepStrictEqual(amtPrimaries(cons(PURPLE, nil)), [0.5, 0.5, 0]);

    // Branch & loop coverage: 1-case for GREEN
    // GREEN contributes 0.5 blue, 0.5 yellow
    assert.deepStrictEqual(amtPrimaries(cons(GREEN, nil)), [0, 0.5, 0.5]);

    // Branch & loop coverage: 1-case for ORANGE
    // ORANGE contributes 0.5 red, 0.5 yellow
    assert.deepStrictEqual(amtPrimaries(cons(ORANGE, nil)), [0.5, 0, 0.5]);

    // Loop coverage: many elements, test mix of all three branches
    assert.deepStrictEqual(amtPrimaries(cons(PURPLE, cons(GREEN, cons(ORANGE, cons(PURPLE, nil))))), [1.5, 1.5, 1.0]);
  });
  
});