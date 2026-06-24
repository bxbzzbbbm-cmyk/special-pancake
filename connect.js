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
  console.log("[+] Getting VPN locations...\n");

  const locations = run(
    "curl -s https://sturdy-octo-happiness-production.up.railway.app/api/vpn/list"
  );

  console.log(locations);
  console.log("");

  const countryCode = (await ask("Enter country_code: ")).trim();
  const city = (await ask("Enter city: ")).trim();

  if (!countryCode || !city) {
    console.log("country_code and city are required.");
    process.exit(1);
  }

  console.log("\n[+] Connecting VPN...\n");

  const result = run(
    `curl -s -X POST https://sturdy-octo-happiness-production.up.railway.app/api/vpn/connect \
    -H "Content-Type: application/json" \
    -d '{"country_code":"${countryCode}","city":"${city}"}'`
  );

  console.log(result);

  rl.close();
})();
