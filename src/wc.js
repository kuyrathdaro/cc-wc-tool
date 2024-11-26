import fs from "fs";

async function processFiles(files, options) {
  const total = {
    lines: 0,
    words: 0,
    bytes: 0,
    chars: 0,
    maxLineLength: 0,
  };

  for (const file of files) {
    try {
      const data = await fs.promises.readFile(file, "utf-8");
      const { lines, words, bytes, chars, maxLineLength } = processInput(
        data,
        options,
        file
      );

      total.lines += lines;
      total.words += words;
      total.bytes += bytes;
      total.chars += chars;
      total.maxLineLength = Math.max(total.maxLineLength, maxLineLength);
    } catch (err) {
      console.error(`Error reading file ${file}: ${err.message}`);
      process.exit(1);
    }
  }

  if (files.length > 1) {
    const results = [];
    if (options.lines) results.push(total.lines.toString());
    if (options.words) results.push(total.words.toString());
    if (options.bytes) results.push(total.bytes.toString());
    if (options.chars) results.push(total.chars.toString());
    if (options.maxLineLength) results.push(total.maxLineLength.toString());

    console.log(`${results.join("\t")} total`);
  }
}

function processInput(data, options, sourceName) {
  const lines = countLines(data);
  const words = countWords(data);
  const bytes = countBytes(data);
  const chars = countChars(data);
  const maxLineLength = getMaxLineLength(data);

  const results = [];
  if (options.lines) results.push(lines.toString());
  if (options.words) results.push(words.toString());
  if (options.bytes) results.push(bytes.toString());
  if (options.chars) results.push(chars.toString());
  if (options.maxLineLength) results.push(maxLineLength.toString());

  console.log(`${results.join("\t")} ${sourceName}`);

  return {
    lines,
    words,
    bytes,
    chars,
    maxLineLength,
  };
}

// Utility functions
function countChars(text) {
  return text.length;
}

function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function countLines(text) {
  const lines = text.split(/\r\n|\r|\n/);
  return text.endsWith("\n") || text.endsWith("\r")
    ? lines.length - 1
    : lines.length;
}

function countBytes(text) {
  return Buffer.byteLength(text, "utf-8");
}

function getMaxLineLength(text) {
  return text
    .split(/\r\n|\r|\n/)
    .reduce((max, line) => Math.max(max, line.length), 0);
}

export { processFiles, processInput };
