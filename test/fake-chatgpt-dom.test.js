import assert from "node:assert/strict";
import test from "node:test";
import {
  chatGPTImageIdentity,
  selectNewImage,
} from "../src/result-detection.js";

test("fake ChatGPT DOM never returns a baseline image", () => {
  const baseline = ["https://chatgpt.test/old.png"];
  const fakeDomImages = [
    { src: "https://chatgpt.test/old.png", width: 2048, height: 2048 },
    { src: "https://chatgpt.test/new.png", width: 1024, height: 1024 }
  ];
  assert.equal(selectNewImage(baseline, fakeDomImages)?.src, "https://chatgpt.test/new.png");
});

test("chooses the highest resolution new image candidate", () => {
  const selected = selectNewImage([], [
    { src: "thumbnail", width: 512, height: 512 },
    { src: "original", width: 2048, height: 2048 }
  ]);
  assert.equal(selected?.src, "original");
});

test("returns no result when the fake DOM contains only old images", () => {
  assert.equal(selectNewImage(["old"], [{ src: "old", width: 1024, height: 1024 }]), null);
});

test("treats refreshed ChatGPT signatures as the same old image", () => {
  const old =
    "https://chatgpt.com/backend-api/estuary/content?id=file_old&ts=1&sig=first";
  const refreshed =
    "https://chatgpt.com/backend-api/estuary/content?id=file_old&ts=2&sig=second";
  assert.equal(chatGPTImageIdentity(old), "chatgpt-file:file_old");
  assert.equal(chatGPTImageIdentity(refreshed), "chatgpt-file:file_old");
  assert.equal(
    selectNewImage([old], [
      {
        src: refreshed,
        width: 941,
        height: 1672,
        turnId: "conversation-turn-10",
      },
    ]),
    null,
  );
});

test("rejects images from assistant turns that existed before submission", () => {
  const selected = selectNewImage(
    [],
    [
      {
        src: "https://chatgpt.test/wrong.png",
        width: 2048,
        height: 2048,
        turnId: "conversation-turn-10",
        turnIndex: 10,
      },
      {
        src: "https://chatgpt.test/right.png",
        width: 1024,
        height: 1792,
        turnId: "conversation-turn-12",
        turnIndex: 12,
      },
    ],
    { baselineTurnIds: ["conversation-turn-10"] },
  );
  assert.equal(selected?.src, "https://chatgpt.test/right.png");
});
