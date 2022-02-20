import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { NamedItem } from '../interfaces/named-item';

export class NamedItemServiceBase<T extends NamedItem> {
  constructor(private http: HttpClient, private baseUrl: string) {
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl);
  }

  getAllWithDeleted(): Observable<T[]> {
    return this.http.get<T[]>(this.baseUrl, {
      params: {
        deleted: true
      }
    });
  }

  add(item: NamedItem): Observable<T> {
    return this.http.post<T>(this.baseUrl, item);
  }

  update(data: T): Observable<T> {
    return this.http.put<T>(this.baseUrl + "/" + data.id, data);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(this.baseUrl + "/" + id);
  }

  getAsValueLabel(): Observable<Array<{ label: string; value: string; }>> {
    return this.getAll().pipe(
      map((data: T[]) => {
        return data.map(data => {
          return {
            value: data.id,
            label: data.name
          };
        });
      }));
  }
}
