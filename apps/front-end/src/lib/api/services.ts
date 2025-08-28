import { PostTag } from '@/types/post.type';
import { apiClient, createAuthenticatedApiClient } from './client';
import {
  LoginDto,
  CreateUserDto,
  AuthResponse,
  User,
  Post,
  CreatePostDto,
  Couple,
  CreateCoupleDto,
  Anniversary,
  CreateAnniversaryDto,
  Notification,
  CreateNotificationDto,
  Setting,
  UpdateSettingDto,
  Image,
  Chat,
  Bookmark,
  Like,
  ApiResponse,
  Tag,
} from '@use-navi-date/shared';

// Auth Service
export class AuthService {
  static async login(credentials: LoginDto): Promise<AuthResponse> {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000'}/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        credentials: 'include', // 쿠키 저장
      },
    );

    if (!res.ok) {
      throw new Error('로그인 실패');
    }

    return res.json();
  }

  static async register(userData: CreateUserDto): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/register', userData);
  }

  static async getProfile(token: string): Promise<ApiResponse<{ user: User }>> {
    const client = createAuthenticatedApiClient(token);
    return client.get<{ user: User }>('/auth/profile');
  }

  static async logout(
    token: string,
  ): Promise<ApiResponse<{ message: string }>> {
    const client = createAuthenticatedApiClient(token);
    return client.post<{ message: string }>('/auth/logout');
  }
}

// User Service
export class UserService {
  static async getUser(
    id: string,
    token: string,
  ): Promise<ApiResponse<{ user: User }>> {
    const client = createAuthenticatedApiClient(token);
    return client.get<{ user: User }>(`/users/${id}`);
  }
}

// Post Service
export class PostService {
  static async getPosts(
    token: string,
  ): Promise<ApiResponse<{ posts: Post[] }>> {
    const client = createAuthenticatedApiClient(token);
    return client.get<{ posts: Post[] }>('/posts');
  }

  static async getMyPosts(
    token: string,
  ): Promise<ApiResponse<{ posts: Post[] }>> {
    const client = createAuthenticatedApiClient(token);
    return client.get<{ posts: Post[] }>('/posts/my');
  }

  static async getPost(
    id: string,
    token: string,
  ): Promise<ApiResponse<{ post: Post }>> {
    const client = createAuthenticatedApiClient(token);
    return client.get<{ post: Post }>(`/posts/${id}`);
  }

  static async createPost(
    postData: CreatePostDto,
    token: string,
  ): Promise<ApiResponse<{ post: Post }>> {
    const client = createAuthenticatedApiClient(token);
    return client.post<{ post: Post }>('/posts', postData);
  }

  static async updatePost(
    id: string,
    postData: Partial<CreatePostDto>,
    token: string,
  ): Promise<ApiResponse<{ post: Post }>> {
    const client = createAuthenticatedApiClient(token);
    return client.patch<{ post: Post }>(`/posts/${id}`, postData);
  }

  static async deletePost(
    id: string,
    token: string,
  ): Promise<ApiResponse<{ message: string }>> {
    const client = createAuthenticatedApiClient(token);
    return client.delete<{ message: string }>(`/posts/${id}`);
  }
}

// Couple Service
export class CoupleService {
  static async getCouples(
    token: string,
  ): Promise<ApiResponse<{ couples: Couple[] }>> {
    const client = createAuthenticatedApiClient(token);
    return client.get<{ couples: Couple[] }>('/couples');
  }

  static async getCouple(
    id: string,
    token: string,
  ): Promise<ApiResponse<{ couple: Couple }>> {
    const client = createAuthenticatedApiClient(token);
    return client.get<{ couple: Couple }>(`/couples/${id}`);
  }

  static async createCouple(
    coupleData: CreateCoupleDto,
    token: string,
  ): Promise<ApiResponse<{ couple: Couple }>> {
    const client = createAuthenticatedApiClient(token);
    return client.post<{ couple: Couple }>('/couples', coupleData);
  }

  static async deleteCouple(
    id: string,
    token: string,
  ): Promise<ApiResponse<{ message: string }>> {
    const client = createAuthenticatedApiClient(token);
    return client.delete<{ message: string }>(`/couples/${id}`);
  }
}

// Anniversary Service
export class AnniversaryService {
  static async getCoupleAnniversaries(
    coupleId: string,
    token: string,
  ): Promise<ApiResponse<{ anniversaries: Anniversary[] }>> {
    const client = createAuthenticatedApiClient(token);
    return client.get<{ anniversaries: Anniversary[] }>(
      `/anniversaries/couple/${coupleId}`,
    );
  }

  static async getAnniversary(
    id: string,
    token: string,
  ): Promise<ApiResponse<{ anniversary: Anniversary }>> {
    const client = createAuthenticatedApiClient(token);
    return client.get<{ anniversary: Anniversary }>(`/anniversaries/${id}`);
  }

  static async createAnniversary(
    anniversaryData: CreateAnniversaryDto,
    token: string,
  ): Promise<ApiResponse<{ anniversary: Anniversary }>> {
    const client = createAuthenticatedApiClient(token);
    return client.post<{ anniversary: Anniversary }>(
      '/anniversaries',
      anniversaryData,
    );
  }

  static async updateAnniversary(
    id: string,
    anniversaryData: Partial<CreateAnniversaryDto>,
    token: string,
  ): Promise<ApiResponse<{ anniversary: Anniversary }>> {
    const client = createAuthenticatedApiClient(token);
    return client.patch<{ anniversary: Anniversary }>(
      `/anniversaries/${id}`,
      anniversaryData,
    );
  }

  static async deleteAnniversary(
    id: string,
    token: string,
  ): Promise<ApiResponse<{ message: string }>> {
    const client = createAuthenticatedApiClient(token);
    return client.delete<{ message: string }>(`/anniversaries/${id}`);
  }
}

// Bookmark Service
export class BookmarkService {
  static async getBookmarks(
    token: string,
  ): Promise<ApiResponse<{ bookmarks: Bookmark[] }>> {
    const client = createAuthenticatedApiClient(token);
    return client.get<{ bookmarks: Bookmark[] }>('/bookmarks');
  }

  static async createBookmark(
    postId: string,
    token: string,
  ): Promise<ApiResponse<{ bookmark: Bookmark }>> {
    const client = createAuthenticatedApiClient(token);
    return client.post<{ bookmark: Bookmark }>(`/bookmarks/${postId}`);
  }

  static async deleteBookmark(
    postId: string,
    token: string,
  ): Promise<ApiResponse<{ message: string }>> {
    const client = createAuthenticatedApiClient(token);
    return client.delete<{ message: string }>(`/bookmarks/${postId}`);
  }
}

// Like Service
export class LikeService {
  static async getLikes(
    postId: string,
    token: string,
  ): Promise<ApiResponse<{ likes: Like[] }>> {
    const client = createAuthenticatedApiClient(token);
    return client.get<{ likes: Like[] }>(`/likes/${postId}`);
  }

  static async createLike(
    postId: string,
    token: string,
  ): Promise<ApiResponse<{ like: Like }>> {
    const client = createAuthenticatedApiClient(token);
    return client.post<{ like: Like }>(`/likes/${postId}`);
  }

  static async deleteLike(
    postId: string,
    token: string,
  ): Promise<ApiResponse<{ message: string }>> {
    const client = createAuthenticatedApiClient(token);
    return client.delete<{ message: string }>(`/likes/${postId}`);
  }
}

// Setting Service
export class SettingService {
  static async getSettings(
    token: string,
  ): Promise<ApiResponse<{ settings: Setting }>> {
    const client = createAuthenticatedApiClient(token);
    return client.get<{ settings: Setting }>('/settings');
  }

  static async updateSettings(
    settingsData: UpdateSettingDto,
    token: string,
  ): Promise<ApiResponse<{ settings: Setting }>> {
    const client = createAuthenticatedApiClient(token);
    return client.patch<{ settings: Setting }>('/settings', settingsData);
  }
}

// Notification Service
export class NotificationService {
  static async getNotifications(
    token: string,
  ): Promise<ApiResponse<{ notifications: Notification[] }>> {
    const client = createAuthenticatedApiClient(token);
    return client.get<{ notifications: Notification[] }>('/notifications');
  }

  static async getNotification(
    id: string,
    token: string,
  ): Promise<ApiResponse<{ notification: Notification }>> {
    const client = createAuthenticatedApiClient(token);
    return client.get<{ notification: Notification }>(`/notifications/${id}`);
  }

  static async createNotification(
    notificationData: CreateNotificationDto,
    token: string,
  ): Promise<ApiResponse<{ notification: Notification }>> {
    const client = createAuthenticatedApiClient(token);
    return client.post<{ notification: Notification }>(
      '/notifications',
      notificationData,
    );
  }

  static async deleteNotification(
    id: string,
    token: string,
  ): Promise<ApiResponse<{ message: string }>> {
    const client = createAuthenticatedApiClient(token);
    return client.delete<{ message: string }>(`/notifications/${id}`);
  }
}

// Image Service
export class ImageService {
  static async uploadImage(
    file: File,
    token?: string,
  ): Promise<ApiResponse<Image>> {
    const formData = new FormData();
    formData.append('file', file);

    if (token) {
      const client = createAuthenticatedApiClient(token);
      return client.post<Image>('/images/upload', formData);
    } else {
      // 인증 없이 업로드 - 기본 API 클라이언트 사용
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000'}/images/upload`,
        {
          method: 'POST',
          body: formData,
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return response.json();
    }
  }

  static async deleteImage(
    id: number,
    token?: string,
  ): Promise<ApiResponse<void>> {
    if (token) {
      const client = createAuthenticatedApiClient(token);
      return client.delete<void>(`/images/${id}`);
    } else {
      // 인증 없이 삭제
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000'}/images/${id}`,
        {
          method: 'DELETE',
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return response.json();
    }
  }
}

// Chat Service
export class ChatService {
  static async getChats(
    token: string,
  ): Promise<ApiResponse<{ chats: Chat[] }>> {
    const client = createAuthenticatedApiClient(token);
    return client.get<{ chats: Chat[] }>('/chats');
  }

  static async getChat(
    id: string,
    token: string,
  ): Promise<ApiResponse<{ chat: Chat }>> {
    const client = createAuthenticatedApiClient(token);
    return client.get<{ chat: Chat }>(`/chats/${id}`);
  }

  static async deleteChat(
    id: string,
    token: string,
  ): Promise<ApiResponse<{ message: string }>> {
    const client = createAuthenticatedApiClient(token);
    return client.delete<{ message: string }>(`/chats/${id}`);
  }
}

export class TagService {
  static async getTags(
    token: string,
  ): Promise<ApiResponse<{ tags: Tag[] }>> {
    const client = createAuthenticatedApiClient(token);
    return client.get<{ tags: Tag[] }>('/tags');
  }

  static async addTag(
    tag: Tag,
    token: string,
  ): Promise<ApiResponse<{ tag: Tag }>> {
    const client = createAuthenticatedApiClient(token);
    return client.post<{ tag: Tag }>('/tags', tag);
  }

  static async deleteTag(
    id: number,
    token: string,
  ): Promise<ApiResponse<{ message: string }>> {
    const client = createAuthenticatedApiClient(token);
    return client.delete<{ message: string }>(`/tags/${id}`);
  }
}

