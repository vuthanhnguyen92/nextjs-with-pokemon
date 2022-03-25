import Head from "next/head";
import PokemonList from "./../components/PokemonList";

type Props = {
  pokemons: any;
};

const PokemonListPage = ({ pokemons }: Props) => {
  return (
    <div>
      <Head>
        <title>Pokemon List</title>
      </Head>

      <main>
        <PokemonList pokemons={pokemons}></PokemonList>
      </main>
    </div>
  );
};

export async function getServerSideProps() {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1000");
  const data = await response.json();

  return {
    props: {
      pokemons: data.results,
    },
  };
}

export default PokemonListPage;
