import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Skill } from '../models/skill.model';

@Injectable({ providedIn: 'root' })
export class FileService {
  constructor(private http: HttpClient) {}

  getSkills(): Promise<Skill[]> {
    return this.http
      .get('assets/data.json')
      .toPromise()
      .then((res: any) => res.data)
      .then((data: Skill[]) => data);
  }

  getName(): Promise<string> {
    return this.http
      .get('assets/data.json')
      .toPromise()
      .then((res: any) => res.name);
  }
}
