// import { Injectable } from '@angular/core';

// interface Post {
//   id?: number;
//   title: string;
//   content: string;
//   status: 'Do zrobienia' | 'W trakcie' | 'Zrobione';
//   funkcjonalnosc: string;
//   priority: 'Wysoki' | 'Średni' | 'Niski';
//   details?: string;
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class PostService {
//   private localStorageKey = 'posts';

//   constructor() {}

//   getPosts(): Post[] {
//     const savedPosts = localStorage.getItem(this.localStorageKey);

//     return savedPosts ? JSON.parse(savedPosts).map((post: Post) => ({ ...post, status: post.status || 'Do zrobienia', funkcjonalnosc: post.funkcjonalnosc|| '', priority: post.priority || 'Niski' })) : [];
//   }
//   getPost(id: number): Post | null {
//     const posts = this.getPosts();
//     return posts[id] || null;
//   }

//   savePosts(posts: Post[]): void {
//     localStorage.setItem(this.localStorageKey, JSON.stringify(posts));
//   }

//   addPost(post: Post): void {
//     const posts = this.getPosts();
//     posts.push(post);
//     this.savePosts(posts);
//   }

//   editPost(index: number, updatedPost: Post): void {
//     const posts = this.getPosts();
//     const oldPost = posts[index];
//     posts[index] = updatedPost;
//     this.savePosts(posts);


//     if (oldPost.status !== updatedPost.status) {
//       this.updateFunctionalityStatus(updatedPost, updatedPost.status);
//     }
//   }

//   deletePost(index: number): void {
//     const posts = this.getPosts();
//     posts.splice(index, 1);
//     this.savePosts(posts);
//   }

//   updateFunctionalityStatus(post: Post, newStatus: 'Do zrobienia' | 'W trakcie' | 'Zrobione'): void {
//   }
// }
import { Injectable } from '@angular/core';

interface Post {
  id?: number;
  title: string;
  content: string;
  status: 'Do zrobienia' | 'W trakcie' | 'Zrobione';
  funkcjonalnosc: string;
  priority: 'Wysoki' | 'Średni' | 'Niski';
  details?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private localStorageKey = 'posts';

  constructor() {}

  getPosts(): Post[] {
    const savedPosts = localStorage.getItem(this.localStorageKey);

    return savedPosts ? JSON.parse(savedPosts).map((post: Post) => ({ ...post, status: post.status || 'Do zrobienia', funkcjonalnosc: post.funkcjonalnosc|| '', priority: post.priority || 'Niski' })) : [];
  }
  getPost(id: number): Post | null {
    const posts = this.getPosts();
    return posts[id] || null;
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
    // Jeśli nowy status to 'Zrobione', ustaw funkcjonalność na pustą wartość
    if (newStatus === 'Zrobione') {
      post.funkcjonalnosc = '';
    }
    // Jeśli nowy status to 'W trakcie', sprawdź, czy funkcjonalność jest pusta i ustaw domyślną wartość
    else if (newStatus === 'W trakcie' && post.funkcjonalnosc === '') {
      post.funkcjonalnosc = 'Domyślna funkcjonalność';
    }
    // W przeciwnym razie nie wykonuj żadnych zmian w funkcjonalności
  }

}
