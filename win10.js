// Do not copy or edit code read LICENSE First.
// This Script is coded by Termux Professor (Youtuber)

const { execSync } = require("child_process");
const readline = require("readline");

function run(cmd) {
  try {
    execSync(cmd, {
      stdio: "inherit",
      shell: "/bin/bash"
    });
  } catch (e) {
    console.error("Failed:", cmd);
    process.exit(1);
  }
}

console.clear();

console.log("\x1b[1;92m ╦ ╦┬┌┐┌ \x1b[1;91m╔╦╗┌─┐┬─┐┌┬┐┬ ┬─┐ ┬");
console.log("\x1b[1;92m ║║║││││  \x1b[1;91m║ ├┤ ├┬┘││││ │┌┴┬┘");
console.log("\x1b[1;92m ╚╩╝┴┘└┘  \x1b[1;91m╩ └─┘┴└─┴ ┴└─┘┴ └─");
console.log("\x1b[1;92m [+] YouTube: \x1b[1;91mTermuxProfessor");
console.log("\x1b[1;92m [+] Github: \x1b[1;91mtermuxprofessor\x1b[0m");
console.log("");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Enter RAM size in MB (e.g. 1024): ", (ram) => {
  if (!ram.trim()) {
    console.log("RAM size is required.");
    rl.close();
    process.exit(1);
  }

  console.log("\nInstalling required packages...\n");

  run("termux-wake-lock");
  run("pkg install x11-repo -y");
  run("pkg install qemu-system-x86_64 -y");

  console.log("\n[+] Server Is Running....");
  console.log("Your Server IP is: 127.0.0.1:2");

  run(
    `qemu-system-x86_64 -m ${ram} -cdrom storage/downloads/WIN10TP.iso -vnc 127.0.0.1:2`
  );

  rl.close();
});
