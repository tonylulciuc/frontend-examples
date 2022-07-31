import PokeAPI from 'pokeapi-typescript';
import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';

interface SpeciesProps {
    name: string;
    eventKey: string;
    onPokeSelected: (selected: string) => void;
}

function SpeciesListItem(props: SpeciesProps) {
    const {
        name,
        eventKey,
        onPokeSelected,
    } = props;

    return (
        <ListGroup.Item action href={eventKey} onClick={() => onPokeSelected(name)}>
            {name.toUpperCase()}
        </ListGroup.Item>
    );
}

interface PokeListProps {
    limit: number;
    onPokeSelected: (selected: string) => void;
}

function PokeList({ limit, onPokeSelected }: PokeListProps) {
    const [species, setSpecies] = useState<string[]>([]);

    useEffect(() => {
        PokeAPI.PokemonSpecies
            .list(limit)
            .then(({ results }) => results.map((res) => res.name))
            .then(setSpecies);
    }, [limit]);

    return (
        <ListGroup>
            {species.map((name, index) => (
                <SpeciesListItem
                    key={`poke-li-${name}`}
                    name={name}
                    eventKey={`#poke-li-${index}`}
                    onPokeSelected={onPokeSelected}
                />
            ))}
        </ListGroup>
    );
}

export default PokeList;
