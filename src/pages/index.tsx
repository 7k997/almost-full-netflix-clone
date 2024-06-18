import HeroSection from '@/components/HeroSection';
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (session) {
      return {
          redirect: {
              destination: "/movies",
              permanent: false,
          },
          props: {},
      }
  }

  return {
      props: {},
  }
}

export default function Home() {
  return (
    <>
      <HeroSection />
    </>
  );
}
