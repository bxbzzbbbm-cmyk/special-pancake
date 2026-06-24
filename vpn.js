const { execSync } = require("child_process");
const readline = require("readline");

function run(cmd) {
  try {
    return execSync(cmd, {
      encoding: "utf8",
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

function ask(q) {
  return new Promise(resolve => rl.question(q, resolve));
}

(async () => {
  console.clear();

  console.log("[+] Fetching country list...\n");

  const countries = run(
    "curl -s https://sturdy-octo-happiness-production.up.railway.app/api/vpn/list"
  );

  console.log(countries);
  console.log("");

  const country = (await ask("Enter country name: ")).trim();

  if (!country) {
    console.log("Country name required.");
    process.exit(1);
  }

  console.log("\n[+] Connecting VPN...\n");

  const response = run(
    `curl -s -X POST https://sturdy-octo-happiness-production.up.railway.app/api/vpn/connect \
    -H "Content-Type: application/json" \
    -d '{"country":"${country}"}'`
  );

  console.log(response);

  rl.close();
})();
