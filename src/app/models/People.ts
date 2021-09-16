import { Films } from './Films';
import { Starship } from './Starship';


export interface People {

  id: number;
  name: string;
  mass: string;
  films: Films[];
  starship: Starship[];
}
