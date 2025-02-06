"use client"; // <-- Add this at the top

import Image from "next/image";

export default function Slide() {
  return (
    <div className="flex justify-center"> {/* Background with increased opacity */}
      <div className="overflow-hidden w-[50%] flex justify-center   bg-[rgb(151,150,148)] bg-opacity-10"> {/* This centers the content */}
        <div className="flex animate-slideRight w-full gap-4"> {/* Flex container for images */}
          <div className="flex-none w-20 h-20 relative opacity-40">
            <Image src="/file.svg" alt="file" layout="fill" objectFit="cover" />
          </div>
          <div className="flex-none w-20 h-20 relative opacity-0">
            <Image src="/java.png" alt="java" layout="fill" objectFit="cover" />
          </div>
          <div className="flex-none w-20 h-20 relative opacity-40">
            <Image src="/vercel.svg" alt="vercel" layout="fill" objectFit="cover" />
          </div>
          <div className="flex-none w-20 h-20 relative opacity-40">
            <Image src="/c-sharp.png" alt="c-sharp" layout="fill" objectFit="cover" />
          </div>
          <div className="flex-none w-20 h-20 relative opacity-40">
            <Image src="/generative.png" alt="generative" layout="fill" objectFit="cover" />
          </div>
          <div className="flex-none w-20 h-20 relative opacity-40">
            <Image src="/java-script.png" alt="java-script" layout="fill" objectFit="cover" />
          </div>
          <div className="flex-none w-20 h-20 relative opacity-40">
            <Image src="/php.png" alt="php" layout="fill" objectFit="cover" />
          </div>
          <div className="flex-none w-20 h-20 relative opacity-40">
            <Image src="/window.svg" alt="window" layout="fill" objectFit="cover" />
          </div>
          <div className="flex-none w-20 h-20 relative opacity-40">
            <Image src="/django.png" alt="django" layout="fill" objectFit="cover" />
          </div>
          <div className="flex-none w-20 h-20 relative opacity-40">
            <Image src="/globe.svg" alt="globe" layout="fill" objectFit="cover" />
          </div>
          <div className="flex-none w-20 h-20 relative opacity-40">
            <Image src="/python.png" alt="python" layout="fill" objectFit="cover" />
          </div>
          <div className="flex-none w-20 h-20 relative opacity-40">
            <Image src="/files.png" alt="files" layout="fill" objectFit="cover" />
          </div>
          <div className="flex-none w-20 h-20 relative opacity-40">
            <Image src="/html-5.png" alt="html-5" layout="fill" objectFit="cover" />
          </div>
        </div>
      </div>
    </div>
  );
}
