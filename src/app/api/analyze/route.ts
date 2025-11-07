import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, Math.random() * 2000 + 1000));

  // Simulate a random confidence score
  const confidence = Math.random();

  return NextResponse.json({ confidence });
}
