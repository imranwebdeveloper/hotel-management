import { notFound } from "next/navigation";

interface FetchOptions {
  method?: string;
  headers?: RequestInit["headers"];
  body?: Record<string, unknown>;
}

const getData = async <T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${endpoint}`, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
    if (!res.ok) {
      notFound();
    }

    const data: T = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null as T;
  }
};

export default getData;
