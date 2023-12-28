import { Navigate, Outlet } from "react-router-dom"


export default function AuthLayout() {
    const isAuthenticated = false

    return (
        <>
            {
                isAuthenticated ? (
                    <Navigate to='/' />
                ) : (
                    <>
                        <section className="bg-dark text-white flex-1 flex justify-center items-center ">
                            <div className="box p-4 md:p-8 rounded-2xl w-full max-w-[30rem]">
                                <Outlet />
                            </div>
                        </section>
                    </>
                )
            }
        </>
    )
}
