import React from "react";
import Link from "next/link";
import Stack from "react-bootstrap/Stack";
import Card from "react-bootstrap/Card";
import styles from "./styles.module.scss";
import { PokemonList, Pokemon } from "../../types/PokemonList";

type Props = {
  pokemons: PokemonList;
  children?: React.ReactNode;
};

const PokemonLink = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <div key={pokemon.name}>
      <Link href={`/pokemon-details/${pokemon.name}`} prefetch={false}>
        <a>{pokemon.name}</a>
      </Link>
    </div>
  );
};

function PokemonList({ pokemons }: Props) {
  return (
    <div className={styles.stackContainer} data-testid="pokemon-list">
      <Stack direction="horizontal" gap={3}>
        {pokemons.map((pokemon: Pokemon) => (
          <Card key={pokemon.name} className={styles.link}>
            <Card.Body>
              <PokemonLink pokemon={pokemon} />
            </Card.Body>
          </Card>
        ))}
      </Stack>
    </div>
  );
}

export default PokemonList;
