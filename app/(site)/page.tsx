import { PageRuntime } from "@/components/PageRuntime";
import { StaticPage } from "@/components/StaticPage";
import { v2Markup } from "@/content/v2";

export default function HomePage() {
  return (
    <>
      <StaticPage markup={v2Markup} />
      <PageRuntime variant="v2" />
    </>
  );
}
