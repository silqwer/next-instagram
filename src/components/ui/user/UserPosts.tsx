"use client";
import BookmarkIcon from "@/components/ui/icons/BookmarkIcon";
import HeartIcon from "@/components/ui/icons/HeartIcon";
import PostIcon from "@/components/ui/icons/PostIcon";
import { ProfileUser } from "@/model/user";
import { useState } from "react";
import PostGrid from "../posts/PostGrid";
import { CacheKeysContext } from "@/context/CacheKeysContext";

type Props = {
  user: ProfileUser;
};

const TABS = [
  { type: "posts", title: "User posts", icon: <PostIcon /> },
  {
    type: "saved",
    title: "Saved posts",
    icon: <BookmarkIcon className="w-3 h-3" />,
  },
  {
    type: "liked",
    title: "Liked posts",
    icon: <HeartIcon className="w-3 h-3" />,
  },
];

export default function UserPosts({ user }: Props) {
  const { username } = user;
  const [query, setQuery] = useState("posts");

  return (
    <section>
      <ul className="flex justify-center uppercase">
        {TABS.map(({ type, title, icon }) => (
          <li
            className={`p-4 mx-12 cursor-pointer border-black ${
              type === query && "font-bold border-t"
            }`}
            key={type}
            onClick={() => setQuery(type)}
          >
            <button aria-label={title} className="scale-150 md:scale-100">
              {icon}
            </button>
            <span className="hidden md:inline">{type}</span>
          </li>
        ))}
      </ul>
      <CacheKeysContext.Provider
        value={{ postsKey: `/api/users/${username}/${query}` }}
      >
        <PostGrid />
      </CacheKeysContext.Provider>
    </section>
  );
}
