import { PageRuntime } from "@/components/PageRuntime";
import { StaticPage } from "@/components/StaticPage";
import { classicMarkup } from "@/content/classic";

export default function HomePage() {
  return (
    <>
      <StaticPage markup={classicMarkup} />
      <PageRuntime variant="classic" />
    </>
  );
}
