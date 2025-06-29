import { signIn, auth } from "@/auth";

export default async function SignIn() {
  const session = await auth();
  console.log("Session:", session);

  if (session?.user) {
    return (
      <div>
        <p>Signed in as {session.user.name}</p>
        <form
          action={async () => {
            "use server";
            const { signOut } = await import("@/auth");
            await signOut();
          }}
        >
          <button type="submit">Sign out</button>
        </form>
      </div>
    );
  }

  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <button type="submit">Sign in with Google</button>
    </form>
  );
}
