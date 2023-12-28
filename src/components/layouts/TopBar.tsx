import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import IonIcon from "@reacticons/ionicons";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../custom/logo";
import { useUserContext } from "@/context/AuthContext";

export default function TopBar() {
    const { mutate: signOut, isSuccess } = useSignOutAccount();
    const navigate = useNavigate();
    const { user } = useUserContext();

    useEffect(() => {
        if (isSuccess) navigate(0)
    }, [isSuccess])

    return (
        <section className="bg-dark-gray md:hidden sticky top-0 z-50 shadow-default p-2 flex justify-between items-center">
            <Logo size="small" name />
            <div className="flex gap-4 items-center">
                <button className="flex justify-center items-center"
                    onClick={() => signOut()}
                >
                    <IonIcon name="log-out-outline" className="text-purple-primary text-2xl" />
                </button>
                <Link to={`/profile/${user.id}`} className="flex justify-center items-center">
                    <img src={user.imageUrl || 'https://i.pinimg.com/564x/48/6f/ff/486fff9c341f55b0d37697be5dda49d5.jpg'} alt="profile" className="h-8 w-8 rounded-full" />
                </Link>
            </div>
        </section>
    )
}
