import React from 'react'
import Link from "next/link"
import { cn } from "@/lib/utils"

const Logo = ({className}:{className?:string})=> {
    
  return (
  <Link href={"/"}>
    <h2 className={cn("text-2xl text-shop-red font-black tracking-wider uppercase hover:text-black hoverEffect group fontr-sans:",className)}>
        Leg<span className='text-black group-hover:text-shop-red hoverEffect'>o</span>
    </h2>
  </Link>
  );
};

export default Logo
