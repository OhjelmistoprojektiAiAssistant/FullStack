"use server";
import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import { getRouteSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";



const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
  // return error if openAI key is not set
  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { success: false, error: { code: "OPENAI_KEY_NOT_SET" } },
      { status: 500 }
    );
  }
  const res = NextResponse.next();
  const session = await getRouteSession(request, res);

  if (!session.userId) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }

  const {
    jobDescription,
    length = "short",
    tone = "professional",
  } = await request.json();

    // fetch user's strengths from Profile
    const profile = await prisma.profile.findUnique({
        where: { userId: session.userId },
        select: {
            strengths: true,
            experience: true,
            education: true,
            // skills: true,
        }
    })
    const strengths = profile?.strengths;
    const experience = profile?.experience;
    const education = profile?.education;

  if (!jobDescription) {
    return NextResponse.json(
      { error: "Job description is required" },
      { status: 400 }
    );
  }

  // INSTRUCTIONS START
  let lengthInstruction = "";
  switch (length) {
    case "short":
      lengthInstruction =
        "Keep the cover letter concise and punchy. Just 3-4 sentences. Skip fluff and be direct.";
      break;
    case "minimal":
      lengthInstruction =
        "Write a minimalist, efficient letter with 2-3 sentences and no filler.";
      break;
    case "elaborate":
      lengthInstruction =
        "Write a detailed, persuasive letter emphasizing accomplishments and strengths and relevant experience.";
      break;
    case "standard":
    default:
      lengthInstruction =
        "Write professional and well-crafted cover letter tailored to the job description and personal strengths.";
      break;
  }

  // Tone-based instructions
  let toneInstruction = "";
  switch (tone) {
    case "startup":
      toneInstruction =
        "Write a startup-oriented cover letter, at most 2–3 tight paragraphs. Use tech-savvy, Silicon Valley startup lingo. No address or placeholders at the top.";
      break;
    case "executive":
      toneInstruction =
        "Craft a polished, executive-leadership-oriented letter tailored for senior-level positions.";
      break;
    case "creative":
      toneInstruction =
        "Write a creative, personality-driven letter appropriate for design or media jobs.";
      break;
    case "technical":
      toneInstruction =
        "Write a technically focused letter highlighting hard skills, projects, and tools.";
      break;
    case "funny":
      toneInstruction =
        "Write a funny cover letter. 1–2 paragraphs at most. No address or placeholders at the top.";
      break;
    case "professional":
    default:
      break;
  }

  const styleInstructions = `${lengthInstruction} ${toneInstruction}`.trim();

  // derive the arg type from SDK
  type CreateArgs = Parameters<typeof openai.responses.create>[0];
  type InputType = Exclude<CreateArgs["input"], string>;

  // block structured input
  const inputText: InputType = [
    {
      role: "developer",
      content: [
        {
          type: "input_text",
          text: `You are an expert cover letter writer. ${styleInstructions}\nReturn only the final cover letter text.`,
        },
      ],
    },
    {
      role: "user",
      content: [
        {
          type: "input_text",
          text: `Job Description:\n\n${jobDescription}`,
        },
      ],
    },
  ];

  // Add strengths if provided
  if (strengths) {
    inputText.push({
      role: "user",
      content: [
        {
          type: "input_text",
          text: `Use these personal Strengths to tailor the cover letter:\n\n${strengths}`,
        },
      ],
    });
  }
  // Add education if provided
  if (education) {
    inputText.push({
      role: "user",
      content: [
        {
          type: "input_text",
          text: `Use this personal Education to tailor the cover letter:\n\n${education}`,
        },
      ],
    });
  }
  // Add experience if provided
  if (experience) {
    inputText.push({
      role: "user",
      content: [
        {
          type: "input_text",
          text: `Use these personal Experiences to tailor the cover letter:\n\n${experience}`,
        },
      ],
    });
  }

  const response = await openai.responses.create({
    model: "gpt-4o",
    instructions:
      "Generate a job application cover letter based on the provided job description and personal strengths. The cover letter should be of the specified length and tone.",
    input: inputText,
    temperature: 0.7, // Adjust temperature for creativity
  });

  const text = response.output_text ?? "";
  return NextResponse.json({ success: true, coverLetter: text });
}