import React, { FC } from "react";
import Image from "next/image";
import Card from "react-bootstrap/Card";
import styles from "./styles.module.scss";
import { PokemonDetails } from "../../types/PokemonDetails";

type Props = {
  pokemon: PokemonDetails;
};

const PokemonCard: FC<Props> = ({ pokemon }) => {
  return (
    <Card className={styles["pokemon-card"]}>
      <Image
        src={pokemon.image}
        alt={pokemon.name}
        width="300"
        height="300"
        //quality={1}
        placeholder="blur"
        blurDataURL={pokemon.image}
        loading="eager"
        priority={true}
      />
      <Card.Body className={styles["pokemon-card-body"]}>
        <Card.Title>{pokemon.name}</Card.Title>
      </Card.Body>
    </Card>
  );
};

export default PokemonCard;
