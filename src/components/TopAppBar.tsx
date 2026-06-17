import Link from "next/link";
import React from "react";

export default function TopAppBar({ title = "PROPOSAL.AI" }: { title?: string }) {
  return (
    <header className="flex justify-between items-center px-6 py-4 w-full sticky top-0 z-50 bg-surface border-b-4 border-primary brutal-shadow">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-primary p-2 brutal-button bg-primary-fixed">
          <span className="material-symbols-outlined text-3xl">menu</span>
        </button>
        <h1 className="text-3xl md:text-4xl font-headline font-black uppercase text-primary tracking-tighter">
          {title}
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 border-4 border-primary rounded-none overflow-hidden bg-secondary brutal-shadow-sm">
          <img
            alt="User profile avatar"
            className="w-full h-full object-cover grayscale mix-blend-multiply"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTgQezHneJIsxydH5PiRuAcN95pl7mMooWgG8qxkYwT01aiBzefTr1ZjBjsl2zAyeV3dEEo0ZRjSj5FBa1J_x54tLl1YAKzTgj4Ll_4iPIfSo17A0GLlXEUB70y5W6t0QvYNE8Pg8YygjaQRoLauOGzSq4cUiy9oBdxdh77ufsdyoAvrG69kvz_XIcBeiFzDKpoORW3MR_ps6Qa0ssbKzOkYlJKQOL6Lmz1HRuwAsvqfldeCkEHaHw7qv8Eu74Ht_wrV8Py6tKhz-q"
          />
        </div>
      </div>
    </header>
  );
}
