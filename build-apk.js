const { execSync } = require("child_process");

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

console.log("[+] Building APK...");
run("chmod +x gradlew");
run("./gradlew assembleDebug");

console.log("\n[+] Build completed.");
console.log("[+] APK location:");
console.log("app/build/outputs/apk/debug/app-debug.apk");
