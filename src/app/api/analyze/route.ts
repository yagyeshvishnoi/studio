import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const image = formData.get('image');

    if (!image) {
      return NextResponse.json({ error: 'No image uploaded' }, { status: 400 });
    }
    
    // The client sends FormData, so we need to forward it.
    const analysisResponse = await fetch('https://db79a31dc48d.ngrok-free.app/predict', {
      method: 'POST',
      body: formData,
    });

    if (!analysisResponse.ok) {
      // If the external API fails, we'll log the error and use a default.
      console.error("Analysis API failed with status:", analysisResponse.status);
      const errorText = await analysisResponse.text();
      console.error("Analysis API response:", errorText);
      return NextResponse.json({ confidence: 0.5 });
    }

    const result = await analysisResponse.json();
    
    // The new API returns { filename: '...', confidence: 0.1234 }
    return NextResponse.json({ confidence: result.confidence ?? 0.5 });

  } catch (error) {
    console.error("Error in analyze endpoint:", error);
    // On any other errors, use a default confidence.
    return NextResponse.json({ confidence: 0.5 }, { status: 500 });
  }
}
