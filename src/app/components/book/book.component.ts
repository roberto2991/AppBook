import { Book } from './../../model/book';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book',
  template: `

  <!-- Main Content -->
  <div class="container">
    <div class="row">
    <ul class="list-group">
        <li class="list-group-item" *ngFor="let book of books">
        {{book.id}} - {{book.title}} - {{book.author}}
            <div class="pull-right">
            € {{book.price | number:'1.2-2'}} <i class="fa fa-trash" aria-hidden="true"></i>
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

  constructor(private http: HttpClient) { }

  getAll() {
    this.http.get<Book[]>('http://localhost:3000/books').subscribe(data => {
      console.log(data)
      this.books = data;
    });
  }

  ngOnInit(): void {
    this.getAll();

  }

}
