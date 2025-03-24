# Blog API Backend

A RESTful backend API for managing blog categories, posts, and comments, built with TypeScript, Express.js, PostgreSQL, and Knex.js.

## 🛠 Technologies Used

- **TypeScript**
- **Express.js** (Web framework)
- **PostgreSQL** (Database)
- **Knex.js** (SQL Query Builder)
- **DBeaver** (Database GUI Management)
- **Postman** (API testing and documentation)

## 📌 Features

- CRUD operations for:
  - Categories
  - Posts
  - Comments
- Soft delete functionality
- Filtering via query parameters
- Structured endpoints
- Clear and organized folder structure


## 🚀 API Endpoints

### Categories

| Method | Endpoint          | Description          |
| ------ | ----------------- | -------------------- |
| POST   | `/categories`     | Create category      |
| GET    | `/categories`     | List categories      |
| GET    | `/categories/:id` | Get category details |
| PATCH  | `/categories/:id` | Update category      |
| DELETE | `/categories/:id` | Soft delete category |

**Filter Examples:**

- Get all including soft-deleted:
  ```
  GET /categories?showDeleted=true
  ```

### Posts

| Method | Endpoint     | Description      |
| ------ | ------------ | ---------------- |
| POST   | `/posts`     | Create post      |
| GET    | `/posts`     | List posts       |
| GET    | `/posts/:id` | Get post details |
| PATCH  | `/posts/:id` | Update post      |
| DELETE | `/posts/:id` | Soft delete post |

**Filter Examples:**

- Filter by category and status:

  ```
  GET /posts?category=4&status=draft
  ```

- Show only deleted:

  ```
  GET /posts?showDeleted=onlyDeleted
  ```

### Comments

| Method | Endpoint        | Description                |
| ------ | --------------- | -------------------------- |
| POST   | `/comments`     | Create comment             |
| GET    | `/comments`     | List comments              |
| GET    | `/comments/:id` | Get comment details        |
| PATCH  | `/comments/:id` | Update comment             |
| DELETE | `/comments/:id` | Delete comment permanently |

**Filter Examples:**

- Comments for a specific post:

  ```
  GET /comments?post=10
  ```

- Comments by a specific commenter:

  ```
  GET /comments?commenter=John
  ```

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

## 🛢 Database Management

- Managed and tested using **DBeaver** for efficiency and clarity in database operations.

## 🌐 API Testing and Documentation

- API thoroughly tested and documented using **Postman**.
- Postman Collection available in the root directory (`postman_collection.json`).

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
npm run migrate
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


