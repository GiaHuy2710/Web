const https = require("https");
const { execSync } = require("child_process");

const webhookUrl =
  process.env.DISCORD_WEBHOOK ||
  "https://discord.com/api/webhooks/1553070027203280966/dMgNSTfSwob77686Bg6UpZ3AWve2_QgkhuNf6Lphc_OVqHPA0jCWKbeghFOtRVsn2PHg";

try {
  const commitMsg = execSync("git log -1 --pretty=format:%s").toString().trim();
  const commitHash = execSync("git log -1 --pretty=format:%h").toString().trim();
  const author = execSync("git log -1 --pretty=format:%an").toString().trim();
  const branch = execSync("git rev-parse --abbrev-ref HEAD").toString().trim();

  const payload = JSON.stringify({
    username: "Profile Git Bot",
    avatar_url: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
    embeds: [
      {
        title: `📌 New Commit: [${branch}] ${commitHash}`,
        description: `**${commitMsg}**\n\n👤 **Tác giả:** \`${author}\`\n🌿 **Nhánh:** \`${branch}\``,
        color: 3447003,
        footer: { text: "Profile Monorepo • Local Git Hook" },
        timestamp: new Date().toISOString(),
      },
    ],
  });

  const url = new URL(webhookUrl);
  const req = https.request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(payload),
    },
  });
  req.on("error", () => {});
  req.write(payload);
  req.end();
} catch (_err) {
  // Silent fail if offline or git missing
}
