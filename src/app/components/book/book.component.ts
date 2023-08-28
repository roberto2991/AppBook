import { Book } from './../../model/book';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/service/book.service';
import { error } from '@angular/compiler/src/util';
import { FormsModule, NgForm, NgModel } from '@angular/forms';


@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styles: [
    `
    .ngx-pagination {
      // border:1px solid #dadada;
      margin:5px auto;
      width: auto !important;
      font-size: 1rem !important
    }
    .ngx-pagination li {
      color:#0085A1;
    }
    
    .ngx-pagination a, .ngx-pagination button {
      color:#0085A1 !important;
      display: block;
      padding: 0.1875rem 0.625rem;
      border-radius: 2px !important;
      border: 1px solid #dadada !important ;
    }
    .pagination-next.disabled {
      border: 1px solid #dadada !important ;
    }
     
    .pagination-previous.disabled {
      border: 1px solid #dadada !important ;
    }

    .search-book {
      max-width: 500px;
      padding-bottom: 10px;
      margin: auto;
      color: #405065;
    }
  `
    ]
})
export class BookComponent implements OnInit {

  books: Book[];
  err: any;
  active: Book;
  p = 1 ; 
  term;

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

  reset() {
    this.active = null;
  }

  ngOnInit(): void {
    this.getAll();
  }

}
