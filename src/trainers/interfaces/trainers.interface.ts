import { pokemon } from "../../pokemon/interfaces/pokemon.interface";

export interface trainers {
    name: string;
    sex: string;
    id: number;
    pokemon: pokemon[];
}