import { execFileSync, spawn } from "node:child_process";
import { createWriteStream } from "node:fs";
import path from "node:path";
import { setTimeout as sleep } from "node:timers/promises";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fallbackPort = 3456;
const preferredPorts = [4321, fallbackPort];
const logoPath = path.join(root, "src/images/brand/livestack-logo.png");
const bgCapture = path.join(root, "scripts/.og-background.png");
const outJpg = path.join(root, "public/og-image.jpg");

async function probeCapturePage(port) {
  const url = `http://127.0.0.1:${port}/og-capture`;
  try {
    const response = await fetch(url, { redirect: "follow" });
    if (response.ok) return url;
  } catch {
    // not ready
  }
  return null;
}

async function waitForServer(url, timeoutMs = 90_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(url, { redirect: "follow" });
      if (response.ok) return;
    } catch {
      // dev server still starting
    }
    await sleep(300);
  }
  throw new Error(`Timed out waiting for dev server at ${url}`);
}

function startDevServer() {
  const child = spawn(
    process.execPath,
    [
      path.join(root, "node_modules/astro/bin/astro.mjs"),
      "dev",
      "--force",
      "--port",
      String(fallbackPort),
      "--host",
      "127.0.0.1",
    ],
    {
      cwd: root,
      stdio: ["ignore", "pipe", "pipe"],
      env: { ...process.env, NODE_ENV: "development" },
    },
  );

  const log = createWriteStream(path.join(root, "scripts/.og-dev.log"), { flags: "a" });
  child.stdout?.pipe(log);
  child.stderr?.pipe(log);

  return child;
}

async function resolveCaptureUrl() {
  for (const port of preferredPorts) {
    const url = await probeCapturePage(port);
    if (url) return { url, server: null };
  }

  const server = startDevServer();
  const url = `http://127.0.0.1:${fallbackPort}/og-capture`;
  await waitForServer(url);
  return { url, server };
}

async function captureBackground() {
  let chromium;
  try {
    ({ chromium } = await import("playwright"));
  } catch {
    console.error(
      "Playwright is required for og:image. Run: npm install && npx playwright install chromium",
    );
    process.exit(1);
  }

  const { url: captureUrl, server } = await resolveCaptureUrl();

  try {
    const browser = await chromium.launch();
    const page = await browser.newPage({
      viewport: { width: 1200, height: 630 },
      deviceScaleFactor: 1,
    });

    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto(captureUrl, { waitUntil: "networkidle", timeout: 60_000 });

    await page.waitForSelector("[data-gradient-shader].opacity-100", { timeout: 45_000 });

    // Random frame from the slow shader drift (same canvas as the home hero).
    const frameDelayMs = 600 + Math.floor(Math.random() * 2_400);
    await sleep(frameDelayMs);

    await page.locator("#og-capture-root").screenshot({ path: bgCapture, type: "png" });
    await browser.close();
  } finally {
    if (server) {
      server.kill("SIGTERM");
      await sleep(400);
      if (!server.killed) server.kill("SIGKILL");
    }
  }
}

function compositeLogo() {
  execFileSync(
    "magick",
    [
      bgCapture,
      "(",
      logoPath,
      "-resize",
      "440x",
      ")",
      "-gravity",
      "Center",
      "-compose",
      "Over",
      "-composite",
      "-quality",
      "92",
      outJpg,
    ],
    { stdio: "inherit" },
  );
}

await captureBackground();
compositeLogo();
console.log(`Wrote ${path.relative(root, outJpg)}`);