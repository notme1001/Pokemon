export default function Footer() {
    return (
        <>
        <div className="bg-gray-100 px-10 py-8">
            <div className="container mx-auto px-20">
                <p className="text-lg text-gray-800 font-medium pb-2 pt-1"> Inspiration </p> 
                <p className="text-md text-gray-400 pb-2 font-light"> 
                    <a href="http://periksadata.com">
                        periksadata.com
                    </a>
                </p> 
                <p className="text-md text-gray-400 pb-2 font-light"> 
                    <a href="http://1password.com">
                        1password.com
                    </a>
                </p> 
            </div>
            <p className="text-sm font-light text-center text-gray-400 m-auto">Made with  by <span className="font-semibold">Ibnu Gunawan</span> - Breach data provided by Have I Been Pwned</p>
        </div>
        </>
    )
}
