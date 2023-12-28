import Loader from "@/components/shared/Loader"
import PostStats from "@/components/shared/PostStats"
import { useUserContext } from "@/context/AuthContext"
import { useGetPostById } from "@/lib/react-query/queriesAndMutations"
import { multiFormatDateString } from "@/lib/utils"
import IonIcon from "@reacticons/ionicons"
import { Link, useParams } from "react-router-dom"

export default function PostDetail() {
    const { id } = useParams<{ id: string }>()
    const { data: post, isPending } = useGetPostById(id || '')
    const { user } = useUserContext()

    const handleDeletePost = () => { }

    return (
        <div className="px-3 md:px-8 lg:px-0 duration-150 flex flex-col lg:px-8 gap-8 items-center flex-1 m-auto py-8 md:py-10">
            {
                isPending ? <Loader type="detail" /> : (
                    <div className="p-4 md:p-6 border border-[#202020] shadow-default max-w-[40rem] lg:max-w-[60rem]  flex flex-col lg:flex-row gap-8 rounded-2xl bg-dark-gray w-full">
                        <div>
                            <img src={post?.imageUrl} alt="post" className="rounded-2xl lg:max-w-[20rem]" />
                        </div>
                        <div className="flex flex-col  gap-8">
                            <div className="w-full items-center flex justify-between">
                                <div className="flex items-center gap-3 w-full relative">
                                    <Link to={`/profile/${post?.creator.$id}`}>
                                        <img src={post?.creator?.imageUrl || 'https://i.pinimg.com/564x/91/7d/23/917d2351a4838426a590453bfd68790a.jpg'} alt="" className="w-10 h-10 rounded-full" />
                                    </Link>
                                    <div>
                                        <p className="font-bold">{post?.creator.name}</p>
                                        <div className="flex gap-2 flex-wrap items-center text-sm text-[#6d6d6d]">
                                            <p>{multiFormatDateString(post?.$createdAt)}</p>-<p>{post?.location}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className={`gap-2 items-center ${user.id !== post?.creator.$id ? "hidden" : 'flex'}`}>
                                    <Link to={`/update-post/${post?.$id}`} className="flex justify-center items-center cursor-pointer">
                                        <IonIcon name="create-outline" className="text-purple-primary text-2xl" />
                                    </Link>
                                    <button className={`flex justify-center items-center cursor-pointer ${user.id !== post?.creator.$id ? "hidden" : 'flex'}`}
                                        onClick={handleDeletePost}

                                    >
                                        <IonIcon name="trash-outline" className="text-red-500 text-2xl" />
                                    </button>
                                </div>
                            </div>
                            <hr className="  border-[#202020]" />
                            <div className="flex flex-col gap-2 lg:justify-between lg:h-full">
                                <div className="flex flex-col gap-2">
                                    <p className="text-[15px] font-medium">{post?.caption}</p>
                                    <ul className="text-sm flex gap-2 items-center text-[#6d6d6d]">
                                        {post?.tags.map((tag: string) => (
                                            <li key={tag} className="">
                                                <p>#{tag}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <PostStats post={post} userId={user.id} />
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
