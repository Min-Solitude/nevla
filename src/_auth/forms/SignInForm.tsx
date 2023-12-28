import Logo from "@/components/custom/logo"
import Loader from "@/components/shared/Loader"
import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useUserContext } from "@/context/AuthContext"
import { useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { SignInValidation } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from "react-router-dom"
import { z } from "zod"

export default function SignInForm() {
    const { toast } = useToast()
    const { checkAuthUser, isLoading: isUserLoading } = useUserContext()
    const navigate = useNavigate()

    // Query
    const { mutateAsync: signInAccount, isPending } = useSignInAccount()

    // 1. Define your form.
    const form = useForm<z.infer<typeof SignInValidation>>({
        resolver: zodResolver(SignInValidation),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof SignInValidation>) {

        const session = await signInAccount({
            email: values.email,
            password: values.password,
        })

        if (!session) return toast({
            title: 'Đăng nhập thất bại. Vui lòng thử lại!',
        })

        const isLoggedIn = await checkAuthUser()

        console.log(isLoggedIn);


        if (isLoggedIn) {
            form.reset()
            console.log('Đăng nhập thành công!');
            navigate('/')
        } else {
            return toast({
                title: 'Đăng nhập thất bại. Vui lòng thử lại!',
            })
        }
    }

    return (
        <Form {...form}>

            <div className="flex flex-col items-center">
                <Logo />
                <h2 className="font-bold text-lg text-center">Đăng nhập</h2>
                <p className="font-medium text-sm text-center text-[#5a5a5a]">
                    Chào mừng bạn trở lại! Vui lòng đăng nhập để tiếp tục.
                </p>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 w-full flex flex-col gap-5">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="Nhập email" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mật khẩu</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="Nhập mật khẩu" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="bg-[#716cfd] mt-2 hover:bg-[#4640f8] duration-150">
                    {isPending || isUserLoading ? (
                        <div className="flex gap-4 items-center">
                            <Loader />
                            <p>Đang đăng nhập...</p>
                        </div>
                    ) : "Đăng nhập"}
                </Button>

                <div className="flex items-center gap-2 mt-4 m-auto">
                    <p className="text-sm font-medium text-[#5a5a5a]">Bạn chưa có tài khoản?</p>
                    <Link to={'/sign-up'} className="text-[#716cfd] font-medium text-sm hover:underline">Đăng ký</Link>
                </div>
            </form>
        </Form>
    )
}
