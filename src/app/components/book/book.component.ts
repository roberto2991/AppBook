import { Book } from './../../model/book';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/service/book.service';
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

  constructor(private http: HttpClient, private bookService: BookService) { }

  

  getAll() {
    this.bookService.getAll().subscribe(data => {
      console.log(data)
      this.books = data;
    },
      (error) => this.err = error
    );
  }

  delete(event: Event, book: Book) {

    event.stopPropagation();
    this.bookService.Delete(book).subscribe(next => {
      const idx = this.books.findIndex(b => b.id === book.id);
      this.books.splice(idx, 1);
    },
      (error) => this.err = error
    );
  }



  setActive(book: Book) {
    this.active = book;
  }

  ngOnInit(): void {
    this.getAll();
  }

}
