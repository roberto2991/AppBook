import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Book } from '../model/book';

const dbUrl = "http://localhost/bookServer/";
const dbUrlLocalJson = "http://localhost:3000/books";
const dbUrlBad = "http://localhost:3000/bookssss";

@Injectable({
  providedIn: 'root'
})

export class BookService {

  getAll() : Observable <Book[]>{
    return this.http.get<Book[]>(`${dbUrl}`);
  }

  getById(id: number) : Observable <Book>{
    //return this.http.get<Book>(`${dbUrl}/${id}`);
    return this.http.get<Book>(`${dbUrl}?id=${id}`);
  }

  AddBook(formS: NgForm) : Observable <Book>{
    console.log(formS);
    return this.http.post<Book>(`${dbUrl}`, formS.value);
  }

  Edit(f: NgForm, active: Book) : Observable <Book>{
    console.log(f);
    return this.http.patch<Book>(`${dbUrl}?id=${active.id}`, f.value);
  }

  Delete(b: Book) : Observable <Book[]>{
    console.log(b);
    return this.http.delete<Book[]>(`${dbUrl}?id=${b.id}`);
  }

  constructor(private http:HttpClient) { 

  }
}
