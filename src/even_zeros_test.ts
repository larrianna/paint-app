import * as assert from 'assert';
import { even_zeros } from './even_zeros';
import { cons, nil } from './list';

// TODO (Task 6a): 
// - Write tests according to our class requirements for even_zeros
// - Include comments describing which requirements each test fulfills

describe('even_zeros', function() {

    it('even_zeros', function() {
    // Statement coverage: [] covers empty input
    // [1] covers branch where hd === 0
    // [2] covers branch where hd === 1
    // [3] covers branch where hd === 2

    // Loop coverage: 0-case (no iterations)
    assert.deepStrictEqual(even_zeros(nil), [0n, true]);

    // Loop coverage: 1-case with hd = 0 (zero counted)
    assert.deepStrictEqual(even_zeros(cons(0, nil)), [1n, true]);

    // Loop coverage: 1-case with hd = 1 (b flipped)
    assert.deepStrictEqual(even_zeros(cons(1, nil)), [0n, false]);

    // Loop coverage: 1-case with hd = 2 (ignored for zero and b unchanged)
    assert.deepStrictEqual(even_zeros(cons(2, nil)), [0n, true]);

    // Branch coverage and loop coverage: many digits
    // zeros = 2; b flips twice (true -> false -> true)
    assert.deepStrictEqual(even_zeros(cons(0, cons(1, cons(2, cons(0, cons(1, nil)))))), [2n, true]);
    });
});