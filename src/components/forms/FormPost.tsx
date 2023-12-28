import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PostValidation } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Models } from "appwrite"
import { useForm } from "react-hook-form"
import * as z from "zod"
import FileUploader from "../shared/FileUploader"
import { Textarea } from "../ui/textarea"
import { useUserContext } from "@/context/AuthContext"
import { toast, useToast } from "../ui/use-toast"
import { useNavigate } from "react-router-dom"
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queriesAndMutations"
import Loader from "../shared/Loader"
4

type PostFormProps = {
    post?: Models.Document
    action?: 'update' | 'create'
}

export default function FormPost({ post, action }: PostFormProps) {

    const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost()
    const { mutateAsync: updatePost, isPending: isLoadingUpdate } = useUpdatePost()


    const { user } = useUserContext()
    const { toast } = useToast()
    const navigate = useNavigate()

    // 1. Define your form.
    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
            caption: post ? post.caption : "",
            file: [],
            location: post ? post.location : "",
            tags: post ? post.tags.join(',') : "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof PostValidation>) {
        if (post && action === 'update') {
            const updatedPost = await updatePost({
                ...values,
                postId: post.$id,
                imageId: post?.imageId,
                imageUrl: post?.imageUrl,
            })

            if (!updatedPost) {
                toast({
                    title: 'Vui lòng thử lại',
                })
            }

            return navigate(`/posts/${post.$id}`)
        }

        const newPost = await createPost({
            ...values,
            userId: user?.id,
        })

        if (!newPost) {
            toast({
                title: 'Vui lòng thử lại',
            })
        }

        navigate(`/`)
    }
    return (
        <div className=' flex flex-col items-center max-w-5xl'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 w-full">
                    <FormField
                        control={form.control}
                        name="caption"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold text-base">Tiêu đề</FormLabel>
                                <FormControl>
                                    <Textarea className="bg-dark-gray outline-none border border-[#363636] text-white" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="file"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold text-base">Thêm ảnh</FormLabel>
                                <FormControl>
                                    <FileUploader fieldChange={field.onChange} mediaUrl={post?.imageUrl} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold text-base">Thêm địa chỉ</FormLabel>
                                <FormControl>
                                    <Input type="text" className="bg-dark-gray outline-none border-[#363636] text-white" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold text-base">Thêm tag (cách nhau bởi dấu " , ")</FormLabel>
                                <FormControl>
                                    <Input type="text" className="bg-dark-gray outline-none border-[#363636] text-white placeholder:text-[#555555]" placeholder="Gái xinh, Gái đẹp, Gái nhức nách" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex gap-3 mt-6 justify-end">
                        <Button type="button">Hủy</Button>
                        <Button type="submit" className="bg-purple-primary text-white"
                            disabled={isLoadingCreate || isLoadingUpdate}
                        >
                            {
                                isLoadingCreate || isLoadingUpdate ? (
                                    <div className="flex items-center gap-2">
                                        <span>Đang tải lên</span>
                                        <Loader type="dots" />
                                    </div>
                                ) : (
                                    <span>
                                        {
                                            action === 'update' ? 'Cập nhật' : 'Đăng bài'
                                        }
                                    </span>
                                )
                            }
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}
