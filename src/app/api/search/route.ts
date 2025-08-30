import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    const country = searchParams.get('country') || 'us';

    if (!query) {
      return NextResponse.json(
        { error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    // Prepare form data for POST request
    const encodedParams = new URLSearchParams();
    encodedParams.append('query', query);
    encodedParams.append('country', country);

    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_RAPIDAPI_HOST}/shopping`,
      {
        method: 'POST',
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY!,
          'X-RapidAPI-Host': process.env.NEXT_PUBLIC_RAPIDAPI_HOST!,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: encodedParams
      }
    );

    if (!response.ok) {
      throw new Error(`API call failed: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Failed to search products' },
      { status: 500 }
    );
  }
}
