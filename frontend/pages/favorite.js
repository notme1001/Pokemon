import Layout from "../components/layout";
import Link from 'next/link';
import {useLocalStorage} from '../dataService/localStorage'

function Home() {
    const [favorite, setFavorite] = useLocalStorage("Favorite", [])

  return (
    <Layout>
      <div className="px-4">

      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-700">Pokedex Like</h2>
      </div>
      {
        <>
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
              {favorite?.map((res, index) => {
                return (
                  <Link href={`/pokemon/${res?.name}`}>
                    <div className="rounded-lg border p-2 text-white bg-green-400 bg-no-repeat bg-bottom" style={{backgroundImage: 'url("/icons/bottomBall.svg")'}}>
                      <h3 className="font-semibold text-lg capitalize">{res?.name}</h3>
                      <img src={res.imgUrl} className="lazyautosizes lazyloaded"/>
                    </div>
                  </Link>
                )
              })}
          </div>
          {/* <div className="flex items-center justify-center py-8">
            <button className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg" onClick={() => {
              SetLoading(!loading)
              setPagination(pagination + 10)
              SetLoading(false)
            }}>{
              loading ? <FontAwesomeIcon icon={faSpinner} className="animate-spin text-xl text-white-500 outline-none"/> : 'Load More'
            }</button>
          </div> */}
        </>
      }
      </div>
    </Layout>
  )
}

export default Home