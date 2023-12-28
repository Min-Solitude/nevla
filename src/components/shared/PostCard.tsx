import { useUserContext } from "@/context/AuthContext"
import { formatDateString } from "@/lib/utils"
import IonIcon from "@reacticons/ionicons"
import { Models } from "appwrite"
import { Link } from "react-router-dom"
import PostStats from "./PostStats"

type PostCardProps = {
    post: Models.Document
}

export default function PostCard({ post }: PostCardProps) {

    const { user } = useUserContext()

    if (!post.creator) return

    return (
        <div className="px-4 md:px-6 py-8 border border-[#202020] shadow-default flex flex-col gap-4 rounded-2xl bg-dark-gray w-full">
            <div className="flex items-center gap-3 w-full relative">
                <Link to={`/profile/${post.creator.$id}`}>
                    <img src={post?.creator?.imageUrl || 'https://i.pinimg.com/564x/91/7d/23/917d2351a4838426a590453bfd68790a.jpg'} alt="" className="w-10 h-10 rounded-full" />
                </Link>
                <div>
                    <p className="font-bold">{post.creator.name}</p>
                    <div className="flex gap-2 items-center text-sm text-[#6d6d6d]">
                        <p>{formatDateString(post.$createdAt)}</p> - <p>{post.location}</p>
                    </div>
                </div>
                <Link to={`/update-post/${post.$id}`}
                    className={`absolute right-0   justify-center items-center ${user.id !== post.creator.$id ? 'hidden' : 'flex'}`}
                >
                    <IonIcon name="create-outline" className="text-purple-primary text-2xl" />
                </Link>
            </div>
            <Link to={`/posts/${post.$id}`} className="flex flex-col gap-2">
                <p className="text-[15px] font-medium">{post.caption}</p>
                <ul className="text-sm flex gap-2 items-center text-[#6d6d6d]">
                    {post.tags.map((tag: string) => (
                        <li key={tag} className="">
                            <p>#{tag}</p>
                        </li>
                    ))}
                </ul>
            </Link>
            <img src={post.imageUrl || 'https://i.pinimg.com/564x/61/5f/3d/615f3d8d6cc73017cb84cb38ed748c38.jpg'} alt="post image" className="rounded-2xl" />

            <PostStats post={post} userId={user.id} />
        </div>
    )
}
