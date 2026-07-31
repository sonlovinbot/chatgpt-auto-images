export function isRecoverableChatGPTConversationUrl(value) {
  try {
    const url = new URL(String(value || ""));
    if (url.origin !== "https://chatgpt.com") return false;
    const match = url.pathname.match(/^\/c\/([^/]+)\/?$/i);
    return Boolean(match?.[1]) && !/^WEB:/i.test(match[1]);
  } catch {
    return false;
  }
}
