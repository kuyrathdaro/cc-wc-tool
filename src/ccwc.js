import fs from "fs";

async function processFiles(files, options) {
  const total = {
    lines: 0,
    words: 0,
    bytes: 0,
    chars: 0,
    maxLineLength: 0,
  };
  const results = [];

  for (const file of files) {
    try {
      const data = await fs.promises.readFile(file, "utf-8");
      const stats = processInput(data, options);
      results.push({ ...stats, name: file });

      Object.keys(total).forEach((key) => (total[key] += stats[key]));
    } catch (err) {
      console.error(`Error reading file ${file}: ${err.message}`);
      process.exit(1);
    }
  }

  if (files.length > 1) {
    results.push({ ...total, name: "total" });
  }
  displayResults(results, options);
}

function processInput(data, options) {
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

  return {
    lines,
    words,
    bytes,
    chars,
    maxLineLength,
  };
}

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

function displayResults(results, options) {
  const keys = ["lines", "words", "bytes", "chars", "maxLineLength"];
  const widths = keys.map((key) =>
    options[key] ? Math.max(...results.map((r) => r[key].toString().length)) : 0
  );
  const nameWidth = Math.max(...results.map((r) => r.name.length));

  results.forEach((result) => {
    const row = keys
      .filter((key) => options[key])
      .map((key, i) => result[key].toString().padStart(widths[i]))
      .join(" ");
    console.log(`  ${row} ${result.name.padEnd(nameWidth)}`);
  });
}

export { processFiles, processInput, displayResults };
