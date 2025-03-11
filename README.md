# Project Setup Instructions

## Prerequisites

Ensure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [npm](https://www.npmjs.com/) (version 6.x or higher)
- [Git](https://git-scm.com/)

## Clone the Repository

Clone the project repository from GitHub:

```bash
git clone https://github.com/ICS611-Group5/Group5.git
cd group5
```

## Install Dependencies for Backend

Open a terminal and navigate to the Backend project directory and install the required dependencies:
From the root directory of the project, navigate to the `Backend` directory:

```bash
cd Backend
npm install
```


Open a second terminal and navigate to the Client project directory and install the required dependencies:

```bash
cd Client
npm install
```

## Environment Variables

Create a `.env` file in the `Backend` directory and add your MongoDB Cluster connection string:

Should be in this format...(this is NOT a real connection string)

```plaintext
MONGODB_URI=mongodb+srv://shawnjones:nicdsoi;vn;iosadniovndsianv.duv6r.mongodb.net/?retryWrites=true&w=majority&appName=ClusterG5
```
For Access to the G5 Cluster please message: shawn.jonze@gmail.com

## Run the Development Server

Start the Backend development server, from the terminal in the `Backend` directory:

```
node index.js
```
The application should now be running at `http://localhost:5001`.


Start the Client development server, from the terminal in the `Client` directory:

```
npm run dev
```

The application should now be running at `http://localhost:5001`.

## Build for Production

To build the project for production, run:

```
npm run build
```

The production-ready files will be in the `dist` directory.

## Additional Notes

- Ensure you have a `.gitignore` file to exclude unnecessary files from the repository.
- If you encounter any issues, please refer to the project's documentation or contact the project maintainer.

## Contributing



---

