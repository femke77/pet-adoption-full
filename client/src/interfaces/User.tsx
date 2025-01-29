import { Pet } from './Pet';

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  username: string;
  favoritePets: Pet[];
}

export type { User };
