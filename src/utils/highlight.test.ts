import { describe, it, expect } from 'vitest';
import highlight from './highlight';

describe('highlight', () => {
  it('should highlight the matching part of the text', () => {
    const result = highlight('Hello, World!', 'World');
    expect(result).toEqual(['Hello, ', 'World', '!']);
  });

  it('should return the full text in an array if no match is found', () => {
    const result = highlight('Hello, World!', 'Vue');
    expect(result).toEqual(['Hello, World!']);
  });

  it('should be case insensitive', () => {
    const result = highlight('Hello, World!', 'world');
    expect(result).toEqual(['Hello, ', 'World', '!']);
  });

  it('should highlight the full text if the highlighter matches completely', () => {
    const result = highlight('Hello, World!', 'Hello, World!');
    expect(result).toEqual(['', 'Hello, World!', '']);
  });
});
