import { Avatar } from "./ui";
import { Lucide } from "./icons";

export default () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Avatar src="/favicon.svg" alt="profile-picture" size="unset" classNames={{ root: "size-2/3" }}>
        <Lucide.IconImage className="size-full opacity-10" />
      </Avatar>
    </div>
  );
};
