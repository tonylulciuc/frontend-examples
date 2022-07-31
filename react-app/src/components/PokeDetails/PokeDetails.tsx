import PokeAPI, { IPokemon, IPokemonStat } from 'pokeapi-typescript';
import React, { useEffect, useState } from 'react';
import { Card, Table } from 'react-bootstrap';

interface StatRowProps {
    num: number;
    stat: IPokemonStat;
}

function StatRow({ num, stat }: StatRowProps) {
    const {
        base_stat: baseStat,
        effort,
        stat: { name },
    } = stat;
    return (
        <tr>
            <td>{num}</td>
            <td>{name}</td>
            <td>{baseStat}</td>
            <td>{effort}</td>
        </tr>
    );
}

interface PokeDetailsProps {
    name?: string;
}

function PokeDetails({ name }: PokeDetailsProps) {
    const [pokemon, setPokemon] = useState<IPokemon>();

    useEffect(() => {
        if (!name) {
            return;
        }

        PokeAPI.Pokemon.fetch(name, true).then(setPokemon);
    }, [name]);

    if (!name || !pokemon) {
        return (<>Select creature to view details</>);
    }

    const {
        sprites: {
            front_shiny: sprite,
        },
    } = pokemon;

    return (
        <Card style={{ width: '18rem' }}>
            <img src={sprite} className="card-img-top" alt="..." />
            <Card.Body>
                <p className="h5">Stats</p>
                <p className="h6">
                    Weight:
                    {' '}
                    {pokemon.weight}
                </p>
                <Table striped>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Value</th>
                            <th scope="col">Effort</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pokemon.stats.map((stat, index) => <StatRow key={stat.stat.name} num={index + 1} stat={stat} />)}
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
}

export default PokeDetails;
