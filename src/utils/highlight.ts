export default function highlight(text: string, highlighter: string): string[] {
  const lowerCaseText = text.toLowerCase();
  const lowerCaseHighlighter = highlighter.toLowerCase();
  const index = lowerCaseText.indexOf(lowerCaseHighlighter);
  const { length } = lowerCaseHighlighter;
  if (index >= 0) {
    return [text.substring(0, index), text.substring(index, index + length), text.substring(index + length)];
  }
  return [text];
}
