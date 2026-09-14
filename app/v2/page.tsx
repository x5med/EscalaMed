import { permanentRedirect } from "next/navigation";

export default function LegacyV2Page() {
  permanentRedirect("/");
}
