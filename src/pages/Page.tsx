import { ArrowDownRight, Bot, Download, Github, Linkedin, Mail, Twitter } from 'lucide-react'
import { Link } from 'react-router-dom';
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import MapComponent from '@/Map';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@radix-ui/react-tooltip';
import SocialLinks from '@/ui/socials';

export default function Page() {
  const [chatOpen, setChatOpen] = useState(true)
  const [copied, setCopied] = useState(false);
  const email = import.meta.env.VITE_EMAIL;

  const isDark = true;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset the tooltip message after 2 seconds
    } catch (err) {
      console.error("Failed to copy email: ", err);
    }
  };


  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen lg:px-96 bg-background text-foreground">
        {/* Navigation */}
        <nav className="flex items-center justify-between p-4 border-b">
          <Link to={import.meta.env.VITE_APP_URL} className="text-xl font-bold">
            {import.meta.env.VITE_APP_NAME}
          </Link>
          <div className="flex items-center gap-8">
            <Link to="/" className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100">
              home
            </Link>
            <Link to="/projects" className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100">
              projects
            </Link>
            <Link to="/blog" className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100">
              blog
            </Link>
            <Link to="/contact" className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100">
              contact
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setChatOpen(!chatOpen)}>
              <Bot className="h-5 w-5" />
            </Button>

          </div>
        </nav>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="relative w-full">
            <div className="relative w-full h-[240px]">
              <MapComponent height="240px" />
              <div
                className="absolute inset-0 bg-gradient-to-t from-background/90  via-background/50 to-background/30 z-[1]"
                aria-hidden="true"
              />
            </div>
            <h1 className="text-4xl relative bottom-10 left-4 text-zinc-200 z-10">
              Hello,<br /> I'm Naufil <span className="wave">👋</span>
            </h1>
          </div>
          <p className="text-lg mb-2">
            20-year-old software developer from Mumbai, India
          </p>
          <p className="text-muted-foreground mb-6">
            Full-stack dev, rocking Arch Linux and vibin' with my custom Neovim setup.
          </p>
          <Button variant="outline" className="mb-8" onClick={() => setChatOpen(!chatOpen)}>
            Ask the chatbot anything about me <ArrowDownRight className="ml-2 h-4 w-4" />
          </Button>

          {/* Resume Section */}
          <div className="flex gap-4 mb-8">
            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button variant="outline">
                    Resume <Download className="ml-2 h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="bg-zinc-700 rounded p-1 px-2 mb-1 text-sm">Not yet!</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <SocialLinks />

            <TooltipProvider>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={copyToClipboard}>
                    <Mail className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="bg-zinc-700 rounded p-1 px-2 mb-1 text-sm text-sm">{copied ? "Email copied!" : "Click to copy email"}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Work & Education Tabs */}
          <Tabs defaultValue="work" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="work">Work</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
            </TabsList>
            <TabsContent value="work">
              <div className="space-y-6">
                <div className="flex gap-4 items-start border-l-2 border-gray-200 pl-4 ml-2 pt-4">
                  <img
                    src="indian-navy-logo.png"
                    alt="Indian Navy Logo"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <div className="text-sm text-gray-500">Jan 2023 - Jun 2023</div>
                    <h3 className="text-lg font-semibold">Indian Navy | General Technologies Pvt. Ltd.</h3>
                    <div className="text-gray-600">Jr. Software Engieer</div>
                    <ul className="list-disc ml-4 mt-2 text-sm space-y-2">
                      <li>
                        Customized and enhanced open-source software solutions to meet the specific needs of the Indian Navy, while implementing robust cybersecurity measures to protect web applications and critical systems.
                      </li>
                      <li>
                        Led initiatives to improve developer productivity, created comprehensive documentation and troubleshooting manuals, and contributed to R&amp;D efforts aimed at optimizing software for mission-critical Navy functions.
                      </li>
                    </ul>
                  </div>
                </div>

              </div>
            </TabsContent>
            <TabsContent value="education">
              <div className="space-y-6">
                <div className="flex gap-4 items-start border-l-2 border-gray-200 pl-4 ml-2 pt-4">
                  <img
                    src="spit-logo.png"
                    alt="University Logo"
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <div className="text-sm text-gray-500">2023 - 2026</div>
                    <h3 className="text-lg font-semibold">Sardar Patel Institute of Technology</h3>
                    <div className="text-gray-600">Bachelor of Engineering in Computer Science Engineering</div>
                    <ul className="list-disc ml-4 mt-2 text-sm space-y-2">
                      {
                        // <li>Graduated with First Class Honours</li>
                      }
                      <li>Specialization in Artificial Intelligence with CGPA of {import.meta.env.VITE_GPA}</li>
                      <li>Relevant coursework: Data Structures &amp; Algorithms, Operating System, Computer Network, Database Systems</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Chatbot */}
          {chatOpen && (
            <Card className="fixed bottom-20 right-4 w-80">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-2 w-2 bg-green-500 rounded-full" />
                  <h3 className="font-semibold">Nauf Support</h3>
                </div>
                <div className="text-center my-8">
                  <Bot className="mx-auto h-12 w-12 mb-4" />
                  <p className="text-sm text-gray-600">Send a message to start the chat!</p>
                  <p className="text-xs text-gray-500 mt-2">
                    You can ask the bot anything about me and it will help to find the relevant information!
                  </p>
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Ask something..." />
                  <Button variant="secondary" size="icon">
                    <Mail className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  )
}
