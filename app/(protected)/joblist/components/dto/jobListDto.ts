
export interface JobListDto {
    id: string;
    title: string;
    companyName: string;
    location: string;
    category: string;
    salaryRange: string | null;
    createdAt: string;
    redirectUrl: string;
}