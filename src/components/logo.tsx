import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="w-[60px] text-2xl font-bold uppercase">
      <Image alt="logo" width={50} height={50} src='/logo.jpg'/>
    </Link>
  );
};
