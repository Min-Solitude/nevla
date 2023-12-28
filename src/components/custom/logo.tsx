import { Link } from 'react-router-dom'

type LogoProps = {
    className?: string
    size?: 'default' | 'small' | 'md' | 'large'
    name?: boolean
}

export default function Logo({ className, size = 'default', name = false }: LogoProps) {
    return (
        <Link to={'/'} className={`flex cursor-pointer items-center gap-2 justify-center ${className}`}>
            <img src="/assets/images/Logo.png" alt="Nevla" className={`${size === 'small' ? 'w-[2.5rem]' : 'w-[3.5rem]'}`} />
            {
                name && <span className='font-sans font-semibold text-2xl bg-gradient-to-r from-indigo-200 to-indigo-400 inline-block text-transparent bg-clip-text '>Nevla</span>
            }
        </Link>
    )
}
