import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/model/book';
import { BookService } from 'src/app/service/book.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-book-detail',
  template: `
    <div *ngIf="book" class="row">
    <app-spinner *ngIf="!book"></app-spinner>
      <div class="col-lg-8 col-md-10 mx-auto">
        <div class="pull-right">
          <app-spinner *ngIf="!book"></app-spinner>
          <img class="img-thumbnail" width="350" [src]="book.img" [alt]="book.title">
        </div>
        <div class="post-preview">
          <h2 class="post-title">{{book.title}}</h2>
          <small class="post-meta">
            di {{book.author}}
          </small>
          <small class="post-subtitle">
            <br>
            € {{book.price | number: '1.2-2'}}
          </small>
          <small class="post-subtitle">
            <br>
            Isbn:  {{book.isbn}}
          </small>
          <p class="post-title bellottaFont">
            {{book.description | truncate: 700}}
          </p>
          <button type="button" class="btn btn-outline-warning btn-sm" (click)="goBack()">Go back</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .bellottaFont {
      font-family: 'Bellota', cursive;
    }
    .btn-group-sm > .btn, .btn-sm {
      padding: .25rem .5rem;
      font-size: .875rem;
      line-height: 1.5;
      border-radius: .2rem;
    }
  `]
})
export class BookDetailComponent implements OnInit {

  err: any;
  book: Book;

  constructor(private http: HttpClient, private activateRoute: ActivatedRoute, private location: Location, private bookService: BookService) {

  }

  ngOnInit(): void {
    console.log(this.activateRoute)
    console.log('id passato: ' + this.activateRoute.snapshot.params.id)

    const id = +this.activateRoute.snapshot.params.id;
    this.getById(id);
  }


  getById(id: number) {
    this.bookService.getById(id).subscribe(data => {
      console.log(data)
      this.book = data;
    },
      (error) => this.err = error
    );
  }

  goBack(): void{
    this.location.back();
  }

}
