import parse from "html-react-parser";

type StaticPageProps = {
  markup: string;
};

export function StaticPage({ markup }: StaticPageProps) {
  return <>{parse(markup)}</>;
}
