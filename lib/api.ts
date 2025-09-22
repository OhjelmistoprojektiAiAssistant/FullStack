// one error shape everything can use
export async function postJSON<T>(url: string, data: unknown): Promise<T> {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) {
    console.error("Error response:", json); // log the error for debugging
    throw json
  };
  return json;
}
