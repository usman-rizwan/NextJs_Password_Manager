"use client"
import { ModeToggle } from "@/components/ui/ModdleToggle";
import { Button } from "@/components/ui/button";
import React from "react";
import Image from 'next/image'
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link} from "@nextui-org/react";
import Image1 from  '@/assets/logo_black_no_bg.png';
import logout from "@/helpers/logout";


export default function NavbarComponent() {

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isBordered>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>

        <Image
      src={Image1}
      width={400}
      height={500}
      alt="Picture of the author"
    />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
        <Button type="submit" onClick={logout}>
              Logout
            </Button>
        </NavbarItem>
        <NavbarItem>
         <ModeToggle/>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
          <NavbarMenuItem key="Logout">
          <Button type="submit" className="mt-4" onClick={logout}>
              Logout
            </Button>
          </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}
