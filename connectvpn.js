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
  console.log("[+] Fetching VPN locations...\n");

  const list = run(
    "curl https://sturdy-octo-happiness-production.up.railway.app/api/vpn/list"
  );

  console.log("\n=== AVAILABLE LOCATIONS ===\n");
  console.log(list);

  const countryCode = (await ask(
    "\nEnter country_code: "
  )).trim();

  const city = (await ask(
    "Enter city: "
  )).trim();

  if (!countryCode || !city) {
    console.log("country_code and city are required.");
    process.exit(1);
  }

  console.log("\n[+] Connecting VPN...\n");

  const response = run(
    `curl -X POST https://sturdy-octo-happiness-production.up.railway.app/api/vpn/connect \
    -H "Content-Type: application/json" \
    -d '{"country_code":"${countryCode}","city":"${city}"}'`
  );

  console.log("\n=== VPN RESPONSE ===\n");
  console.log(response);

  rl.close();
})();
