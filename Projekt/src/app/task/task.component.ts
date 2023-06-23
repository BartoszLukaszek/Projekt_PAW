import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
interface Post {
    title: string;
    content: string;
    status: 'Do zrobienia' | 'W trakcie' | 'Zrobione';
    funkcjonalnosc: string;
    priority: 'Wysoki' | 'Średni' | 'Niski';
}
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  tasks: Post[] = [];
  newTask: Post = { title: '', content: '', status: 'Do zrobienia', funkcjonalnosc: '', priority: 'Niski' };
  editedTask: Post | null = null;
  editedTaskIndex: number | null = null;

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.tasks = this.postService.getPosts();
  }

  addTask(): void {
    if (this.tasks.length < 3) {
      this.postService.addPost(this.newTask);
      this.newTask = { title: '', content: '', status: 'Do zrobienia', funkcjonalnosc: '', priority: 'Niski' };
      this.tasks = this.postService.getPosts();
    } else {
      alert('Możesz dodać tylko 3 zadania do projektu');
    }
  }

  editTask(index: number): void {
    this.editedTask = { ...this.tasks[index] };
    this.editedTaskIndex = index;
  }

  saveEditedTask(): void {
    if (this.editedTaskIndex !== null && this.editedTask) {
      this.postService.editPost(this.editedTaskIndex, this.editedTask);
      this.tasks = this.postService.getPosts();
      this.editedTask = null;
      this.editedTaskIndex = null;
    }
  }

  deleteTask(index: number): void {
    this.postService.deletePost(index);
    this.tasks = this.postService.getPosts();
  }

  updatePost(): void {
    if (this.editedTask && this.editedTaskIndex !== null) {
      this.postService.editPost(this.editedTaskIndex, this.editedTask);
      this.tasks = this.postService.getPosts();
      this.editedTask = null;
      this.editedTaskIndex = null;
    }
  }
  onEditedTaskChange(value: string): void {
    if (this.editedTask) {
      this.editedTask.title = value;
    }
  }
}
