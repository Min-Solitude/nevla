import { sideBarLink } from "@/constants";
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { INavLink } from "@/types";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../custom/logo";
import IonIcon from "@reacticons/ionicons";

export default function LeftSideBar() {
    const { mutate: signOut, isSuccess } = useSignOutAccount();
    const navigate = useNavigate();
    const { user } = useUserContext();
    const { pathname } = useLocation();

    useEffect(() => {
        if (isSuccess) navigate(0)
    }, [isSuccess])

    return (
        <nav className="bg-dark-gray px-4 py-8 md:flex flex-1 h-screen sticky top-0 hidden max-w-[14rem] flex-col justify-between">
            <div className="flex flex-col gap-12">
                <div className="w-full flex justify-start items-center">
                    <Logo size="small" name />
                </div>
                <div className="flex items-center rounded-xl py-3 gap-3">
                    <Link to={`/profile/${user.id}`} className="flex justify-center items-center">
                        <img src={user.imageUrl || 'https://i.pinimg.com/564x/e8/d7/d0/e8d7d05f392d9c2cf0285ce928fb9f4a.jpg'} alt="profile" className="h-9 border-2 border-white w-9 rounded-full" />
                    </Link>
                    <div className="flex flex-col">
                        <p className="font-bold text-[14px]">{user.name}</p>
                        <p className="text-xs text-[#979797]">@{user.username}</p>
                    </div>
                </div>
                <ul className="flex flex-col gap-6">
                    {
                        sideBarLink.map((link: INavLink, index) => {
                            const isActive = pathname === link.route;
                            return (
                                <li key={index} className="flex justify-center relative items-center">
                                    {
                                        isActive &&
                                        <motion.span layoutId='underline' className=" absolute top-0 rounded-xl left-0 w-full h-full bg-purple-primary"></motion.span>
                                    }
                                    <NavLink to={link.route} className={`w-full flex items-center gap-3 group bg-transparent cursor-pointer py-3 px-6 relative rounded-xl ${!isActive && 'hover:bg-purple-primary duration-150 hover:text-white'}`}>
                                        <IonIcon name={`${link.icon}-outline` as any} className={` text-xl ${isActive ? 'text-white' : 'text-purple-primary group-hover:text-white duration-150'}`} />
                                        <span className="text-sm font-semibold ">{link.label}</span>
                                    </NavLink>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className="py-3 px-6">
                <button className="flex items-center gap-3"
                    onClick={() => signOut()}
                >
                    <IonIcon name="log-out-outline" className="text-xl text-purple-primary" onClick={() => signOut()} />
                    <span className="text-sm font-semibold text-white">Đăng xuất</span>
                </button>
            </div>
        </nav>
    )
}
