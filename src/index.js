import fs from "fs";
import { processInput, processFiles, displayResults } from "./ccwc.js";

// ccwc version
const VERSION = "1.1.0";

function printHelp() {
  const HELP_TEXT = `Usage: ccwc [OPTION]... [FILE]...
or:  ccwc [OPTION]... --files0-from=F
Description:
    Print newline, word, and byte counts for each FILE, and a total line if
    more than one FILE is specified.  A word is a non-zero-length sequence of
    characters delimited by white space.

    With no FILE, or when FILE is -, read standard input.

    The options below may be used to select which counts are printed, always in
    the following order: newline, word, character, byte, maximum line length.

Options:
    -c, --bytes             print the bytes counts
    -m, --chars             print the character counts
    -l, --lines             print the newline counts
    --files0-from=F         read input from the files specified by NUL-terminated names in file F; If F is - then read names from standard input
    -L, --max-line-length   print the maximum display width
    -w, --words             print the word counts
    --help                  display this help and exit
    --version               output version information and exit
`;
  console.log(HELP_TEXT);
}

async function main(args) {
  const options = {
    bytes: false,
    chars: false,
    lines: false,
    words: false,
    maxLineLength: false,
  };

  let files = [];
  let filesFrom;

  // Parse command-line arguments
  for (const arg of args.slice(2)) {
    switch (arg) {
      case "-c":
      case "--bytes":
        options.bytes = true;
        break;
      case "-w":
      case "--words":
        options.words = true;
        break;
      case "-m":
      case "--chars":
        options.chars = true;
        break;
      case "-l":
      case "--lines":
        options.lines = true;
        break;
      case "-L":
      case "--max-line-length":
        options.maxLineLength = true;
        break;
      case "--version":
        console.log(`ccwc version ${VERSION}`);
        return;
      case "--help":
        printHelp();
        return;
      default:
        if (arg.startsWith("--files0-from=")) {
          filesFrom = arg.split("=")[1];
        } else if (arg.startsWith("-")) {
          console.error(
            `ccwc: unrecognized option ${arg}\nTry 'ccwc --help' for more information.`
          );
          process.exit(1);
        } else {
          files.push(arg);
        }
    }
  }

  // Default options if none specified
  if (
    !options.lines &&
    !options.words &&
    !options.bytes &&
    !options.chars &&
    !options.maxLineLength
  ) {
    options.lines = options.words = options.bytes = true; // Default to all options
  }

  // If no files specified, use stdin
  if (files.length === 0 && !filesFrom) {
    await readFromStdin(options);
    return;
  }

  // If --files0-from is used, read file list from it
  if (filesFrom) {
    await readFilesFrom(filesFrom, options);
    return;
  }

  // Process files directly
  await processFiles(files, options);
}

// Read input from stdin
async function readFromStdin(options) {
  let inputData = '';
  process.stdin.setEncoding('utf-8');

  process.stdin.on('data', (chunk) => {
    inputData += chunk;
  });

  process.stdin.on('end', () => {
    // Process input and display results
    const stats = processInput(inputData, options);
    displayResults([{ ...stats, name: "" }], options);  // Ensure results are displayed
  });

  process.stdin.resume();  // Start reading from stdin
}

// Read file names from a file or stdin
async function readFilesFrom(filesFrom, options) {
  if (filesFrom === "-") {
    let input = "";
    for await (const chunk of process.stdin) {
      input += chunk;
    }
    const files = input.split("\0").filter(Boolean);
    await processFiles(files, options);
  } else {
    try {
      const fileList = await fs.promises.readFile(filesFrom, "utf-8");
      const files = fileList.split("\0").filter(Boolean);
      await processFiles(files, options);
    } catch (err) {
      console.error(`ccwc: ${filesFrom}: No such file or directory`);
      process.exit(1);
    }
  }
}

// Run the program
main(process.argv).catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
