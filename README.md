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

1. Clone this repository:
   ```bash
   git clone https://github.com/kuyrathdaro/cc-wc-tool.git
   cd cc-wc-tool
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
3. Build executables:
   
    The project includes a build script to generate executable files for Windows and Linux platforms.

    Run the build script:
    ```bash
    npm run build
    ```
    This will create executable files in the dist/ directory:

    For Windows: wc-tool.exe

    For Linux: wc-tool

    Move the executable to a directory in your system's PATH for global usage. For example

    ```bash
    mv dist/wc-tool /usr/local/bin/wc-tool
    ```