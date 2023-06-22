import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PostService } from '../services/post.service';

interface Post {
  title: string;
  content: string;
  status: 'Do zrobienia' | 'W trakcie' | 'Zrobione';
  funkcjonalnosc: string;
  priority: 'Wysoki' | 'Średni' | 'Niski';
}

@Component({
  selector: 'app-projectlist',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})

export class ProjectListComponent implements OnInit {
  posts: Post[] = [];
  @Output() edit = new EventEmitter<{post: Post, index: number}>();
  @Output() delete = new EventEmitter<number>();

  editedPost: Post | null = null;
  editedPostIndex: number = -1;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.posts = this.postService.getPosts();
  }

  onEdit(post: Post, index: number): void {
    this.editedPost = { ...post };
    this.editedPostIndex = index;
  }

  onDelete(index: number): void {

        this.postService.deletePost(index);
    this.posts = this.postService.getPosts();

  }

  cancelEdit(): void {
    this.editedPost = null;
    this.editedPostIndex = -1;
  }

  updatePost(): void {
    if (this.editedPost && this.editedPostIndex !== -1) {
      this.postService.editPost(this.editedPostIndex, this.editedPost);
      this.cancelEdit();
      this.posts = this.postService.getPosts();
    }
  }
}
