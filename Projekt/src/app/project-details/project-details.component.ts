import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../services/post.service';

interface Post {
  id?: number;
  title: string;
  content: string;
  status: 'Do zrobienia' | 'W trakcie' | 'Zrobione';
  funkcjonalnosc: string;
  priority: 'Wysoki' | 'Średni' | 'Niski';
  details?: string;
}

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss'],
})
export class ProjectDetailsComponent implements OnInit {
  @Input() post!: Post;
  @Output() update = new EventEmitter<Post>();
  functionalities: string[] = [];
  isEditMode = false;
  editedPost: Post = {
    title: '',
    content: '',
    status: 'Do zrobienia',
    funkcjonalnosc: '',
    priority: 'Niski',
  };

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    console.log(this.editedPost);
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      const post = this.postService.getPost(Number(id));
      if (post !== null) {
        this.post = post;
        this.editedPost = { ...post };
      }
    }
    this.loadFunctionalities();
  }

  loadFunctionalities(): void {
    this.functionalities = ['Functionality 1', 'Functionality 2', 'Functionality 3'];
  }

  onEdit(): void {
    this.isEditMode = true;
  }

  onCancel(): void {
    this.isEditMode = false;
    this.editedPost = { ...this.post };
  }

  onUpdate(): void {
    console.log('onUpdate() called');
    this.update.emit(this.editedPost);
    this.post = { ...this.editedPost };
    this.isEditMode = false;
    this.postService.savePosts([this.post]);
  }

  updatePost(): void {
    if (this.editedPost && this.editedPost.id !== undefined) {
      this.postService.editPost(this.editedPost.id, this.editedPost);
      this.post = { ...this.editedPost };
      this.isEditMode = false;
    }
  }
}
