import { describe, expect, it } from 'vitest';
import { extractChainOfThought, filterChainOfThought } from './chainOfThought';

describe('chain-of-thought filtering', () => {
  it('removes an empty Qwen think shell before the JSON response', () => {
    const output = '<think>\n\n</think>\n{"answer":"ok"}';
    expect(extractChainOfThought(output).cleanResponse).toBe('{"answer":"ok"}');
    expect(filterChainOfThought(output)).toBe('{"answer":"ok"}');
  });

  it('hides a partial leading think block during streaming', () => {
    expect(filterChainOfThought('<think>planning')).toBe('');
    expect(filterChainOfThought('<think>planning</think>done')).toBe('done');
  });
});
