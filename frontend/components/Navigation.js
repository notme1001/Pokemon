import React, {useRef, useState} from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {useTheme} from 'next-themes'
import useWindowSize from './useWindowSize'

const Navigation = () => {
    const navigationMobileRef = useRef(null)
    const mobileIconRef = useRef(null)
    const [mobileNavOpen, setMobileNavOpen] = useState(false)
    const [mounted, setMounted] = useState(false)
    const router = useRouter()
    const {width} = useWindowSize()
    const {theme, setTheme} = useTheme()

    React.useEffect(() => setMounted(true), [])

    const toggleMobileNavigation = () => {
        navigationMobileRef.current.classList.add('touched')
        navigationMobileRef.current.classList.toggle('translate-x-full')
        setMobileNavOpen(!mobileNavOpen)
    }

    const linkClicked = event => {
        if (event.currentTarget.href.indexOf('cv') > -1) {
        document.querySelectorAll('nav li a').forEach(navEl => {
            navEl.classList.remove('active')
        })
        }
        if (width <= 768) {
        toggleMobileNavigation()
        }
    }

    return(
        <>
            <nav className={`flex items-center justify-between flex-wrap bg-gray-darkest w-full pin-t p-8 absolute ${mobileNavOpen ? 'border-b bg-white' : ''}`} style={{zIndex: 99999999}}>
                <div className="flex items-center justify-end px-4">
                    <Link href="/">
                        <img
                            src="/icons/pokeball.svg"
                            alt="Picture of the author"
                            className="lazyautosizes lazyloaded"
                            width={46}
                            height={46}
                        />
                    </Link>
                </div>

                <div className="">
                    <button id="nav-toggle" className="flex items-center px-3 py-2 border-0 rounded text-gray-700 text-bold">
                        <div
                            ref={mobileIconRef}
                            onClick={toggleMobileNavigation}
                            className="iconNav order-3 h-6 w-5 cursor-pointer relative"
                            >
                            <span
                                className={`transform transition duration-300 ease-in-out absolute h-1 w-full bg-gray-700 dark:bg-orange rounded-lg left-0 ${
                                mobileNavOpen ? 'rotate-135 top-2' : 'rotate-0'
                                }`}
                            ></span>
                            <span
                                className={`absolute transition duration-300 ease-in-out h-1 w-full bg-gray-700 dark:bg-orange rounded-lg left-0 top-2 ${
                                mobileNavOpen ? 'opacity-0 -left-40' : 'opacity-100'
                                }`}
                            ></span>
                            <span
                                className={`transform transition duration-300 ease-in-out absolute h-1 w-full bg-gray-700 dark:bg-orange rounded-lg left-0 ${
                                mobileNavOpen ? '-rotate-135 top-2' : 'rotate-0 top-4'
                                }`}
                            ></span>
                        </div>
                    </button>
                </div>

                <div className={`w-full flex-grow ${!mobileNavOpen ? 'hidden' : ''} py-4 justify-center items-center`} id="nav-content">
                    <ul ref={navigationMobileRef} className="list-reset justify-end flex-1 items-center">
                        <li className="mr-3 cursor-pointer text-center">
                            { router.pathname == '/' ? <Active text="Home" to="/"/> : <NoActive text="Home" to="/" /> }
                        </li>
                        <li className="mr-3 text-center">
                            <a className="inline-block text-gray-dark no-underline hover:text-gray-lighter hover:text-underline py-2 px-4" href="#">
                            { router.pathname == '/favorite' ? <Active text="Favorite" to="/favorite"/> : <NoActive text="Favorite" to="/favorite" /> }
                            </a>
                        </li>
                        <li className="mr-3 cursor-pointer text-center">
                            <a className="inline-block text-gray-dark no-underline hover:text-gray-lighter hover:text-underline py-2 px-4" href="#">
                                <p className="text-lg font-medium text-gray-700">item2</p>
                            </a>
                        </li>
                        <li className="mr-3 text-center">
                            <a className="inline-block text-gray-dark no-underline hover:text-gray-lighter hover:text-underline py-2 px-4" href="#">
                                <p className="text-lg font-medium text-gray-700">item3</p>
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

function NoActive({text, to}) {
    return (
        <Link className="inline-block text-gray-dark no-underline hover:text-gray-lighter hover:text-underline py-2 px-4" href={to}>
            <p className="text-lg font-medium text-gray-700">{text}</p>
        </Link>
    )
}

function Active({text, to}) {
    return (
        <Link className="inline-block py-2 px-4 text-gray-700 no-underline " href={to}>
            <div className="flex items-center justify-center flex-1 h-full py-1 px-6 bg-red-600 rounded-xl">
                <p className="text-lg font-semibold text-white">{text}</p>
            </div>
        </Link>
    )
}

export default Navigation