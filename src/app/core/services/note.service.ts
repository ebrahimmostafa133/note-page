import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

export interface Note {
  _id?: string;
  title: string;
  content: string;
}


@Injectable({
  providedIn: 'root'
})
export class NoteService {
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      token: token || ''
    });
  }
// ✅ Get logged-in user notes
  getUserNotes(): Observable<any> {
    return this.http.get(environment.noteBaseUrl, { headers: this.getHeaders() });
  }

  // ✅ Add new note
  addNote(note: Note): Observable<any> {
    return this.http.post(environment.noteBaseUrl, note, { headers: this.getHeaders() });
  }

  // ✅ Update existing note
  updateNote(id: string, note: Note): Observable<any> {
    return this.http.put(`${environment.noteBaseUrl}/${id}`, note, { headers: this.getHeaders() });
  }

  // ✅ Delete a note
  deleteNote(id: string): Observable<any> {
    return this.http.delete(`${environment.noteBaseUrl}/${id}`, { headers: this.getHeaders() });
  }
}