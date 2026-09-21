import { NextRequest, NextResponse } from 'next/server';
import { aiProvider } from '@/lib/ai/aiProvider';
import { platformStore } from '@/lib/data/platformDataStore';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const question = body.question || 'Explain compliance findings';
    const bidId = body.bid_id || 'BID-1024';
    const userRole = body.userRole || 'Procurement Officer';
    const bid = platformStore.getBidById(bidId);

    const result = await aiProvider.copilotChat({
      question,
      bidContext: bid || {},
      evidence: bid?.evidenceList || [],
      userRole,
    });

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Copilot inference failed' }, { status: 500 });
  }
}
