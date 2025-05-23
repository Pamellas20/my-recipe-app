'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import recipes from "@/data/recipes.json";

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <SignedOut>
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Welcome to My Recipe Viewer App </h1>
          <p className="mb-6">Please sign in to view and explore recipes.</p>
          <SignInButton>
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              Sign In
            </button>
          </SignInButton>
        </div>
      </SignedOut>

      <SignedIn>
        <h1 className="text-3xl font-bold mb-6 text-center">Recipes</h1>

        <div className="max-w-md mx-auto mb-8">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <Link
                href={`/recipes/${recipe.slug}`}
                key={recipe.slug}
                className="border rounded-lg overflow-hidden hover:shadow-md transition"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={recipe.image || "/placeholder.svg"}
                    alt={recipe.title}
                    width={400}
                    height={300}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
                  <p className="text-gray-600 text-sm mb-3">{recipe.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-500 text-xs">{recipe.cookingTime}</p>
                    <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                      View Recipe
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 mt-4">No recipes found matching your search.</p>
          )}
        </div>
      </SignedIn>
    </div>
  );
}
