import { getRouteSession } from "@/lib/session";
import { NextResponse } from "next/server";
import { title } from "process";

const url = process.env.ADZUNA_APP_URL!;
const app_id = process.env.ADZUNA_APP_ID!;
const app_key = process.env.ADZUNA_APP_KEY!;

/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: Search for job listings
 *     description: Search for job listings using Adzuna API integration
 *     tags: [Jobs]
 *     security:
 *       - sessionAuth: []
 *     parameters:
 *       - in: query
 *         name: what
 *         schema:
 *           type: string
 *         description: Job title or keywords to search for
 *         example: "software engineer"
 *       - in: query
 *         name: where
 *         schema:
 *           type: string
 *         description: Location to search in
 *         example: "New York, NY"
 *       - in: query
 *         name: results_per_page
 *         schema:
 *           type: string
 *         description: Number of results per page (default 20)
 *         example: "10"
 *       - in: query
 *         name: page
 *         schema:
 *           type: string
 *         description: Page number (default 1)
 *         example: "1"
 *       - in: query
 *         name: salary_min
 *         schema:
 *           type: string
 *         description: Minimum salary filter
 *         example: "50000"
 *       - in: query
 *         name: sort_by
 *         schema:
 *           type: string
 *         description: Sort results by (date, salary, relevance)
 *         example: "date"
 *       - in: query
 *         name: full_time
 *         schema:
 *           type: string
 *         description: Filter for full-time jobs only
 *         example: "1"
 *       - in: query
 *         name: permanent
 *         schema:
 *           type: string
 *         description: Filter for permanent positions only
 *         example: "1"
 *     responses:
 *       200:
 *         description: Job search results retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       company:
 *                         type: object
 *                       location:
 *                         type: object
 *                       salary_min:
 *                         type: number
 *                       salary_max:
 *                         type: number
 *                       description:
 *                         type: string
 *                 count:
 *                   type: integer
 *                   description: Total number of results
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
 *         description: Internal server error or API key issues
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
export async function GET(request: Request) {
    const res = NextResponse.next();
    const session = await getRouteSession(request, res);

    if (!session.userId) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    try {
        const reqUrl = new URL(request.url);
        const params = reqUrl.searchParams;

        // Build Adzuna query params
        const adzunaParams = new URLSearchParams();
        // defaults
        const resultsPerPage = params.get("results_per_page") || "20";
        adzunaParams.set("results_per_page", resultsPerPage);
        adzunaParams.set("app_id", app_id);
        adzunaParams.set("app_key", app_key);
        adzunaParams.set("content-type", "application/json");

        // map our query params to Adzuna's API
        const what = params.get("what") || params.get("title");
        if (what) adzunaParams.set("what", what);

        const where = params.get("where") || params.get("location");
        if (where) adzunaParams.set("where", where);

        const what_exclude = params.get("what_exclude");
        if (what_exclude) adzunaParams.set("what_exclude", what_exclude);

        const salary_min = params.get("salary_min");
        if (salary_min) adzunaParams.set("salary_min", salary_min);

        const sort_by = params.get("sort_by");
        if (sort_by) adzunaParams.set("sort_by", sort_by);

        const full_time = params.get("full_time");
        if (full_time) adzunaParams.set("full_time", full_time);

        const permanent = params.get("permanent");
        if (permanent) adzunaParams.set("permanent", permanent);

        // page default to 1
        const page = params.get("page") || "1";

        const adzunaUrl = `${url}/us/search/${encodeURIComponent(page)}?${adzunaParams.toString()}`;

        const response = await fetch(adzunaUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch jobs: ${response.statusText}`);
        }

        const adzunaData = await response.json();

        // map Adzuna data to JobListDto format
        const transformedData = (adzunaData.results || []).map((job: any) => ({
            id: String(job.id),
            title: job.title,
            companyName: job.company?.display_name || "",
            location: job.location?.display_name || "",
            category: job.category?.label || "",
            salaryRange: job.salary_min && job.salary_max ? `$${job.salary_min} - $${job.salary_max}` : (job.salary_min ? `$${job.salary_min}` : null),
            createdAt: job.created,
            redirectUrl: job.redirect_url,
            description: job.description || "",
        }));

        return NextResponse.json({ success: true, jobs: transformedData }, { status: 200 });

    } catch (error) {
        console.error("Error fetching jobs:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch jobs" }, { status: 500 });
    }
}