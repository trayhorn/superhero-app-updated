# 🦸‍♂️ Superhero Web App

A sleek and simple web application for managing superheroes. Users can **view**, **edit**, **upload** and **delete** superhero information in a modern interface.

---

## 🚀 Tech Stack

- ⚛️ **React** (with TypeScript)
- 🧭 **React Router**
- 🎨 **CSS Modules**
- 📡 **Axios**
- 🛠️ **Express.js** (Backend)
- 🍃 **MongoDB** (Database)

---

## 🛠️ How to Run the App

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-repo/superhero-app.git
   cd superhero-app
2. **Install dependencies**
   ```
   npm install
   ```
3. **Start the development servers**
  Open two terminals: one in the /server and another in /client folders.
   ```
   npm run dev
   ```
## ⚙️ Functionality
🔹 View all superheroes
Visit /superheroes to browse the complete list of your heroes.

🔹 View hero details
Click on any hero to view their full profile at /superheroes/:id.

🔹 Add a new superhero
Click the "Create Hero" button on the /superheroes page.
All fields except the image input are required.
If no image is uploaded, a default placeholder will be used.

🔹 Edit a superhero
On a hero's detail page (/superheroes/:id), click "Edit" to update any information, including uploading new images.

🔹 Delete a superhero
Hover over a hero card on the main list, then click the 🗑️ Delete icon in the top right corner to remove them from your collection.
