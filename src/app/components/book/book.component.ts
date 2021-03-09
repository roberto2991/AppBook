import { Book } from './../../model/book';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { error } from '@angular/compiler/src/util';
import { FormsModule, NgForm } from '@angular/forms';


const dbUrl = "http://localhost:3000/books";
const dbUrlBad = "http://localhost:3000/bookssss";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styles: [
  ]
})
export class BookComponent implements OnInit {

  books: Book[];
  err: any;

  constructor(private http: HttpClient) { }

  AddBook(form: NgForm) {
    console.log(form);
    this.http.post<Book>(`${dbUrl}`, form.value).subscribe(data => {
      this.books.push(data);
    });
  }

  getAll() {
    this.http.get<Book[]>(`${dbUrl}`).subscribe(data => {
      console.log(data)
      this.books = data;
    },
      (error) => this.err = error
    );
  }

  delete(book: Book) {
    this.http.delete<Book[]>(`${dbUrl}/${book.id}`).subscribe(next => {
      const idx = this.books.findIndex(b => b.id === book.id);
      this.books.splice(idx, 1);
    },
      (error) => this.err = error
    );

  }

  ngOnInit(): void {
    this.getAll();

  }

}
