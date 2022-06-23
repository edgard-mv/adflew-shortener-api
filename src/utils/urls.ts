import { nanoid } from "nanoid/async";

export const isValidHttpUrlWithTld = (
  candidateUrl: string
): {
  isValid: boolean;
  reason?: string;
} => {
  try {
    const parsedUrl = new URL(candidateUrl);

    if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
      return {
        isValid: false,
        reason: "Protocol is not http(s)",
      };
    }

    if (parsedUrl.origin.split(".").length === 1) {
      return { isValid: false, reason: "Missing top level domain" };
    }

    return { isValid: true };
  } catch (err) {
    return {
      isValid: false,
      reason: "Invalid URL",
    };
  }
};

// for collision concerns, visit https://zelark.github.io/nano-id-cc/
export const getNewIdForUrl = () => nanoid(7);
