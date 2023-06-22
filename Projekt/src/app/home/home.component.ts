import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { FormsModule } from '@angular/forms';
interface Post {
  title: string;
  content: string;
  status: 'Do zrobienia' | 'W trakcie' | 'Zrobione';
  funkcjonalnosc: string;
  priority: 'Wysoki' | 'Średni' | 'Niski';
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {

  posts: Post[] = [];
  newPost: Post = { title: '', content: '', status: 'Do zrobienia', funkcjonalnosc: '', priority: 'Niski' };
  editedPost: Post | null = null;
  editedPostIndex: number = -1;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.posts = this.postService.getPosts();

      console.log(this.posts);


  }

  addPost(): void {
    this.postService.addPost(this.newPost);
    this.newPost = { title: '', content: '', status: 'Do zrobienia', funkcjonalnosc: '', priority: 'Niski' };
    this.posts = this.postService.getPosts();
  }

  deletePost(index: number): void {
    this.postService.deletePost(index);
    this.posts = this.postService.getPosts();
  }

  enterEditMode(post: Post, index: number): void {
    this.editedPost = { ...post };
    this.editedPostIndex = index;
  }

  editPost(post: Post, index: number): void {
    this.enterEditMode(post, index);
  }
}
