"use server";
import { OpenAI } from "openai";
import { NextResponse } from "next/server";
import { getRouteSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * @swagger
 * /api/newApplication:
 *   post:
 *     summary: Generate AI-powered job application
 *     description: Generate a personalized job application using OpenAI based on user profile and job description
 *     tags: [AI Applications]
 *     security:
 *       - sessionAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - jobDescription
 *             properties:
 *               jobDescription:
 *                 type: string
 *                 description: The job posting description to generate application for
 *                 example: "We are looking for a Senior Software Engineer with 5+ years of experience in React and Node.js..."
 *               length:
 *                 type: string
 *                 enum: [short, medium, long]
 *                 description: Desired length of the generated application
 *                 default: short
 *                 example: "medium"
 *               tone:
 *                 type: string
 *                 enum: [professional, friendly, enthusiastic]
 *                 description: Tone of voice for the application
 *                 default: professional
 *                 example: "enthusiastic"
 *     responses:
 *       200:
 *         description: Application generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 generatedText:
 *                   type: string
 *                   description: The AI-generated job application text
 *                 draft:
 *                   $ref: '#/components/schemas/Draft'
 *       400:
 *         description: Bad request - job description is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                       example: "JOB_DESCRIPTION_REQUIRED"
 *                     message:
 *                       type: string
 *                       example: "Job description is required"
 *       401:
 *         description: Unauthorized - user not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 authenticated:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Internal server error or OpenAI API issues
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: object
 *                   properties:
 *                     code:
 *                       type: string
 *                       examples:
 *                         openai_key_missing:
 *                           value: "OPENAI_KEY_NOT_SET"
 *                         openai_error:
 *                           value: "OPENAI_API_ERROR"
 */
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