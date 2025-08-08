import { CompletionCopilot, type CompletionRequestBody } from "monacopilot";
import { type NextRequest, NextResponse } from "next/server";

const copilot = new CompletionCopilot(undefined, {
  model: async (prompt) => {
    const response = await fetch(`${process.env.COMPLETION_BASE_URL}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.COMPLETION_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: `${process.env.COMPLETION_MODEL}`,
        messages: [
          { role: "system", content: prompt.context },
          {
            role: "user",
            content: `${prompt.instruction}\n\n${prompt.fileContent}`,
          },
        ],
        temperature: 0.2,
        max_tokens: 256,
      }),
    });

    const data = await response.json();

    return {
      text: data.choices[0].message.content,
    };
  },
});

export async function POST(req: NextRequest) {
  const body: CompletionRequestBody = await req.json();
  const completion = await copilot.complete({
    body,
  });

  return NextResponse.json(completion, { status: 200 });
}
