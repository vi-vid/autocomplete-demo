import { describe, it, expect } from 'vitest';
import prepareGoogleSearchURL from './prepare-google-search-url';

describe('prepareGoogleSearchURL', () => {
  it('should construct a Google search URL for a simple query', () => {
    const result = prepareGoogleSearchURL('Hello World');
    expect(result.toString()).toBe('https://www.google.com/search?q=Hello+World');
  });

  it('should handle multiple spaces between and around words', () => {
    const result = prepareGoogleSearchURL('  Hello    World  ');
    expect(result.toString()).toBe('https://www.google.com/search?q=Hello+World');
  });

  it('should handle empty strings', () => {
    const result = prepareGoogleSearchURL('');
    expect(result.toString()).toBe('https://www.google.com/search?q=');
  });

  it('should ignore non-alphanumeric characters', () => {
    const result = prepareGoogleSearchURL('Hello @ World #');
    expect(result.toString()).toBe('https://www.google.com/search?q=Hello+World');
  });
});
