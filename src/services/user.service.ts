import { prisma } from "@/lib/prisma";

/**
 * Save a college to user's list.
 */
export async function saveCollege(userId: string, collegeId: string) {
  return prisma.savedCollege.upsert({
    where: { userId_collegeId: { userId, collegeId } },
    create: { userId, collegeId },
    update: {},
  });
}

/**
 * Remove a college from user's saved list.
 */
export async function unsaveCollege(userId: string, collegeId: string) {
  return prisma.savedCollege.deleteMany({
    where: { userId, collegeId },
  });
}

/**
 * Get all saved colleges for a user.
 */
export async function getSavedColleges(userId: string) {
  return prisma.savedCollege.findMany({
    where: { userId },
    include: { college: true },
    orderBy: { savedAt: "desc" },
  });
}
