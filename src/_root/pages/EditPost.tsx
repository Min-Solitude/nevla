import FormPost from "@/components/forms/FormPost";
import Loader from "@/components/shared/Loader";
import { useGetPostById } from "@/lib/react-query/queriesAndMutations";
import IonIcon from "@reacticons/ionicons";
import { useParams } from "react-router-dom";

export default function EditPost() {
    const { id } = useParams<{ id: string }>()
    const { data: post, isPending } = useGetPostById(id || '')

    if (isPending) return <Loader />

    return (
        <div className="flex-1 flex justify-center items-start">
            <div className=' flex-1 max-w-3xl px-3 py-8 flex flex-col gap-8'>
                <div className="flex items-end gap-3">
                    <IonIcon name="document-text-outline" className="text-3xl text-white" />
                    <span className="font-semibold text-xl">
                        Sửa bài viết
                    </span>
                </div>
                <FormPost action="update" post={post} />
            </div>
        </div>
    )
}
