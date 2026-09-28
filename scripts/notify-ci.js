const https = require("https");
const { execSync } = require("child_process");

const webhookUrl = process.env.DISCORD_WEBHOOK;

if (!webhookUrl || !webhookUrl.trim()) {
  console.log("⚠️ DISCORD_WEBHOOK secret is not set. Skipping notification.");
  process.exit(0);
}

// Clean webhook url if user accidentally appended /github
const cleanWebhookUrl = webhookUrl.trim().replace(/\/github\/?$/, "");

const lintStatus = process.env.LINT_STATUS || "failure";
const testStatus = process.env.TEST_STATUS || "failure";
const eventName = process.env.EVENT_NAME || "push";
const actor = process.env.ACTOR || "Unknown";
const refName = process.env.REF_NAME || "main";
const headRef = process.env.HEAD_REF || "";
const baseRef = process.env.BASE_REF || "";
const runId = process.env.RUN_ID || "";
const repository = process.env.REPOSITORY || "Web";
const prNumber = process.env.PR_NUMBER || "";
const prTitle = process.env.PR_TITLE || "";

const isSuccess = lintStatus === "success" && testStatus === "success";
const color = isSuccess ? 0x22c55e : 0xef4444; // Green : Red
const titleEmoji = isSuccess ? "✅" : "❌";
const overallStatus = isSuccess ? "BUILD PASSED" : "BUILD FAILED";

const lintTxt = lintStatus === "success" ? "Passed" : "Failed";
const testTxt = testStatus === "success" ? "Passed" : "Failed";

let itemTitle = "";
let branchFlow = "";
let eventLabel = eventName;

if (eventName === "pull_request") {
  itemTitle = `**PR #${prNumber}:** ${prTitle}`;
  branchFlow = `${headRef} ➔ ${baseRef}`;
} else {
  let commitMsg = "No commit message";
  try {
    commitMsg = execSync('git log -1 --pretty=format:"%s"').toString().trim();
  } catch (_e) {
    // ignore
  }

  itemTitle = `**Commit:** \`${commitMsg}\``;
  branchFlow = refName;

  if (commitMsg.startsWith("Merge pull request")) {
    eventLabel = "PR Merged 🎉";
  }
}

const actionUrl = `https://github.com/${repository}/actions/runs/${runId}`;

const payload = {
  username: "Profile Monorepo CI",
  avatar_url: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
  embeds: [
    {
      title: `${titleEmoji} CI Pipeline: ${overallStatus}`,
      url: actionUrl,
      color: color,
      description: `${itemTitle}\n\n**Author:** \`${actor}\`  |  **Event:** \`${eventLabel}\``,
      fields: [
        { name: "Branch", value: `\`${branchFlow}\``, inline: false },
        { name: "Lint & Typecheck", value: lintTxt, inline: true },
        { name: "Unit & Auto Tests", value: testTxt, inline: true },
        { name: "Action Logs", value: `[View Run Details](${actionUrl})`, inline: false },
      ],
      footer: { text: "Profile Monorepo CI/CD" },
      timestamp: new Date().toISOString(),
    },
  ],
};

const payloadString = JSON.stringify(payload);
const url = new URL(cleanWebhookUrl);

const req = https.request(
  url,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(payloadString),
    },
  },
  (res) => {
    let body = "";
    res.on("data", (chunk) => (body += chunk));
    res.on("end", () => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        console.log(`✅ Successfully sent Discord CI notification (status: ${res.statusCode})`);
      } else {
        console.error(`❌ Discord API returned error ${res.statusCode}: ${body}`);
      }
      process.exit(0);
    });
  }
);

req.on("error", (err) => {
  console.error("❌ Failed to send Discord notification:", err.message);
  process.exit(0); // Do not fail the whole CI pipeline just because Discord webhook had network issue
});

req.write(payloadString);
req.end();
