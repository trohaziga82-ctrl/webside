"use client";

import React from 'react';
import Link from 'next/link';

const categories = [
  { name: "Vsi izdelki", href: "/" },
  { name: "Star Wars", href: "/category/star-wars" },
  { name: "Technic", href: "/category/technic" },
  { name: "Icons", href: "/category/icons" },
  { name: "Architecture", href: "/category/architecture" },
  { name: "Akcije", href: "/sales", highlight: true },
];

const HeaderManu = () => {
  return (
    <nav className="bg-gray-50 border-b">
      <div className="max-w-7xl mx-auto px-4">
        <ul className="flex items-center gap-8 py-3 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <li key={cat.name} className="flex-shrink-0">
              <Link 
                href={cat.href}
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  cat.highlight ? "text-red-600 font-bold" : "text-gray-700"
                }`}
              >
                {cat.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default HeaderManu;