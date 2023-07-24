"use client";

import Link from "next/link";

import LogoutButton from "../../components/auth/LogoutButton";
import withAuth from "../../components/hoc/withAuth";

export default withAuth(AuthTestPage, "protected");
function AuthTestPage() {
  return (
    <>
      <div>Auth Test Page</div>
      <LogoutButton />
      <Link href="/login">Login</Link>
    </>
  );
}
