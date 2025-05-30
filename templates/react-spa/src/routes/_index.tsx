import { Button } from "@esmate/shadcn/ui/button";
import logo from "@src/assets/react.svg";

export default function Page() {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="absolute inset-x-0 top-0 flex h-full w-full items-center justify-center opacity-100">
        <img
          alt="background"
          src="https://shadcnblocks.com/images/block/patterns/square-alt-grid.svg"
          className="[mask-image:radial-gradient(75%_75%_at_center,white,transparent)] opacity-90"
        />
      </div>
      <div className="relative z-10 container">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="rounded-xl bg-background/30 p-4 shadow-sm backdrop-blur-sm">
              <img src={logo} alt="logo" className="h-16" />
            </div>
            <div>
              <h1 className="mb-6 text-2xl font-bold tracking-tight text-pretty lg:text-5xl">ESMate</h1>
              <p className="mx-auto max-w-3xl text-muted-foreground lg:text-xl">
                Uncomplicate React Single Application Development
              </p>
            </div>
            <div className="mt-1 flex justify-center gap-3">
              <a href="https://github.com/viendinhcom/esmate" target="__blank">
                <Button className="shadow-sm transition-shadow hover:shadow">Learn More</Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
