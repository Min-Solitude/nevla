type LoaderProps = {
    type?: 'spin' | 'skelton' | 'dots' | 'detail'
}

export default function Loader({ type = 'spin' }: LoaderProps) {

    if (type === 'detail') {
        return (
            <div className="flex flex-col gap-4 bg-dark-gray animate-pulse p-4 rounded-2xl shadow-default">
                <div className="w-full h-[20rem] bg-gray-600 rounded-xl"></div>
                <div className="flex flex-col gap-2">
                    <div className="w-full h-10 rounded-lg bg-gray-600"></div>
                    <div className="w-full h-3 rounded-lg bg-gray-600 mt-4"></div>
                    <div className="w-full h-3 rounded-lg bg-gray-600"></div>
                    <div className="w-full h-3 rounded-lg bg-gray-600"></div>
                    <div className="w-full h-3 rounded-lg bg-gray-600"></div>
                </div>
            </div>
        )
    }

    if (type === 'dots') {
        return (
            <div className="flex justify-center items-center">
                <div className="flex space-x-2">
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                    <div className="w-1 h-1 bg-white rounded-full"></div>
                </div>
            </div>
        )
    }

    if (type === 'skelton') {
        return (
            <div className="w-full animate-pulse bg-gray-900 p-4 shadow-default rounded-xl border border-[#252525]">
                <div className="h-[20rem] bg-gray-600 rounded-xl"></div>
                <div className="flex flex-col gap-2 mt-6">
                    <div className="w-full h-10 rounded-lg bg-gray-600"></div>
                    <div className="w-full h-3 rounded-lg bg-gray-600 mt-4"></div>
                    <div className="w-full h-3 rounded-lg bg-gray-600"></div>
                    <div className="w-full h-3 rounded-lg bg-gray-600"></div>
                    <div className="w-full h-3 rounded-lg bg-gray-600"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white"></div>
        </div>
    )
}
