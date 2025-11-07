import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 2000);
  let confidence = 0.5; // Default confidence

  try {
    const response = await fetch('https://690d91eea6d92d83e8520ed0.mockapi.io/confidence', {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      // The mock API returns an array with one object: [{ "confidence": "0.78", "id": "1" }]
      if (Array.isArray(data) && data.length > 0 && data[0].confidence) {
        confidence = parseFloat(data[0].confidence);
      }
    }
  } catch (error: any) {
    if (error.name !== 'AbortError') {
      console.error("Error fetching confidence:", error);
    }
    // On timeout (AbortError) or other fetch errors, the default confidence of 0.5 will be used.
  } finally {
    clearTimeout(timeoutId);
  }

  return NextResponse.json({ confidence });
}
