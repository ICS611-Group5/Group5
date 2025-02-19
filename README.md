# Project Setup Instructions

## Prerequisites

Ensure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/) (version 14.x or higher)
- [npm](https://www.npmjs.com/) (version 6.x or higher)
- [Git](https://git-scm.com/)

## Clone the Repository

Clone the project repository from GitHub:

```bash
git clone https://github.com/sjones138/Group5.git
cd group5
```

## Install Dependencies

Navigate to the project directory and install the required dependencies:

```bash
cd Client
npm install
```

## Environment Variables

Create a `.env` file in the `Backend` directory and add your MongoDB Cluster connection string:

Should be in this format...(this is NOT a real connection string)
for access to G5 Cluster please message seanjonze@gmail.com
```plaintext
MONGODB_URI=mongodb+srv://shawnjones:nicdsoi;vn;iosadniovndsianv jknds```

## Run the Development Server

Start the development server:

```bash
npm run dev
```

The application should now be running at `http://localhost:3000`.

## Linting and Formatting

To lint and format the code, run:

```bash
npm run lint
npm run format
```

## Build for Production

To build the project for production, run:

```bash
npm run build
```

The production-ready files will be in the `dist` directory.

## Additional Notes

- Ensure you have a `.gitignore` file to exclude unnecessary files from the repository.
- If you encounter any issues, please refer to the project's documentation or contact the project maintainer.

## Contributing

Please follow the [contribution guidelines](CONTRIBUTING.md) when submitting pull requests.

---

