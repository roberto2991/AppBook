import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { Book } from '../model/book';

const dbUrl = "http://localhost:3000/books";
const dbUrlBad = "http://localhost:3000/bookssss";

@Injectable({
  providedIn: 'root'
})

export class BookService {

  getAll() : Observable <Book[]>{
    return this.http.get<Book[]>(`${dbUrl}`);
  }


  AddBook(formS: NgForm) : Observable <Book>{
    console.log(formS);
    return this.http.post<Book>(`${dbUrl}`, formS.value);
  }

  Edit(f: NgForm, active: Book) : Observable <Book>{
    console.log(f);
    return this.http.patch<Book>(`${dbUrl}/${active.id}`, f.value);
  }

  Delete(b: Book) : Observable <Book[]>{
    console.log(b);
    return this.http.delete<Book[]>(`${dbUrl}/${b.id}`);
  }

  constructor(private http:HttpClient) { 

  }
}
