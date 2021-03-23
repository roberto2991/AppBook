import { Book } from './../../model/book';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { error } from '@angular/compiler/src/util';
import { FormsModule, NgForm, NgModel } from '@angular/forms';


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
  active: Book;

  constructor(private http: HttpClient) { }

  save(f: NgForm) {
    if (this.active) {
      this.edit(f)
    } else {
      this.AddBook(f);
    }
  }

  edit(f: NgForm) {
    this.http.patch<Book>(`${dbUrl}/${this.active.id}`, f.value).subscribe(data => {
      const idx = this.books.findIndex(b => b.id === this.active.id);
      this.books[idx] = data;
      console.log('edit element');
    });
  }

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

  delete(event: Event, book: Book) {
    
    event.stopPropagation();
    this.http.delete<Book[]>(`${dbUrl}/${book.id}`).subscribe(next => {
      const idx = this.books.findIndex(b => b.id === book.id);
      this.books.splice(idx, 1);
    },
      (error) => this.err = error
    );
  }

  reset(f: NgForm) {
    this.active = null;
    f.reset();
  }

  setActive(book: Book) {
    this.active = book;
  }

  ngOnInit(): void {
    this.getAll();
  }

}
