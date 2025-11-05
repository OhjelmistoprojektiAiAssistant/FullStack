
export interface JobListDto {
    id: string;
    title: string;
    companyName: string;
    location: string;
    description: string;
    category: string;
    salaryRange: string | null;
    createdAt: string;
    redirectUrl: string;
}