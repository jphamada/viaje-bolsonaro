import { Scrollytelling } from "@/components/Scrollytelling";
import { STORY_STEPS } from "@/data/storySteps";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Scrollytelling steps={STORY_STEPS} />
    </main>
  );
}
