import { sideBarLink } from "@/constants";
import { INavLink } from "@/types";
import { NavLink, useLocation } from "react-router-dom";
import IonIcon from "@reacticons/ionicons";

export default function BottomBar() {

    const { pathname } = useLocation();

    return (
        <section className="fixed z-50 bottom-0 left-0  w-full p-4 md:hidden">
            <ul className="flex justify-between items-center shadow-default bg-dark-gray rounded-2xl p-3">
                {
                    sideBarLink.map((link: INavLink, index) => {
                        const isActive = pathname === link.route;
                        return (
                            <li key={index} className="flex justify-center items-center">
                                <NavLink to={link.route} className={`flex justify-center items-center p-2 rounded-xl hover:bg-purple-primary group duration-150 ${isActive && 'bg-purple-primary'}`}>
                                    <IonIcon name={`${link.icon}-outline` as any} className={` text-2xl ${isActive ? 'text-white' : 'text-purple-primary group-hover:text-white duration-150'}`} />
                                </NavLink>
                            </li>
                        )
                    })
                }
            </ul>
        </section>
    )
}
