import { Post } from './post.model';
import { Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'

@Injectable({ providedIn: "root" })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  private url = 'http://localhost:3000/';

  constructor(private http:HttpClient) {}

  getPosts() {
    this.http
      .get<{
        message: string,
        posts: Post[]
      }>(this.url)
      .subscribe(postData => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getNextId() {
    return Math.max.apply(Math, this.posts.map(function(o) { return o.id; }))
  }

  addPost(post: Post) {
    this.http.post<{message: string}>(this.url, post)
      .subscribe((responseData) => {
        console.log(responseData.message);
        console.dir(post);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(post: Post) {

    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type':  'application/json'
    //   })
    // };

    console.log('deleting post. Post contents:');
    console.dir(post);

    var newPosts = this.posts.filter(function(p) {
      return p.id !== post.id;
    });

    console.log('newPosts:');
    console.dir(newPosts);

    this.posts = newPosts;
    this.postsUpdated.next([...this.posts]);
  }
}
