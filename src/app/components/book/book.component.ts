import { Book } from './../../model/book';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { error } from '@angular/compiler/src/util';

const dbUrl = "http://localhost:3000/books";
const dbUrlBad = "http://localhost:3000/bookssss";

@Component({
  selector: 'app-book',
  template: `

  <!-- Main Content -->
  <div class="container">
  <div *ngIf="err" class="alert alert-danger">{{err.statusText}}</div>
    <div class="row">
    <ul class="list-group">
        <li class="list-group-item" *ngFor="let book of books">
        {{book.id}} - {{book.title}} - {{book.author}}
            <div class="pull-right">
            € {{book.price | number:'1.2-2'}} <i class="fa fa-trash" (click)="delete(book)" aria-hidden="true"></i>
            </div>
        </li>
    </ul>
    
    </div>
  </div>

  <hr>

  

  `,
  styles: [
  ]
})
export class BookComponent implements OnInit {

  books: Book[];
  err: any;

  constructor(private http: HttpClient) { }

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
