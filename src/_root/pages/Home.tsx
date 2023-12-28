import Loader from "@/components/shared/Loader"
import PostCard from "@/components/shared/PostCard"
import { useGetRecentPosts } from "@/lib/react-query/queriesAndMutations"
import { Models } from "appwrite"

export default function Home() {
    const { data: posts, isPending: isPostLoading, isError: isErrorPosts } = useGetRecentPosts()

    return (
        <div className="px-3 md:px-8 lg:px-0 duration-150 flex flex-col gap-8 flex-1 max-w-[40rem] m-auto py-8 md:py-10">
            <div className="w-full">
                <h1 className="font-bold text-xl md:text-2xl">Diễn đàn</h1>
            </div>
            <div className=" w-full">
                {
                    isPostLoading && !posts ? (
                        <ul className="flex flex-1 flex-col gap-8 w-full items-center md:items-start">

                            {
                                [...Array(5)].map((_, index) => (
                                    <Loader type="skelton" key={index} />
                                ))
                            }
                        </ul>
                    ) : (
                        <ul className="flex flex-1 flex-col gap-8 w-full items-center md:items-start">
                            {
                                posts?.documents.map((post: Models.Document) => (
                                    <PostCard post={post} key={post.caption} />
                                ))
                            }
                        </ul>
                    )
                }
            </div>
        </div>
    )
}
