"use client";

import dynamic from "next/dynamic";

const Navigation = dynamic(() => import("./index"), {
  ssr: false,
});

export default function LazyNavigation() {
  return <Navigation />;
}



