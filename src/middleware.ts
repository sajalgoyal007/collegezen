export { auth as middleware } from "@/lib/auth";

export const config = {
  matcher: ["/saved/:path*", "/profile/:path*"],
};
