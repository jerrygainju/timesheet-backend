import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Projects } from './entities/projects.entity';
import { ProjectInput } from './dto/projects.input';
import { ProjectOutput } from './dto/projects-output';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Projects)
    private readonly projectRepository: Repository<Projects>,
  ) {}

  async createproject(data: ProjectInput): Promise<ProjectOutput> {
    const { MasterProjectName } = data;
    const findProject = await this.projectRepository.findOne({ where: { MasterProjectName } });

    if (findProject) {
      throw new Error('Project already exists');
    }
    const project = this.projectRepository.create(data);
    return this.projectRepository.save(project);
  }

  async findAll(): Promise<ProjectOutput[]> {
    return this.projectRepository.find();
  }
  async findOne(id: string): Promise<ProjectOutput> {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) {
      throw new Error('Project not found');
    }
    return project;
  }

  async updateProject(data: ProjectInput, id: string): Promise<ProjectOutput> {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) {
      throw new Error('Project not found');
    }
    const updatedProject = Object.assign(project, data);
    return this.projectRepository.save(updatedProject);
  
}
}