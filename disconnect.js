const { execSync } = require("child_process");
const readline = require("readline");

function run(cmd) {
  try {
    return execSync(cmd, {
      encoding: "utf8",
      stdio: ["pipe", "pipe", "inherit"],
      shell: "/bin/bash"
    });
  } catch (e) {
    console.error("Failed:", cmd);
    process.exit(1);
  }
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(question) {
  return new Promise(resolve => rl.question(question, resolve));
}

(async () => {
  const sessionId = (await ask(
    "Enter session id: "
  )).trim();

  if (!sessionId) {
    console.log("Session id is required.");
    process.exit(1);
  }

  console.log("\n[+] Disconnecting VPN...\n");

  const response = run(
    `curl -X POST https://sturdy-octo-happiness-production.up.railway.app/api/vpn/disconnect \
    -H "Content-Type: application/json" \
    -d '{"session_id":"${sessionId}"}'`
  );

  console.log("\n=== RESPONSE ===\n");
  console.log(response);

  rl.close();
})();
