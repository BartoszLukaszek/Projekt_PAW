import { Injectable } from '@angular/core';

interface Post {
  title: string;
  content: string;
  status: 'Do zrobienia' | 'W trakcie' | 'Zrobione';
  funkcjonalnosc: string;
  priority: 'Wysoki' | 'Średni' | 'Niski';
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private localStorageKey = 'posts';

  constructor() {}

  getPosts(): Post[] {
    const savedPosts = localStorage.getItem(this.localStorageKey);

    return savedPosts ? JSON.parse(savedPosts).map((post: Post) => ({ ...post, status: post.status || 'Do zrobienia', funkcjonalność: post.funkcjonalnosc|| '', priority: post.priority || 'Niski' })) : [];
  }

  savePosts(posts: Post[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(posts));
  }

  addPost(post: Post): void {
    const posts = this.getPosts();
    posts.push(post);
    this.savePosts(posts);
  }

  editPost(index: number, updatedPost: Post): void {
    const posts = this.getPosts();
    const oldPost = posts[index];
    posts[index] = updatedPost;
    this.savePosts(posts);


    if (oldPost.status !== updatedPost.status) {
      this.updateFunctionalityStatus(updatedPost, updatedPost.status);
    }
  }

  deletePost(index: number): void {
    const posts = this.getPosts();
    posts.splice(index, 1);
    this.savePosts(posts);
  }

  updateFunctionalityStatus(post: Post, newStatus: 'Do zrobienia' | 'W trakcie' | 'Zrobione'): void {
  }
}
