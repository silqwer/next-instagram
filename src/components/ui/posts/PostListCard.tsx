import Avatar from "@/components/Avatar";
import { SimplePost } from "@/model/post";
import Image from "next/image";
import HeartIcon from "../icons/HeartIcon";
import BookmarkIcon from "../icons/BookmarkIcon";
import { parseDate } from "@/util/date";
import SmileIcon from "../icons/SmileIcon";

type Props = {
  post: SimplePost;
};
export default function PostListCard({ post }: Props) {
  const { userImage, username, image, createdAt, likes, text } = post;
  return (
    <article className="border border-gray-200 rounded-lg shadow-md">
      <div className="flex items-center p-2">
        <Avatar image={userImage} size="medium" highlight />
        <span className="ml-2 font-bold text-gray-900">{username}</span>
      </div>
      <Image
        className="object-cover w-full aspect-square"
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
      />
      <div className="flex justify-between px-4 my-2">
        <HeartIcon />
        <BookmarkIcon />
      </div>
      <div className="px-4 py-1">
        <p className="mb-2 text-sm font-bold">
          {`${likes?.length ?? 0}`} {likes?.length > 1 ? "likes" : "like"}
        </p>
        <p>
          <span className="mr-1 font-bold">{username}</span>
          {text}
        </p>
        <p className="my-2 text-xs uppercase text-neutral-500">
          {parseDate(createdAt)}
        </p>
        <form className="flex items-center border-t border-neutral-300">
          <SmileIcon />
          <input
            className="w-full p-3 ml-2 border-none outline-none "
            type="text"
            placeholder="Add a comment..."
          />
          <button className="ml-2 font-bold text-sky-500">Post</button>
        </form>
      </div>
    </article>
  );
}
