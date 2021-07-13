import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Book } from 'src/app/model/book';

const dbUrl = "http://localhost:3000/books";

@Component({
  selector: 'app-form',
  template: `
  <form #f="ngForm" (ngSubmit)="save(f)">
  <div class="mb-3">
      <label for="title" class="form-label">Title</label>
      <input [ngModel]="active?.title" type="text" class="form-control" name="title">
  </div>
  <div class="mb-3">
      <label for="author" class="form-label">Autore</label>
      <input [ngModel]="active?.author" type="text" class="form-control" name="author">
  </div>
  <div class="mb-3">
      <label for="price" class="form-label">Price</label>
      <input [ngModel]="active?.price" type="text" class="form-control" name="price">
  </div>
  <div class="mb-3">
      <label for="isbn" class="form-label">ISBN</label>
      <input [ngModel]="active?.isbn" type="text" class="form-control" name="isbn">
  </div>
  <div class="mb-3">
      <label for="description" class="form-label">Descrizione</label><br>
      <textarea [ngModel]="active?.description" name="description" cols="80" rows="4"></textarea>
  </div>
  <div class="form-group">
      <input style="display: none;" #selectedFile type="file" class="form-control" name="img" (change)="readUrl($event)">
  </div>
  <div class="mb-3">
      <img *ngIf="active" [src]="active?.img" height="170" />
      <img *ngIf="this.imgSrc" [src]="this.imgSrc" height="170" />
      <button type="button" class="btn btn-primary" (click)="selectedFile.click()">Aggiungi immagine</button>
  </div>
  <input *ngIf="active" [(ngModel)]="active.img" type="hidden" name="img">
  <input *ngIf="this.imgSrc" [(ngModel)]="this.imgSrc" type="hidden" name="img">
  <button type="submit" class="btn btn-outline-success">{{active ? 'EDIT' : 'ADD'}}</button>
  <button type="button" class="btn btn-outline-warning" (click)="reset(f)">RESET</button>
</form>
  `,
  styles: [
  ]
})
export class FormComponent implements OnInit {

  @Input() books: Book[];
  @Input() active: Book;
  imgSrc: string;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

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
      this.reset(f);
    });
  }

  AddBook(form: NgForm) {
    console.log(form);
    this.http.post<Book>(`${dbUrl}`, form.value).subscribe(data => {
      this.books.push(data);
      this.reset(form);
    });
  }

  reset(f: NgForm) {
    this.active = null;
    this.imgSrc = null;
    f.reset();
  }

  readUrl(e: any) {
    const reader = new FileReader();
    console.log(e.target.files);
    //if (e.target.files && e.target.files.lenght) {
    const [file] = e.target.files;
    reader.readAsDataURL(file);

    if(this.active)
    {
      reader.onload = () => {
        this.active.img = reader.result as string;
      }
    }else
    {
      reader.onload = () => {
        this.imgSrc = reader.result as string;
      }
    }

    
    //}
  }

}
