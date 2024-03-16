import { signIn, useSession } from "next-auth/react";

const Login = () => {
  const { data: session } = useSession();
  if (session) {
    return (
      <div>
        well done
        {session.user?.email}
      </div>
    );
  } else {
    return (
      <>
        <div>
          <button className="text-white" onClick={() => signIn()}>
            SignIN
          </button>
        </div>
      </>
    );
  }
};
export default Login;
