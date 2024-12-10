import path from "path";
import { spawnSync } from "child_process";

function executeCCWCCommand(args) {
  const scriptPath = path.join(__dirname, "../src/index.js");
  try {
    const result = spawnSync("node", [scriptPath, ...args], {
      encoding: "utf-8",
    });

    if (result.error) {
      throw new Error(`Command failed: ${result.error.message}`);
    }
    return result.stdout;
  } catch (error) {
    throw new Error(`Command failed: ${error.message}`);
  }
}

describe("ccwc tests", () => {
  const testFile = path.join(__dirname, "test.txt");
  const expectedBytes = 342190;
  const expectedLines = 7145;
  const expectedWords = 58164;
  const expectedCharacters = 339292;

  it("Step One: should count bytes correctly with -c option", () => {
    const output = executeCCWCCommand(["-c", testFile]);
    const byteCount = parseInt(output.trim().split(/\s+/)[0], 10);
    expect(byteCount).toBe(expectedBytes);
  });

  it("Step Two: should count lines correctly with -l option", () => {
    const output = executeCCWCCommand(["-l", testFile]);
    const lineCount = parseInt(output.trim().split(/\s+/)[0], 10);
    expect(lineCount).toBe(expectedLines);
  });

  it("Step Three: should count words correctly with -w option", () => {
    const output = executeCCWCCommand(["-w", testFile]);
    const wordCount = parseInt(output.trim().split(/\s+/)[0], 10);
    expect(wordCount).toBe(expectedWords);
  });

  it("Step Four: should count characters correctly with -m option", () => {
    const output = executeCCWCCommand(["-m", testFile]);
    const characterCount = parseInt(output.trim().split(/\s+/)[0], 10);
    expect(characterCount).toBe(expectedCharacters);
  });

  it("Step Five: should display counts for bytes, lines, and words when no option is provided", () => {
    const output = executeCCWCCommand([testFile]);
    const counts = output.trim().split(/\s+/);
    expect(counts[0]).toBe(expectedLines.toString());
    expect(counts[1]).toBe(expectedWords.toString());
    expect(counts[2]).toBe(expectedBytes.toString());
  });

  it("The Final Step: should display count lines correctly with -l option from stdin", () => {
    const scriptPath = path.join(__dirname, "../src/index.js");
    const inputFilePath = path.join(__dirname, "test.txt"); // Update path if necessary

    const output = spawnSync(`cat ${inputFilePath} | node ${scriptPath} -l`, {
      shell: true, // Enable shell mode for the pipe operator
      encoding: "utf-8",
    });

    const lineCount = parseInt(output.stdout.trim(), 10);
    expect(lineCount).toBe(expectedLines);
  });
});
