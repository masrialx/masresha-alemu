"use client";

import Image from "next/image";

const TECH_ICONS = [
  "/python.png",
  "/java-script.png",
  "/django.png",
  "/generative.png",
  "/vercel.svg",
  "/java.png",
  "/html-5.png",
  "/c-sharp.png",
  "/php.png",
  "/globe.svg",
  "/file.svg",
  "/files.png",
];

function IconRow({ prefix = "" }) {
  return (
    <>
      {TECH_ICONS.map((src) => (
        <div
          key={`${prefix}${src}`}
          className="relative mx-4 h-12 w-12 shrink-0 opacity-60 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 sm:h-14 sm:w-14"
        >
          <Image src={src} alt="" fill className="object-contain" />
        </div>
      ))}
    </>
  );
}

export default function Slide() {
  return (
    <section className="overflow-hidden border-y border-slate-200 bg-white py-6">
      <p className="mb-4 text-center text-xs font-medium uppercase tracking-widest text-slate-400">
        Technologies I work with
      </p>
      <div className="marquee-mask relative">
        <div className="flex w-max animate-marquee">
          <IconRow prefix="a-" />
          <IconRow prefix="b-" />
        </div>
      </div>
    </section>
  );
}
