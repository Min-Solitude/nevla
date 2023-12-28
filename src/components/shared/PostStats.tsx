import { useDeleteSavedPost, useGetCurrentUser, useLikePost, useSavePost } from "@/lib/react-query/queriesAndMutations";
import { checkIsLiked } from "@/lib/utils";
import IonIcon from "@reacticons/ionicons";
import { Models } from "appwrite";
import { useEffect, useState } from "react";
import Loader from "./Loader";

type PostStartsProps = {
    post?: Models.Document;
    userId: string
}

export default function PostStats({ post, userId }: PostStartsProps) {
    const likesList = post?.likes.map((user: Models.Document) => user.$id)

    const [likes, setLikes] = useState(likesList)
    const [isSaved, setIsSaved] = useState(false)

    const { mutate: likePost } = useLikePost()
    const { mutate: savePost, isPending: isSavingPosts } = useSavePost()
    const { mutate: deleteSavedPost, isPending: isDeletingSaved } = useDeleteSavedPost()

    const { data: currentUser } = useGetCurrentUser()

    const savedPostRecord = currentUser?.save.find(
        (record: Models.Document) => record.post.$id === post?.$id
    );

    useEffect(() => {
        setIsSaved(!!savedPostRecord)
    }, [currentUser])

    const handleLikePost = (e: React.MouseEvent) => {
        e.stopPropagation()

        let newLikes = [...likes]

        const hasLiked = newLikes.includes(userId)

        if (hasLiked) {
            newLikes = newLikes.filter((id) => id !== userId)
        } else {
            newLikes.push(userId)
        }

        setLikes(newLikes)
        likePost({ postId: post?.$id || '', likesArray: newLikes })
    }

    const handleSavePost = (
        e: React.MouseEvent<HTMLImageElement, MouseEvent>
    ) => {
        e.stopPropagation();

        if (savedPostRecord) {
            setIsSaved(false);
            return deleteSavedPost(savedPostRecord.$id);
        }

        savePost({ userId: userId, postId: post?.$id || '' });
        setIsSaved(true);
    };

    return (
        <div className="w-full flex justify-between mt-4 items-center">
            <div className="flex gap-1 items-center">

                <button className="flex justify-center items-center"
                    onClick={handleLikePost}
                >
                    {
                        checkIsLiked(likes, userId) ? (
                            <IonIcon name="heart" className="text-2xl cursor-pointer text-[#fd3131]" />
                        ) : (
                            <IonIcon name="heart-outline" className="text-2xl cursor-pointer text-[#fd3131]" />
                        )
                    }
                </button>
                <p className="font-medium">{likes.length}</p>
            </div>
            {
                isSavingPosts || isDeletingSaved ? <Loader /> : (
                    <>
                        {
                            isSaved ? (
                                <IonIcon name="bookmark" className="text-2xl text-purple-primary cursor-pointer" onClick={handleSavePost} />
                            ) : (
                                <IonIcon name="bookmark-outline" className="text-2xl text-purple-primary cursor-pointer" onClick={handleSavePost} />
                            )
                        }
                    </>
                )
            }

        </div>
    )
}
