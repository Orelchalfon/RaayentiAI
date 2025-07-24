import { SignIn } from "@clerk/nextjs";
export default function Page() {
  return (
    <main className='flex items-center justify-center max-h-dvh w-1/2 '>
      <SignIn oauthFlow='popup' />
    </main>
  );
}
