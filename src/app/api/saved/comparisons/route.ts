import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/saved/comparisons — get user's saved comparisons
 * POST /api/saved/comparisons — save a comparison { label, slugs }
 * DELETE /api/saved/comparisons — remove a comparison { id }
 */
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const comparisons = await prisma.savedComparison.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ comparisons });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { label, slugs } = await request.json();

  if (!slugs || !Array.isArray(slugs) || slugs.length < 2) {
    return NextResponse.json({ error: "Provide at least 2 college slugs" }, { status: 400 });
  }

  const comparison = await prisma.savedComparison.create({
    data: {
      label: label || slugs.map((s: string) => s.toUpperCase().replace(/-/g, " ")).join(" vs "),
      slugs,
      userId: session.user.id,
    },
  });

  return NextResponse.json({ comparison }, { status: 201 });
}

export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await request.json();
  if (!id) {
    return NextResponse.json({ error: "Missing comparison id" }, { status: 400 });
  }

  await prisma.savedComparison.deleteMany({
    where: { id, userId: session.user.id },
  });

  return NextResponse.json({ deleted: true });
}
