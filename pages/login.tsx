import { signIn, useSession, signOut } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div>
        <p>Well done, {session.user?.email}!</p>
        <button
          className="text-white bg-red-500 p-2 rounded"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </div>
    );
  } else {
    return (
      <div>
        <button
          className="text-white bg-blue-500 p-2 rounded"
          onClick={() => signIn("google")}
        >
          Sign In with Google
        </button>
      </div>
    );
  }
}
