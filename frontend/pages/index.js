import {useState} from 'react'
import Layout from "../components/layout";
import Footer from "../components/Footer"
import { DataService } from '../dataService/dataService'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import useSWR from 'swr'
import Link from 'next/link';

const fetcher = url => DataService.get(url).then(res => res.data)

function Home() {
  const [pagination, setPagination] = useState(10)
  const [loading, SetLoading] = useState(false)
  const { data, error } = useSWR(`https://pokeapi.co/api/v2/pokemon?limit=${pagination}`, fetcher)

  return (
    <Layout>
      <div className="px-4">

      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-700">Pokedex</h2>
      </div>
      {
        !data ? 
        <>
          <div className="flex justify-center items-center w-screen h-screen bg-primeSand">
              <FontAwesomeIcon icon={faSpinner} className="animate-spin text-xl text-red-500 outline-none"/>		
          </div>
        </> :
        <>
          <div className="grid grid-cols-2 grid-rows-2 gap-4">
              {data?.results.map((res, index) => {
                return (
                  <Link href={`/pokemon/${res?.name}`}>
                    <div className="rounded-lg border p-2 text-white bg-green-400 bg-no-repeat bg-bottom" style={{backgroundImage: 'url("/icons/bottomBall.svg")'}}>
                      <h3 className="font-semibold text-lg capitalize">{res?.name}</h3>
                      <img src={`https://pokeres.bastionbot.org/images/pokemon/${index + 1}.png`} className="lazyautosizes lazyloaded"/>
                    </div>
                  </Link>
                )
              })}
          </div>
          <div className="flex items-center justify-center py-8">
            <button className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg" onClick={() => {
              SetLoading(!loading)
              setPagination(pagination + 10)
              SetLoading(false)
            }}>{
              loading ? <FontAwesomeIcon icon={faSpinner} className="animate-spin text-xl text-white-500 outline-none"/> : 'Load More'
            }</button>
          </div>
        </>
      }
      {/* <Footer /> */}
      </div>
    </Layout>
  )
}

export default Home