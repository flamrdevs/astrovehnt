import { cn } from "./ui/utils.ts";
import { Lucide } from "./icons";

const projects = [
  {
    title: "astrolinkt",
    description: "Astro template",
    icon: Lucide.IconImage,
    url: "https://github.com/flamrdevs/astrolinkt",
  },
  {
    title: "astrovehnt",
    description: "Astro template",
    icon: Lucide.IconImage,
    url: "https://github.com/flamrdevs/astrovehnt",
  },
  {
    title: "astrobuckt",
    description: "Astro template",
    icon: Lucide.IconImage,
    url: "https://github.com/flamrdevs/astrobuckt",
  },
];

export default () => {
  return (
    <div className="flex items-center justify-center p-4 md:p-5 xl:p-6 w-full h-full">
      <ul className="grid grid-cols-1 gap-3 w-full h-full">
        {projects.map((project) => {
          return (
            <li key={project.title} className="flex items-center">
              <a
                href={project.url}
                className={cn(
                  "group",
                  "flex items-center justify-between px-4 py-3 w-full",
                  "bg-neutral-2 hover:bg-neutral-3",
                  "outline-none border border-neutral-4 hover:border-neutral-6 rounded-3xl",
                  "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-neutral-7 focus-visible:ring-offset-neutral-1"
                )}
                target="_blank"
                aria-label="Open"
              >
                <div className="flex flex-row items-stretch gap-5 pl-2">
                  <div className="flex items-center justify-center">
                    <project.icon
                      size={24}
                      className="transition duration-300 group-hover:-translate-y-1 text-neutral-10 group-hover:text-neutral-11"
                    />
                  </div>

                  <div>
                    <h3 className="transition duration-300 group-hover:translate-x-1 text-neutral-12 text-sm">{project.title}</h3>
                    <div className="transition duration-300 group-hover:translate-x-px text-neutral-10 group-hover:text-neutral-11 text-xs">
                      {project.description}
                    </div>
                  </div>
                </div>
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
