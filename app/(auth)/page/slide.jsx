"use client"; // <-- Add this at the top

import Image from "next/image";

export default function Slide() {
  return (
    <div className="flex justify-center">
      <div className="overflow-hidden w-full sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] flex justify-center bg-[rgb(151,150,148)] bg-opacity-10">
        {/* Flex container for images */}
        <div className="flex animate-slideRight w-full gap-4 sm:gap-6 md:gap-8">
          <div className="flex-none w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 relative opacity-40">
            <Image src="/file.svg" alt="file" layout="fill" objectFit="cover" />
          </div>
          <div className="flex-none w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 relative opacity-0">
            <Image src="/java.png" alt="java" layout="fill" objectFit="cover" />
          </div>
          <div className="flex-none w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 relative opacity-40">
            <Image src="/vercel.svg" alt="vercel" layout="fill" objectFit="cover" />
          </div>
          <div className="flex-none w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 relative opacity-40">
            <Image src="/c-sharp.png" alt="c-sharp" layout="fill" objectFit="cover" />
          </div>
          <div className="flex-none w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 relative opacity-40">
            <Image src="/generative.png" alt="generative" layout="fill" objectFit="cover" />
          </div>
          <div className="flex-none w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 relative opacity-40">
            <Image src="/java-script.png" alt="java-script" layout="fill" objectFit="cover" />
          </div>
          <div className="flex-none w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 relative opacity-40">
            <Image src="/php.png" alt="php" layout="fill" objectFit="cover" />
          </div>
          <div className="flex-none w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 relative opacity-40">
            <Image src="/window.svg" alt="window" layout="fill" objectFit="cover" />
          </div>
          <div className="flex-none w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 relative opacity-40">
            <Image src="/django.png" alt="django" layout="fill" objectFit="cover" />
          </div>
          <div className="flex-none w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 relative opacity-40">
            <Image src="/globe.svg" alt="globe" layout="fill" objectFit="cover" />
          </div>
          <div className="flex-none w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 relative opacity-40">
            <Image src="/python.png" alt="python" layout="fill" objectFit="cover" />
          </div>
          <div className="flex-none w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 relative opacity-40">
            <Image src="/files.png" alt="files" layout="fill" objectFit="cover" />
          </div>
          <div className="flex-none w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 relative opacity-40">
            <Image src="/html-5.png" alt="html-5" layout="fill" objectFit="cover" />
          </div>
        </div>
      </div>

      {/* Add this CSS for sliding animation */}
      <style jsx>{`
        .animate-slideRight {
          display: flex;
          animation: slideRight 15s linear infinite;
        }

        @keyframes slideRight {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
}
