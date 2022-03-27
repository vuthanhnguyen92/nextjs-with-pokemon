import Head from "next/head";
import PokemonDetailsType from "../../types/PokemonDetails";
import PokemonCard from "../../components/PokemonCard";
import { Pokemon } from "../../types/PokemonList";

type Props = {
  pokemon: PokemonDetailsType;
  time: string;
};

const PokemonDetailsPage = ({ pokemon, time }: Props) => {
  if (!pokemon) {
    return null;
  }

  return (
    <>
      <Head>
        <title>Pokemon Details - {pokemon.name}</title>
        <meta
          name="description"
          content={`Pokemon Details - ${pokemon.name}`}
        />
        <meta property="og:title" content={pokemon.name} />
      </Head>

      <main>
        <PokemonCard pokemon={pokemon}></PokemonCard>
        <div>
          <h3>Requested time: {time}</h3>
        </div>
      </main>
    </>
  );
};

//SERVER-SIDE RENDERING
//First way
// PokemonDetailsPage.getInitialProps = async ({ query }: any) => {
//   const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query.id}`);
//   const data = await response.json();

//   return {
//     time: new Date().toISOString(),
//     pokemon: {
//       name: data.name,
//       image: data.sprites.other["official-artwork"].front_default,
//     },
//   };
// };

//Second way
export async function getServerSideProps({ params }: any) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${params.id}`
  );
  const data = await response.json();

  return {
    props: {
      time: new Date().toISOString(),
      pokemon: {
        name: data.name,
        image: data.sprites.other["official-artwork"].front_default,
      },
    },
  };
}

//STATIC-SITE GENERATION
// export async function getStaticPaths() {
//   const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10");
//   const data = await response.json();

//   const paths = data.results.map((pokemon: Pokemon) => {
//     return { params: { id: pokemon.name } };
//   });

//   return {
//     paths: paths,
//     //if the requested page is not defined in paths
//     //the page will be generated and returned to the client-side
//     fallback: "blocking",
//   };
// }

// export async function getStaticProps({ params }: any) {
//   const response = await fetch(
//     `https://pokeapi.co/api/v2/pokemon/${params.id}`
//   );
//   const data = await response.json();

//   return {
//     props: {
//       time: new Date().toISOString(),
//       pokemon: {
//         image: data.sprites.other["official-artwork"].front_default,
//         name: data.name,
//       },
//     },
//     revalidate: 5, //revalidate data after 5 seconds (INCREMENTAL STATIC REGENERATION)
//   };
// }

export default PokemonDetailsPage;
