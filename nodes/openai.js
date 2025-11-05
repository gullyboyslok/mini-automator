import OpenAI from "openai";
const client = new OpenAI();

export async function chatgpt_simple(text, model="gpt-5-nano") {
  const response = await client.responses.create({
    model: model,
    input: text
  });
  return response;
}

export async function chatgpt(text, role="user", model="gpt-5-nano") {
  const response = await client.responses.create({
      model: model,
      input: [
          {
              role: role,
              content: [
                  {
                      type: "input_text",
                      text: text,
                  }
              ],
          },
      ],
  });
  return response;
}

export async function chatgpt_image(text, imageUrl, role="user", model="gpt-5-nano") {
  const response = await client.responses.create({
      model: model,
      input: [
          {
              role: role,
              content: [
                  {
                      type: "input_text",
                      text: text,
                  },
                  {
                      type: "input_image",
                      image_url: imageUrl,
                  },
              ],
          },
      ],
  });
  return response;
}
