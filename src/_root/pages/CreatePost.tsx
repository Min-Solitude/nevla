import FormPost from "@/components/forms/FormPost";
import IonIcon from "@reacticons/ionicons";

export default function CreatePost() {
    return (
        <div className="flex-1 flex justify-center items-start">
            <div className=' flex-1 max-w-3xl px-3 py-8 flex flex-col gap-8'>
                <div className="flex items-end gap-3">
                    <IonIcon name="document-text-outline" className="text-3xl text-white" />
                    <span className="font-semibold text-xl">
                        Tạo bài viết
                    </span>
                </div>
                <FormPost action="create" />
            </div>
        </div>
    )
}
