// app/(protected)/layout.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "@/lib/session";

// Ensure this runs on each request (no static caching)
export const revalidate = 0;
export const dynamic = "force-dynamic";


export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();

  if (!session?.userId) {
    redirect("/auth/login");
  }

  return <>{children}</>;
}
