import type { Metadata } from "next";
import { PageRuntime } from "@/components/PageRuntime";
import { StaticPage } from "@/components/StaticPage";
import { v2Markup } from "@/content/v2";

export const metadata: Metadata = {
  title: "EscalaMED — A Rota do Crescimento | V2",
};

export default function V2Page() {
  return (
    <>
      <StaticPage markup={v2Markup} />
      <PageRuntime variant="v2" />
    </>
  );
}
