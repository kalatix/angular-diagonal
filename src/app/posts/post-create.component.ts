import { Component } from '@angular/core';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})

export class PostCreateComponent {
  constructor(public postsService: PostsService) {}

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const post:Post = {
      title: form.value.postTitle,
      body: form.value.postBody
    }
    this.postsService.addPost(post);
    form.resetForm();
  }
}
