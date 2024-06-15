import Link from "next/link"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Image from "next/image";
import Image1 from "@/assets/logo_black_no_bg.png";
import Image2 from "@/assets/logo_white_no_bg.png";
import { ModeToggle } from "@/components/ui/ModdleToggle";
import logout from "@/helpers/logout";
import { useTheme } from "next-themes";

export default function NavbarComponent() {
  const { theme } = useTheme();
  const imageSrc = theme === 'light' ? Image1 : Image2;
  return (
    <header className="flex h-16 w-full items-center justify-between px-4 md:px-6 border">
      <Link href="#" className="flex items-center gap-2" prefetch={false}>
      <Image
            src={imageSrc}
            width={300}
            height={400}
            alt="Picture of the author"
          />
      </Link>
      <nav className="hidden items-center gap-6 md:flex">
        <ModeToggle />
      <Button type="submit" onClick={logout}>
            Logout
          </Button>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden">
            <MenuIcon className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <div className="grid gap-4 p-4">
          <Button type="submit" onClick={logout}>
            Logout
          </Button>
            <div className="select-none">
Change Theme→ <span className="mt-10"><ModeToggle  /></span> 
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}