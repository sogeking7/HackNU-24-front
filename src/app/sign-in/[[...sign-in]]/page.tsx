import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-screen bg-[#121212] flex justify-center items-center">
      <SignIn />
    </div>
  );
}
