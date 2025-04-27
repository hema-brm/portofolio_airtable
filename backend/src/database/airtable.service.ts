import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AirtableService {
  private readonly baseUrl = `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}`;

  constructor(private readonly http: HttpService) {}

  private getHeaders() {
    return {
      Authorization: `Bearer ${process.env.AIRTABLE_PERSONAL_TOKEN}`,
      'Content-Type': 'application/json',
    };
  }

  async get<T>(table: string, params?: Record<string, string>): Promise<T[]> {
    const result = await firstValueFrom(
      this.http.get(`${this.baseUrl}/${table}`, {
        headers: this.getHeaders(),
        params,
      }),
    );
    return result.data.records.map((record: T) => this.extract(record));
  }

  async getById<T>(table: string, id: string): Promise<T | null> {
    const result = await firstValueFrom(
      this.http.get(`${this.baseUrl}/${table}/${id}`, {
        headers: this.getHeaders(),
      }),
    );

    if (!result.data) {
      return null;
    }
    return this.extract(result.data);
  }

  async findOneByField<T>(
    table: string,
    field: string,
    value: string,
  ): Promise<T | null> {
    const filter = `FIND("${value}", {${field}})`;
    const results = await this.get<T>(table, { filterByFormula: filter });
    return results[0] || null;
  }

  async create<T>(table: string, fields: any): Promise<T> {
    const res = await firstValueFrom(
      this.http.post(
        `${this.baseUrl}/${table}`,
        { fields },
        { headers: this.getHeaders() },
      ),
    );
    return this.extract(res.data);
  }

  async update<T>(table: string, id: string, fields: any): Promise<T> {
    const res = await firstValueFrom(
      this.http.patch(
        `${this.baseUrl}/${table}/${id}`,
        { fields },
        { headers: this.getHeaders() },
      ),
    );
    return this.extract(res.data);
  }

  async delete(table: string, id: string): Promise<void> {
    await firstValueFrom(
      this.http.delete(`${this.baseUrl}/${table}/${id}`, {
        headers: this.getHeaders(),
      }),
    );
  }

  private extract<T>(record: any): T & { id: string } {
    return {
      id: record.id,
      ...record.fields,
    };
  }
}
