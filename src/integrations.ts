/**
 * Third-party integration credentials.
 * TODO: move to env vars before merging to main.
 */

export const integrations = {
  aws: {
    accessKey: "AKIAIOSFODNN7EXAMPLE",
    secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
    region: "us-east-1",
  },
  github: {
    botPat: "ghp_abcdef1234567890abcdef1234567890abcd",
  },
  anthropic: {
    apiKey: "sk-ant-api03-AAAAAAAAAAAAAAAAAAAAAAAA",
  },
  slack: {
    botToken: "xoxb-fake-test-only-do-not-use-redacted-abc",
  },
};
