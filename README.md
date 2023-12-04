## Welcome

Hello, this is a project made for Web System and Technologies. This is a mock store website that features a seamless experience of purchasing clothes.
The goal of this project is to provide users and customers valuable insight on how an online store such as this works inside and out.

## Getting Started

Please have nodejs installed on your PC before cloning this project!

Run and install the required packages first using:
```bash
npm install
```

After installing the packages, you can run a local development server using one of the commands below.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Additional Setup

After integrating Firebase into our project, some of the functions will currently not work. You need to setup your own firebase config to get it up and working.

### Steps

1. Make a new file inside the `src\app\scripts` folder and name it `firebase.js`
2. Copy the code below into the newly created file.

```bash
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {...};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app)
```

3. Go to https://console.firebase.google.com/u/1/project/silkroad-apparel/
4. Find the gear icon on the top left.
5. Go to project settings and then scroll down.
6. You should see SDK Setup and configuration, set it to npm.
7. Copy the content inside `const firebaseConfig` and paste it inside your Firebase config. 


After adding these lines to the firebase.js file, you are all set.

## Notes

If you encounter any problems during install or running the development server, please contact your leader (me).

*This is made by TIP Students for Web System and Technologies SY 2023 First Semester*