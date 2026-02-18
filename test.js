const fs = require("fs");
const path = require("path");
const { JSDOM } = require("jsdom");

function assert(name, condition, detail = "") {
  if (!condition) {
    throw new Error(`${name}${detail ? ` -> ${detail}` : ""}`);
  }
}

async function run() {
  const htmlPath = path.join(__dirname, "index.html");
  const html = fs.readFileSync(htmlPath, "utf8");

  const dom = new JSDOM(html, {
    runScripts: "dangerously",
    resources: "usable",
    url: "https://example.test/index.html?autotest=1"
  });

  await new Promise((resolve) => {
    dom.window.addEventListener("load", resolve, { once: true });
  });

  const doc = dom.window.document;
  const output = doc.getElementById("testOutput").textContent;

  assert("Auto test output exists", output.includes("Tests complete."));
  assert("Auto tests have no failures", /Failed:\s*0/.test(output), output);

  const story = doc.getElementById("story").textContent;
  assert("Story text rendered", story.trim().length > 0);

  let choices = [...doc.querySelectorAll("#choices button")];
  assert("Intro shows three choices", choices.length === 3, `choices=${choices.length}`);

  choices[0].click();
  choices = [...doc.querySelectorAll("#choices button")];
  assert("After click, still has branching choices", choices.length >= 2);

  doc.getElementById("restart").click();
  const resetStory = doc.getElementById("story").textContent;
  assert("Restart returns to intro scene", /You are a guy meeting [A-Za-z]+ at a cozy cafe\./.test(resetStory), resetStory);

  console.log("Preliminary tests passed:");
  console.log("- in-page autotest runner (0 failures)");
  console.log("- initial render and branching choices");
  console.log("- choice click advances scene");
  console.log("- restart returns to intro");
}

run().catch((err) => {
  console.error("Preliminary tests failed:", err.message);
  process.exit(1);
});
