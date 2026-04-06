'use client';
import type { FC } from 'react';
import { LuCookie } from 'react-icons/lu';
import { TbSoupFilled } from 'react-icons/tb';
import { BiSolidBowlRice } from 'react-icons/bi';

const Hero: FC = () => {
  return (
    <section className="relative w-full bg-slate-50 overflow-hidden pt-48 pb-32">
      <div className="container relative mx-auto px-4 flex flex-col items-center text-center">
        <div className="flex gap-6 mb-6">
          <div className="text-[#F25C54] text-3xl transition-transform hover:scale-110 duration-300">
            <TbSoupFilled />
          </div>
          <div className="text-[#F25C54] text-3xl transition-transform hover:scale-110 duration-300">
            <BiSolidBowlRice />
          </div>
          <div className="text-[#F25C54] text-3xl transition-transform hover:scale-110 duration-300">
            <LuCookie />
          </div>
        </div>

        <p className="text-[#5C6E8C] text-sm mb-4 font-medium">mealapp API website</p>

        <h1 className="text-4xl md:text-5xl font-extrabold text-[#2D3E50] max-w-2xl">
          See All The Delicious Foods
        </h1>
      </div>
    </section>
  );
};

export default Hero;
