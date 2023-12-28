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
import { useCreateUserAccount, useSignInAccount } from "@/lib/react-query/queriesAndMutations"
import { SignUpValidation } from "@/lib/validation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from "react-router-dom"
import { z } from "zod"

export default function SignUpForm() {
    const { toast } = useToast()
    const { checkAuthUser, isLoading: isUserLoading } = useUserContext()
    const navigate = useNavigate()

    const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount()

    const { mutateAsync: signInAccount, isPending: isSigningIn } = useSignInAccount()

    // 1. Define your form.
    const form = useForm<z.infer<typeof SignUpValidation>>({
        resolver: zodResolver(SignUpValidation),
        defaultValues: {
            name: "",
            username: "",
            email: "",
            password: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof SignUpValidation>) {
        const newUser = await createUserAccount(values)

        if (!newUser) return toast({
            title: 'Đăng ký thất bại. Vui lòng thử lại!',
        })

        const session = await signInAccount({
            email: values.email,
            password: values.password,
        })

        if (!session) return toast({
            title: 'Đăng nhập thất bại. Vui lòng thử lại!',
        })

        const isLoggedIn = await checkAuthUser()

        if (isLoggedIn) {
            form.reset()

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
                <h2 className="font-bold text-lg text-center">Tạo một tài khoản mới</h2>
                <p className="font-medium text-sm text-center text-[#5a5a5a]">Để sử dụng Nevla, hãy nhập chi tiết tài khoản của bạn</p>
            </div>

            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 w-full flex flex-col gap-5">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Họ và tên</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Nhập họ và tên" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tên người dùng</FormLabel>
                            <FormControl>
                                <Input type="text" placeholder="Nhập tên người dùng" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                    {isCreatingAccount ? (
                        <div className="flex gap-4 items-center">
                            <Loader />
                            <p>Đang tạo tài khoản...</p>
                        </div>
                    ) : "Tạo tài khoản"}
                </Button>

                <div className="flex items-center gap-2 mt-4 m-auto">
                    <p className="text-sm font-medium text-[#5a5a5a]">Bạn đã có tài khoản?</p>
                    <Link to={'/sign-in'} className="text-[#716cfd] font-medium text-sm hover:underline">Đăng nhập</Link>
                </div>
            </form>
        </Form>
    )
}
