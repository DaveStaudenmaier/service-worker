import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwUpdate } from '@angular/service-worker';

export interface Post {
  userID: number;
  id: number;
  title: string;
  body: string;
}

export interface Iactivities {
  id: string;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  posts: Array<Post> = [];

  constructor(private http: HttpClient,
              private swUpdate: SwUpdate) {}

  ngOnInit() {
    this.listenForSvcWorkerUpdate();

    this.initializeData();
  }


  private initializeData() {
    this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
    .subscribe(dummyData => {
      this.posts = dummyData;
    });
  }

  private listenForSvcWorkerUpdate() {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(event => {
        console.log('current version is', event.current);
        console.log('available version is', event.available);
        if (confirm('A new version of My PWA is available. Would you like to update now?')) {
          window.location.reload();
        }
      });
    }
  }

}
