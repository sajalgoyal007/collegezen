import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * GET /api/saved — get user's saved colleges
 * POST /api/saved — save a college { collegeId }
 * DELETE /api/saved — unsave a college { collegeId }
 */
export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const saved = await prisma.savedCollege.findMany({
    where: { userId: session.user.id },
    include: { college: true },
    orderBy: { savedAt: "desc" },
  });

  return NextResponse.json({ colleges: saved.map((s) => s.college) });
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { collegeId } = await request.json();
  if (!collegeId) {
    return NextResponse.json({ error: "Missing collegeId" }, { status: 400 });
  }

  await prisma.savedCollege.upsert({
    where: { userId_collegeId: { userId: session.user.id, collegeId } },
    create: { userId: session.user.id, collegeId },
    update: {},
  });

  return NextResponse.json({ saved: true });
}

export async function DELETE(request: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { collegeId } = await request.json();
  if (!collegeId) {
    return NextResponse.json({ error: "Missing collegeId" }, { status: 400 });
  }

  await prisma.savedCollege.deleteMany({
    where: { userId: session.user.id, collegeId },
  });

  return NextResponse.json({ saved: false });
}
