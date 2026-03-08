export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImageUrl: string;
  coverImagePath: string;
  author: string;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
}

export interface BlogListItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImageUrl: string;
  author: string;
  createdAt: string;
}

export interface CreateBlogResponse {
  message: string;
  id: string;
  blog: Blog;
}

export interface MessageResponse {
  message: string;
}
