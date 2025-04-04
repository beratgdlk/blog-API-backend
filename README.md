# Blog API Backend

A RESTful backend API for managing blog categories, posts, comments, and tags, built with TypeScript, Express.js, PostgreSQL, and Prisma ORM.

## 🛠 Technologies Used

- **TypeScript**
- **Express.js** (Web framework)
- **PostgreSQL** (Database)
- **Prisma** (ORM)
- **DBeaver** (Database GUI Management)
- **Postman** (API testing and documentation)

## 📌 Features

- CRUD operations for:
  - Categories
  - Posts
  - Comments
  - Tags
- Post-Tag relationships
- Soft delete functionality
- Advanced filtering via query parameters (including tag filtering)
- Publish/unpublish posts
- Post statistics
- Popular tags
- Structured endpoints
- Clear and organized folder structure

## 🚀 API Endpoints

### Categories

| Method | Endpoint          | Description          |
| ------ | ----------------- | -------------------- |
| POST   | `/categories`     | Create category      |
| GET    | `/categories`     | List categories      |
| GET    | `/categories/stats` | Get category statistics |
| GET    | `/categories/:id` | Get category details |
| PATCH  | `/categories/:id` | Update category      |
| DELETE | `/categories/:id` | Soft delete category |

**Filter Examples:**

- Get all including soft-deleted:
  ```
  GET /categories?showDeleted=true
  ```
- Show only deleted:
  ```
  GET /categories?showDeleted=onlyDeleted
  ```

### Posts

| Method | Endpoint                | Description               |
| ------ | ----------------------- | ------------------------- |
| POST   | `/posts`                | Create post               |
| GET    | `/posts`                | List posts                |
| GET    | `/posts/stats`          | Get post statistics       |
| GET    | `/posts/:id`            | Get post details          |
| PATCH  | `/posts/:id`            | Update post               |
| DELETE | `/posts/:id`            | Soft delete post          |
| PATCH  | `/posts/:id/publish`    | Publish a post            |
| PATCH  | `/posts/:id/unpublish`  | Unpublish a post          |
| POST   | `/posts/:postId/tags/:tagId` | Add a tag to a post  |
| DELETE | `/posts/:postId/tags/:tagId` | Remove a tag from a post |

**Filter Examples:**

- Filter by category:
  ```
  GET /posts?categoryId=4
  ```
- Filter by publish status:
  ```
  GET /posts?published=true
  ```
- Filter by tags:
  ```
  GET /posts?tags=1,2,4
  ```

### Comments

| Method | Endpoint                | Description                |
| ------ | ----------------------- | -------------------------- |
| POST   | `/comments`             | Create comment             |
| GET    | `/comments`             | List comments              |
| GET    | `/comments/stats`       | Get comment statistics     |
| GET    | `/comments/:id`         | Get comment details        |
| GET    | `/comments/post/:postId` | Get comments for a post   |
| PATCH  | `/comments/:id`         | Update comment             |
| DELETE | `/comments/:id`         | Delete comment             |

**Filter Examples:**

- Comments for a specific post:
  ```
  GET /comments?postId=10
  ```
- Comments by a specific commenter:
  ```
  GET /comments?commenterName=John
  ```

### Tags

| Method | Endpoint          | Description          |
| ------ | ----------------- | -------------------- |
| POST   | `/tags`           | Create tag           |
| GET    | `/tags`           | List tags            |
| GET    | `/tags/stats`     | Get tag statistics   |
| GET    | `/tags/popular`   | Get popular tags     |
| GET    | `/tags/:id`       | Get tag details      |
| GET    | `/tags/:id/posts` | List posts by tag    |
| PATCH  | `/tags/:id`       | Update tag           |
| DELETE | `/tags/:id`       | Delete tag           |

## 🗃 Database Schema

### Categories

- `id`
- `name`
- `created_at`
- `deleted_at` *(nullable)*

### Posts

- `id`
- `category_id` *(FK)*
- `title`
- `content`
- `created_at`
- `published_at` *(nullable)*
- `deleted_at` *(nullable)*

### Comments

- `id`
- `post_id` *(FK)*
- `content`
- `commenter_name`
- `created_at`

### Tags

- `id`
- `name` *(unique)*
- `description` *(nullable)*
- `created_at`

### PostTags (Post-Tag Relationship)

- `id`
- `post_id` *(FK)*
- `tag_id` *(FK)*
- `created_at`

## 🛢 Database Management

- Managed and tested using **DBeaver** for efficiency and clarity in database operations.

## 🌐 API Testing and Documentation

- API thoroughly tested and documented using **Postman**.
- Postman Collection available in the root directory (`postman_collection.json`).
- API documentation available in `API-DOCS.md`

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/beratgdlk/blog-API-backend
cd blog-api
npm install
```

Configure your environment variables in `.env`:

```env
DATABASE_URL=your_postgresql_connection_url
PORT=your_preferred_port
```

Run migrations:

```bash
npx prisma migrate dev
```

Start the server:

```bash
npm run dev
```

## 📝 Development & Contribution

- Commit regularly to track development clearly.
- Use meaningful commit messages describing implemented features or fixes.

## 📌 GitHub Repository

You can view and contribute to the project [here](https://github.com/beratgdlk/blog-API-backend).

## 📧 Contact

For any questions or suggestions, feel free to reach out via [beratgdlk@gmail.com](mailto\:beratgdlk@gmail.com).


