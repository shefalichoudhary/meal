import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import HomePage from "./home";

export default function Index() {
  const { status } = useSession<any>();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <HomePage />
    </div>
  );
}
