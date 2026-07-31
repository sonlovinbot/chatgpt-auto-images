import assert from "node:assert/strict";
import test from "node:test";

import { isRecoverableChatGPTConversationUrl } from "../src/chatgpt-url.js";

test("accepts a durable ChatGPT conversation URL", () => {
  assert.equal(
    isRecoverableChatGPTConversationUrl(
      "https://chatgpt.com/c/6a6a00b4-d47c-83ec-aa8d-b67960004159",
    ),
    true,
  );
});

test("rejects ChatGPT WEB temporary conversation URLs", () => {
  assert.equal(
    isRecoverableChatGPTConversationUrl(
      "https://chatgpt.com/c/WEB:5a236088-70c0-4e4e-b22f-3fa301f57529",
    ),
    false,
  );
});

test("rejects new-chat and non-ChatGPT URLs", () => {
  assert.equal(isRecoverableChatGPTConversationUrl("https://chatgpt.com/"), false);
  assert.equal(
    isRecoverableChatGPTConversationUrl("https://example.com/c/real-id"),
    false,
  );
});
