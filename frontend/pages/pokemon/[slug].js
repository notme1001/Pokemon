import Layout from "../../components/layout";
import { DataService } from "../../dataService/dataService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {useLocalStorage} from '../../dataService/localStorage'

const Pokemon = ({pokemon}) => {
    const [favorite, setFavorite] = useLocalStorage("Favorite", [])
  
    let found = favorite.filter((item) => { return item.name === pokemon?.name });

    const favoriteHandle = () => {
        if(found.length != 0){
            setFavorite(favorite.filter(item => item.name !== pokemon?.name))
        } else {
            setFavorite([...favorite, {name: pokemon?.name, imgUrl: pokemon['sprites']['other']['official-artwork']?.front_default}])
        }
    }
    
  return(
      <Layout className="bg-green-500">
        <div className="mb-4 px-4 flex justify-between">
            <h2 className="text-3xl font-semibold text-white">{pokemon?.name}</h2>
            <FontAwesomeIcon icon={faHeart} onClick={favoriteHandle} className={`text-3xl ${found.length != 0 ? 'text-red-500' : 'text-white'} outline-none`}/>
        </div>
        <div className="relative mt-10">
            <div className="flex items-center justify-center absolute w-full z-20 top-28 bottom-20">
                <img src={pokemon['sprites']['other']['official-artwork']?.front_default} className="lazyautosizes lazyloaded " width="60%"/>
            </div>
            <div className="bg-white rounded-t-3xl w-full h-max-full px-4 py-20 absolute z-0 mt-60" style={{minHeight: '51.9vh'}}>
                <h3 className="font-semibold text-xl text-gray-600 mb-2">Type Pokemon</h3>
                {pokemon.types.map((type, index) => {
                    return <p className="text-green-500 capitalize text-lg">• {type?.type?.name}</p>
                })}
                
                <h3 className="font-semibold text-xl text-gray-600 mb-2 mt-6">Status Pokemon</h3>
                {pokemon.stats.map((stat, index) => {
                    return(
                        <div className="relative pt-1">
                            <p className="text-green-500 capitalize text-lg mb-3">• {stat?.stat?.name} ({stat?.base_stat}%)</p>
                            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                                <div style={{ width: `${stat?.base_stat}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"></div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
      </Layout>
  );
};

Pokemon.getInitialProps = async ({req, query: { slug }}) => {
    const res = await DataService.get(`https://pokeapi.co/api/v2/pokemon/${slug}`).then(res => res.data).catch(err => err)
    return { pokemon: res }
}

export default Pokemon;
