import { Starship } from './Starship';

export interface Films {

  id: number;
  title: string;
  episode_id: number;
  starship: Starship[];
}
