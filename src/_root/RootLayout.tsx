import BottomBar from "@/components/layouts/BottomBar";
import LeftSideBar from "@/components/layouts/LeftSideBar";
import TopBar from "@/components/layouts/TopBar";
import { Outlet } from "react-router-dom";

export default function RootLayout() {
    return (
        <div className="bg-dark text-white w-full md:flex">
            <TopBar />
            <LeftSideBar />
            <div className="flex flex-1 w-full mb-[5rem]">
                <Outlet />
            </div>
            <BottomBar />
        </div>
    )
}
