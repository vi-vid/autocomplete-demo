export default function prepareGoogleSearchURL(searchQuery: string): URL {
  return new URL(
    `https://www.google.com/search?q=${searchQuery
      .split(' ')
      .map((word) => encodeURIComponent(word.replace(/[^a-zA-Z0-9]/g, '')))
      .filter(Boolean)
      .join('+')}`
  );
}
