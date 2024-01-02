"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Home = async () => {
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      router.push("/todos");
    };

    fetchData();
  }, [router]);

  return <div></div>;
};

export default Home;
