export interface Technology {
    id: string;
    name: string;
    category: 'Frontend' | 'Backend' | 'Base de données' | 'Autre';
    projects?: string[];
  }
  