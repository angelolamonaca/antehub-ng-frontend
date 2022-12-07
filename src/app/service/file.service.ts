import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HandleError, HttpErrorHandler } from '../http-error-handler.service';
import { File } from '../model/File';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class FileService {
  fileUrl = 'http://localhost:3000/v1/file'; // URL to web api
  private readonly handleError: HandleError;

  constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('FileService');
  }

  /** GET All files */
  getFiles(): Observable<File[]> {
    return this.http
      .get<File[]>(this.fileUrl)
      .pipe(catchError(this.handleError('getFiles', [])));
  }

  /** GET File by id */
  getFileById(id: string): Observable<File> {
    const url = `${this.fileUrl}/${id}`;

    return this.http
      .get<File>(url)
      .pipe(catchError(this.handleError<any>('getFileById', {})));
  }

  /** POST: create file and add it to database */
  createFile(draftFile: File): Observable<File> {
    return this.http
      .post<File>(this.fileUrl, draftFile, httpOptions)
      .pipe(catchError(this.handleError('createFile', draftFile)));
  }

  /** PUT: update the hero on the server. Returns the updated hero upon success. */
  updateFile(file: File): Observable<File> {
    return this.http
      .put<File>(this.fileUrl, file, httpOptions)
      .pipe(catchError(this.handleError('updateFile', file)));
  }

  /** DELETE: delete the file from the server */
  deleteFile(id: number): Observable<unknown> {
    const url = `${this.fileUrl}/${id}`; // DELETE api/heroes/42
    return this.http
      .delete(url, httpOptions)
      .pipe(catchError(this.handleError('deleteFile')));
  }
}
