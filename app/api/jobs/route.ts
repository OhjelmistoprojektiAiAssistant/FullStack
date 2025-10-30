import { getRouteSession } from "@/lib/session";
import { NextResponse } from "next/server";
import { title } from "process";

const url = process.env.ADZUNA_APP_URL!;
const app_id = process.env.ADZUNA_APP_ID!;
const app_key = process.env.ADZUNA_APP_KEY!;

export async function GET(request: Request) {
    const res = NextResponse.next();
    const session = await getRouteSession(request, res);

    if (!session.userId) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    try {
        const response = await fetch(`${url}/us/search/5?app_id=${app_id}&app_key=${app_key}&title_only=software%20developer`);
       
        if (!response.ok) {
            throw new Error(`Failed to fetch jobs: ${response.statusText}`);
        }

        const adzunaData = await response.json();

        // map Adzuna data to JobListDto format
        const transformedData = adzunaData.results.map((job: any) => ({
            id: job.id,
            title: job.title,
            companyName: job.company.display_name,
            location: job.location.display_name,
            category: job.category.label,
            salaryRange: job.salary_min && job.salary_max ? `$${job.salary_min} - $${job.salary_max}` : null,
            createdAt: job.created,
            redirectUrl: job.redirect_url
        })) || [];

        return NextResponse.json({ success: true, jobs: transformedData }, { status: 200 });

    } catch (error) {
        console.error("Error fetching jobs:", error);
        return NextResponse.json({ success: false, error: "Failed to fetch jobs" }, { status: 500 });
    }
}