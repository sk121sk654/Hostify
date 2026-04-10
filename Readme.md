# 🏠 Hostify

**Hostify** is a full-stack Airbnb-inspired web application that allows users to list, explore, and book accommodations with secure authentication and a seamless user experience.

---

## 🚀 Features

- 🔐 **User Authentication** — Secure sign up, login, and logout using Passport.js (Local Strategy)
- 🏡 **Listing Management** — Create, edit, and delete property listings
- 📸 **Image Upload** — Upload property images via Cloudinary
- 💬 **Flash Messages** — User-friendly success and error notifications
- 🔎 **Explore Listings** — Browse all available accommodations
- 🛡️ **Authorization** — Only listing owners can edit or delete their properties
- ✅ **Input Validation** — Server-side validation using Joi
- 📦 **Session Management** — Persistent sessions stored in MongoDB via connect-mongo

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Backend** | Node.js, Express.js |
| **Templating** | EJS, EJS-Mate |
| **Database** | MongoDB, Mongoose |
| **Authentication** | Passport.js, passport-local, passport-local-mongoose |
| **Image Storage** | Cloudinary, Multer |
| **Session Store** | connect-mongo, express-session |
| **Validation** | Joi |
| **Styling** | CSS |
| **Utilities** | dotenv, connect-flash, method-override, cookie-parser |

---

## 📁 Project Structure

```
Hostify/
├── controllers/        # Route handler logic
├── init/               # Database seed/init scripts
├── models/             # Mongoose schemas (User, Listing, etc.)
├── public/             # Static assets (CSS, JS, images)
├── routes/             # Express route definitions
├── utils/              # Helper utilities (error handling, etc.)
├── views/              # EJS templates
├── app.js              # Main application entry point
├── cloudConfig.js      # Cloudinary configuration
├── middleware.js       # Custom middleware
├── schema.js           # Joi validation schemas
└── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Cloudinary account

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/sk121sk654/Hostify.git
   cd Hostify
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   ATLASDB_URL=your_mongodb_connection_string
   SECRET=your_session_secret
   CLOUD_NAME=your_cloudinary_cloud_name
   CLOUD_API_KEY=your_cloudinary_api_key
   CLOUD_API_SECRET=your_cloudinary_api_secret
   ```

4. **(Optional) Seed the database**

   ```bash
   node init/index.js
   ```

5. **Start the application**

   ```bash
   node app.js
   ```

6. Open your browser and navigate to `http://localhost:8080`

---

## 🔑 Environment Variables

| Variable | Description |
|---|---|
| `ATLASDB_URL` | MongoDB connection string |
| `SECRET` | Session secret key |
| `CLOUD_NAME` | Cloudinary cloud name |
| `CLOUD_API_KEY` | Cloudinary API key |
| `CLOUD_API_SECRET` | Cloudinary API secret |

---

## 📸 Key Functionalities

- **Register/Login** — Users can create accounts and log in securely
- **Create Listing** — Authenticated users can post new accommodations with images
- **Edit/Delete Listing** — Only the owner of a listing can modify or remove it
- **View All Listings** — Anyone can browse all available properties
- **Flash Notifications** — Instant feedback on user actions

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repo and submit a pull request.

1. Fork the project
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 👨‍💻 Author

**sk121sk654** — [GitHub Profile](https://github.com/sk121sk654)

---

> Built with ❤️ using Node.js, Express, and MongoDB