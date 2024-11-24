import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Linkedin, Github, Twitter } from "lucide-react"; // Adjust imports if needed
import { CalendarDays } from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SocialLinks = () => {
  const profilePicUrl = import.meta.env.VITE_PROFILE_PIC_URL;
  return (
    <div className="flex gap-4 mb-8">
      {/* LinkedIn HoverCard */}
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <Link to={import.meta.env.VITE_LINKEDIN_URL} target="_blank">
            <Button variant="ghost" size="icon">
              <Linkedin className="h-5 w-5" />
            </Button>
          </Link>
        </HoverCardTrigger>
        <HoverCardContent className="w-96">
          <div className="flex justify-between space-x-4">
            <Avatar>
              <AvatarImage src={profilePicUrl} />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">@{import.meta.env.VITE_LINKEDIN_HANDLE}</h4>
              <p className="text-sm">
                Software Engineer | OSS Contributor | Former Contractual Software Developer at Indian Navy HQWNC | BTech CSE Aiml @SPIT 26' | AI & DevOps Enthusiast | Striving to create the Best Developer Experience
              </p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>

      {/* GitHub HoverCard */}
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <Link to={import.meta.env.VITE_GITHUB_URL} target="_blank">
            <Button variant="ghost" size="icon">
              <Github className="h-5 w-5" />
            </Button>
          </Link>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="flex justify-between space-x-4">
            <Avatar>
              <AvatarImage src={profilePicUrl} />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">@{import.meta.env.VITE_GITHUB_HANDLE}</h4>
              <p className="text-sm">
                The endofunctor of a monoid is a subjective burrito.
              </p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>

      {/* Twitter HoverCard */}
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <Link to={import.meta.env.VITE_TWITTER_URL} target="_blank">
            <Button variant="ghost" size="icon">
              <Twitter className="h-5 w-5" />
            </Button>
          </Link>
        </HoverCardTrigger>
        <HoverCardContent>
          <div className="flex justify-between space-x-4">
            <Avatar>
              <AvatarImage src={profilePicUrl} />
              <AvatarFallback>VC</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">@{import.meta.env.VITE_TWITTER_HANDLE}</h4>
              <p className="text-sm">
                Ex-Indian Navy Software Developer 🚢 | CSE @bvbspit
                🎓 | Average Linux & Vim Enjoyer 🧑‍💻
              </p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
};

export default SocialLinks;
