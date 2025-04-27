import { Injectable } from '@nestjs/common';
import { AirtableService } from 'src/database/airtable.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  private readonly tableName = 'Users';

  constructor(private readonly airtableService: AirtableService) {}

  async findByEmail(email: string): Promise<User | null> {
    const filter = `LOWER({email}) = "${email.toLowerCase()}"`;
    const users = await this.airtableService.get<User>(this.tableName, {
      filterByFormula: filter,
      maxRecords: '1',
    });
    return users[0] || null;
  }

  async findAll(): Promise<User[]> {
    return this.airtableService.get<User>(this.tableName);
  }

  async create(dto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(dto.password, salt);

    return this.airtableService.create<User>(this.tableName, {
      email: dto.email,
      password: hashedPassword,
      firstName: dto.firstName,
      lastName: dto.lastName,
      role: dto.role,
    });
  }

  async update(id: string, dto: UpdateUserDto): Promise<User> {
    return this.airtableService.update<User>(this.tableName, id, dto);
  }
}
