# Blog API Documentation

This project is a blog API developed using Prisma ORM. The API is built with MVC architecture and service layer pattern.

## Endpoints

### Categories

| Method | URL | Description |
| ----- | --- | -------- |
| GET | /api/categories | List all categories |
| GET | /api/categories/stats | Get category statistics |
| GET | /api/categories/:id | Get category by ID |
| POST | /api/categories | Create a new category |
| PATCH | /api/categories/:id | Update a category |
| DELETE | /api/categories/:id | Delete a category (soft delete) |

### Posts

| Method | URL | Description |
| ----- | --- | -------- |
| GET | /api/posts | List all posts |
| GET | /api/posts/stats | Get post statistics |
| GET | /api/posts/:id | Get post by ID |
| POST | /api/posts | Create a new post |
| PATCH | /api/posts/:id | Update a post |
| DELETE | /api/posts/:id | Delete a post (soft delete) |
| PATCH | /api/posts/:id/publish | Publish a post |
| PATCH | /api/posts/:id/unpublish | Unpublish a post |
| POST | /api/posts/:postId/tags/:tagId | Add a tag to a post |
| DELETE | /api/posts/:postId/tags/:tagId | Remove a tag from a post |

### Comments

| Method | URL | Description |
| ----- | --- | -------- |
| GET | /api/comments | List all comments |
| GET | /api/comments/stats | Get comment statistics |
| GET | /api/comments/:id | Get comment by ID |
| GET | /api/comments/post/:postId | Get comments for a post |
| POST | /api/comments | Create a new comment |
| PATCH | /api/comments/:id | Update a comment |
| DELETE | /api/comments/:id | Delete a comment |

### Tags

| Method | URL | Description |
| ----- | --- | -------- |
| GET | /api/tags | List all tags |
| GET | /api/tags/stats | Get tag statistics |
| GET | /api/tags/popular | Get most popular tags |
| GET | /api/tags/:id | Get tag by ID |
| GET | /api/tags/:id/posts | List posts by tag |
| POST | /api/tags | Create a new tag |
| PATCH | /api/tags/:id | Update a tag |
| DELETE | /api/tags/:id | Delete a tag |

## Filtering and Sorting

### Posts

- `?categoryId=1`: Filter posts by category
- `?published=true`: Filter published posts
- `?published=false`: Filter unpublished posts
- `?tags=1`: Filter posts with tag ID 1
- `?tags=1,2,4`: Filter posts with tag IDs 1, 2, or 4

### Comments

- `?postId=1`: Filter comments by post
- `?commenterName=John`: Filter comments by commenter name

### Categories

- `?showDeleted=true`: Include deleted categories
- `?showDeleted=onlyDeleted`: Show only deleted categories

## Models

### Category
- id: number
- name: string
- created_at: Date
- deleted_at: Date (for soft delete)
- posts: Post[]

### Post
- id: number
- category_id: number (optional)
- title: string
- content: string
- created_at: Date
- published_at: Date (optional)
- deleted_at: Date (for soft delete)
- comments: Comment[]
- categories: Category
- postTags: PostTag[]

### Comment
- id: number
- post_id: number
- content: string
- commenter_name: string
- created_at: Date
- posts: Post

### Tag
- id: number
- name: string (unique)
- description: string (optional)
- created_at: Date
- postTags: PostTag[]

### PostTag (Post-Tag Relationship)
- id: number
- post_id: number
- tag_id: number
- created_at: Date
- post: Post
- tag: Tag 