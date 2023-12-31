"use client";

import Link from "next/link";
import { PropagateLoader } from "react-spinners";
import Avatar from "./Avatar";
import ScrollableBar from "./ui/ScrollableBar";
import useMe from "@/hooks/me";

export default function FollowingBar() {
  const { user, isLoading, error } = useMe();
  const users = user?.following;

  return (
    <section className="relative flex items-center justify-center w-full p-4 mb-4 rounded-lg shadow-sm shadow-neutral-300 min-h-[90px] overflow-x-auto">
      {error && <p>{`Server network error 😵`}</p>}
      {isLoading ? (
        <PropagateLoader size={8} color="red" />
      ) : (
        (!users || users.length === 0) && <p>{`You don't have following.`}</p>
      )}
      {users && users.length > 0 && (
        <ScrollableBar>
          {users.map(({ username, image }) => (
            <Link
              key={username}
              className="flex flex-col items-center w-20"
              href={`/user/${username}`}
            >
              <Avatar image={image} highlight />
              <p className="w-full overflow-hidden text-sm text-center text-ellipsis">
                {username}
              </p>
            </Link>
          ))}
        </ScrollableBar>
      )}
    </section>
  );
}
