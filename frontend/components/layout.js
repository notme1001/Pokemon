import Navigation from './Navigation'

export default function Layout({ preview, children, className }) {
  return (
    <>
      <div className="h-screen w-screen bg-normal flex items-center justify-center ">
        <div className={"w-full md:w-2/5 md:border h-full md:rounded-lg relative overflow-auto " + className}>
          <Navigation />
          {className ? <img src="/icons/pokeballGreen.svg" className="lazyautosizes lazyloaded absolute right-0 top-20 z-10" /> : 
            <img src="/icons/pokemon.svg" className="lazyautosizes lazyloaded absolute right-0 top-20 z-10" />
          }
          <main className="pt-28 absolute z-50 w-full">{children}</main>
        </div>
      </div>
    </>
  )
}