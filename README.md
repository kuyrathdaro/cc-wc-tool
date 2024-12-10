# WC Tool

A lightweight Node.js-based tool inspired by the Unix `wc` command to count the number of words, lines, and characters in a given text file.

## Features

- Count **lines**, **words**, and **characters** in a text file.
- Easy to use with a simple CLI interface.
- Supports processing multiple files.
- Build executable files for Windows and Linux environments.
- Lightweight and fast.

## Inspiration

This tool was built as a solution to a coding challenge that aimed to replicate the functionality of the Unix `wc` command using Node.js. The challenge provided guidelines and specifications to enhance problem-solving and coding skills. It served as an excellent exercise in file handling, argument parsing, and performance optimization in JavaScript. Please check link to the original challenge: [https://codingchallenges.fyi/challenges/challenge-wc](https://codingchallenges.fyi/challenges/challenge-wc).

## Installation

### Clone this repository:

```bash
git clone https://github.com/kuyrathdaro/cc-wc-tool.git
cd cc-wc-tool
```

### Install dependencies:

```bash
npm install
```

### Build executables:
   
The project includes a build script to generate executable files for Windows and Linux platforms.

Run the build script:

```bash
npm run build
```

This will create executable files in the dist/ directory:

For Windows: **ccwc-win.exe**

For Linux: **ccwc**

Move the executable to a directory in your system's PATH for global usage. For example

```bash
mv dist/ccwc /usr/local/bin/ccwc
```

## Usage

Run the tool with the following syntax:

```bash
ccwc <file1> <file2>
```

Example:

```bash
ccwc file1.txt file2.txt
```

This will display the line, word, and character counts for each file and the total for all files.

## Tests

To ensure the tool is functioning as expected, tests are included in the project.

### Running Tests

Ensure all dependencies are installed:

```bash
npm install
```

Run the tests:

```bash
npm run test
```

The tests will validate:

- Byte counting.
- Line counting.
- Word counting.
- Character counting.
- Read from stdin.

### Adding New Tests

You can add test cases by modifying or extending the files in the tests/ directory. Tests are written using Jest, a simple JavaScript testing framework.

To run specific tests:

```bash
npm run test -- <test-file-name>
```

