import { Student } from 'src/resources/students/entities/student.entity';
import { Technology } from 'src/resources/technologies/entities/technology.entity';

export class Project {
  id: string;
  name: string;
  slug: string;
  description?: string;
  isPublished: boolean;
  students: Student[];
  technologies: Technology[];
  mainImage: string;
  media: string[];
  createdAt: string;
  updatedAt: string;
  studentCount: number;
  technologyCount: number;
  likesTotal: number;
}
