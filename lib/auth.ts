/**
 * Cloudflare Workers AI credentials — server-side only.
 * Values come from env (set by Autodev scaffold / Vercel env). Never hardcode secrets here.
 */

export type CfAiAuth = {
  accountId: string;
  apiToken: string;
};

export function getCfAiAuth(): CfAiAuth {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = process.env.CLOUDFLARE_API_TOKEN;
  if (!accountId || !apiToken) {
    throw new Error(
      "Missing CLOUDFLARE_ACCOUNT_ID or CLOUDFLARE_API_TOKEN — set them in .env.local",
    );
  }
  return { accountId, apiToken };
}

export function cfAiEndpoint(model = "@cf/meta/llama-3.1-8b-instruct"): string {
  const { accountId } = getCfAiAuth();
  return `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${model}`;
}

/** Run a Workers AI text model. Server-only. */
export async function runWorkersAi(opts: {
  prompt: string;
  system?: string;
  model?: string;
  maxTokens?: number;
}): Promise<string> {
  const { apiToken } = getCfAiAuth();
  const model = opts.model ?? "@cf/meta/llama-3.1-8b-instruct";
  const res = await fetch(cfAiEndpoint(model), {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages: [
        ...(opts.system
          ? [{ role: "system" as const, content: opts.system }]
          : []),
        { role: "user" as const, content: opts.prompt },
      ],
      max_tokens: opts.maxTokens ?? 512,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Workers AI ${res.status}: ${body}`);
  }

  const json = (await res.json()) as {
    result?: { response?: string };
    success?: boolean;
  };
  const text = json.result?.response;
  if (!text) throw new Error("Workers AI returned empty response");
  return text;
}
