import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const baseUrl = request.nextUrl.origin

    // First, add category background images
    console.log('Adding category background images...')
    const categoryResponse = await fetch(`${baseUrl}/api/add-category-images`, {
      method: 'POST',
    })
    const categoryResults = await categoryResponse.json()

    // Then, add post images
    console.log('Adding post images...')
    const postResponse = await fetch(`${baseUrl}/api/add-post-images`, {
      method: 'POST',
    })
    const postResults = await postResponse.json()

    return NextResponse.json({
      message: 'Successfully processed all images',
      categoryResults,
      postResults,
      summary: {
        categoriesProcessed: categoryResults.results?.length || 0,
        categoriesSuccess: categoryResults.successCount || 0,
        categoriesSkipped: categoryResults.skippedCount || 0,
        postsProcessed: postResults.results?.length || 0,
        postsSuccess: postResults.successCount || 0,
        totalErrors: (categoryResults.errorCount || 0) + (postResults.errorCount || 0)
      }
    })

  } catch (error) {
    console.error('Error processing images:', error)
    return NextResponse.json(
      { error: 'Failed to process images' },
      { status: 500 }
    )
  }
}
