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
    language = "en",  // "fi" for Finnish, "en" for English
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
    case "minimal":
      lengthInstruction = `
Write a very short cover letter:
- 2–3 sentences total
- No greeting or sign-off
- Focus only on why you are a good fit for this role
- Explicitly mention at least one strength and one relevant experience
`.trim();
      break;

    case "short":
      lengthInstruction = `
Write a short cover letter:
- 3–4 sentences OR 1 short paragraph
- Direct, concise, and professional
- Explicitly use the candidate's strengths and at least one experience example
- If relevant, briefly reference education in one sentence
`.trim();
      break;

    case "standard":
      lengthInstruction = `
Write a standard-length cover letter:
- 2–3 short paragraphs
- Around 150–200 words
- Clearly connect strengths, experience, and education to the job requirements
- Keep the flow smooth and easy to read
`.trim();
      break;

    case "elaborate":
      lengthInstruction = `
Write an elaborate, persuasive cover letter:
- 3–4 well-developed paragraphs
- Around 250–350 words
- Highlight concrete achievements, strengths, and relevant experience
- Integrate education where it supports credibility for the role
`.trim();
      break;

    default:
      lengthInstruction = `
Write a standard-length cover letter with 2–3 short paragraphs (~150–200 words), clearly linking strengths, experience, and education to the role.
`.trim();
  }

  // Tone-based instructions
 let toneInstruction = "";

 switch (tone) {
   case "startup":
     toneInstruction = `
Use a modern, startup-friendly tone:
- Casual but professional
- Energetic, proactive wording
- Avoid corporate clichés
- Prefer simple, clear sentences
`.trim();
     break;

   case "executive":
     toneInstruction = `
Use an executive-level tone:
- Polished, confident, and strategic
- Focus on leadership, ownership, and impact
- Avoid overly casual language
`.trim();
     break;

   case "creative":
     toneInstruction = `
Use a creative, personality-driven tone:
- Expressive and warm
- Small touches of storytelling are allowed
- Maintain clarity and professionalism
`.trim();
     break;

   case "technical":
     toneInstruction = `
Use a technical tone:
- Emphasize hard skills, tools, and measurable results
- Use clear, precise language
- Mention concrete projects and technologies when relevant
`.trim();
     break;

   case "funny":
     toneInstruction = `
Use a lightly humorous tone:
- 1–2 short paragraphs max
- Keep humor subtle, friendly, and professional
- No sarcasm or risky jokes
`.trim();
     break;

   case "professional":
   default:
     toneInstruction = `
Use a clean, professional tone:
- Polite and confident
- Clear and concise wording
`.trim();
  }
  
  

  // structure intructions
  const structureInstruction = `
Structure the cover letter like this:

1) Hook:
   - 1–2 sentences
   - Connect yourself to the company or role (e.g. their mission, product, or requirements).

2) Middle:
   - 1–2 paragraphs
   - Link the candidate's strengths, experience, and education directly to the job description.
   - Include at least one concrete example from experience (project, responsibility, or result).

3) Closing:
   - 1 short sentence
   - Show motivation and invite next steps (e.g. interview)
   - Do NOT add a name or signature line; the app will handle that.
`.trim();

  
  const styleInstructions = [
    lengthInstruction,
    toneInstruction,
    structureInstruction,
  ]
    .filter(Boolean)
    .join("\n\n");

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
          text: `
You are an expert cover letter writer. Follow these rules:

- Use only the provided information.
- Do not invent employers, degrees, or skills.
- Explicitly use the candidate's strengths, experience, and education in the letter.
- Include at least one concrete example from their experience that connects to the job description.
- Keep paragraphs short (2–4 sentences).
- Respect tone, length, language, and structure requirements.
- Avoid clichés and generic statements.
${styleInstructions}
        `.trim(),
        },
      ],
    },

    {
      role: "system",
      content: [
        {
          type: "input_text",
          text: `
Your task is to generate the highest-quality personalized cover letter using user data and job description.
        `.trim(),
        },
      ],
    },

    {
      role: "user",
      content: [
        {
          type: "input_text",
          text: `
USER DATA (JSON):
${JSON.stringify({
  jobDescription,
  profile: {
    strengths: strengths || null,
    experience: experience || null,
    education: education || null,
  },
  options: { length, tone },
})}
        `.trim(),
        },
      ],
    },

    {
      role: "developer",
      content: [
        {
          type: "input_text",
          text: `
You MUST return ONLY valid JSON in the following exact structure:

{
  "coverLetter": "string",
  "subjectLine": "string",
  "keywordsUsed": ["string"],
  "notesForUser": {
    "personalizationHook": "string",
    "optionalPS": "string"
  },
  "meta": {
    "language": "string",
    "targetRole": "string",
    "approxWordCount": number
  }
}

Do NOT write anything outside the JSON.
Do NOT include markdown.
Do NOT explain your reasoning.
Return ONLY the JSON object.
        `.trim(),
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

  const raw = response.output_text ?? "";

  let data: any;

  try {
    data = JSON.parse(raw);
  } catch (err) {
    const approxWordCount = raw.split(/\s+/).filter(Boolean).length;
    data = {
      coverLetter: raw,
      subjectLine: "",
      keywordsUsed: [],
      notesForUser: {
        personalizationHook: "",
        optionalPS: "",
      },
      meta: {
        language: "unknown",
        targetRole: "",
        approxWordCount,
      },
    };
  }
  
  // save the draft to the local storage 

  console.log("AI request options:", { length, tone, language });
  return NextResponse.json({ success: true, ...data });
}