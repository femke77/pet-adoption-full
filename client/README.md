# Pet Adoption - Client
  

   ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white) ![HeadlessUI](https://img.shields.io/badge/Headless%20UI-66E3FF.svg?style=for-the-badge&logo=Headless-UI&logoColor=black) ![netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white) ![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)
  
  ## Description  ✏️
  
  Match users with the pet of their dreams. 

  CURRENTLY NOT WORKING WITH IOS DUE TO THIRD PARTY COOKIES AND ITP. IF YOU FAVORITE A PET YOU WILL GET TOLD YOUR SESSION IS EXPIRED. FIX IS COMING. 

  This application uses session authentication with an axios response interceptor to redirect the user to login if session expires, but rolling is set to true with express-sessions so user should stay logged in until 5 min of inactivity.

  React query handles state from server such as pet data. Auth status and user details client state is handled by Redux Toolkit. User details are encrypted and stored in sessionStorage for persistance across reloads. 

  Client built with TailwindCSS and Headless UI for React.

  Routing is done with React Router Dom.

  A husky pre-commit hook is linting my staged files to ensure good code uniformity with prettier rules. 

  I prefer headless architecture so this is only the client side. The server is located at https://github.com/femke77/pet-adoption-server
  
  ## Table of Contents 📖
  
  [Installation](#installation)

  [Usage](#usage)

  

  [Issues](#known-issues)

  [Contributing](#how-to-contribute)

  [Tests](#tests) 

  [Credits](#credits)

  [Questions](#questions)
  
  ## Installation 
  
  To install necessary dependencies, run the following command:
  
  ```
  npm i
  ```
  
  ## Usage 
  
  Clone the repository, run the install command and then 'npm run dev'. Then navigate to the localhost port.

  ### Deployed Link
  

### Screenshots
![ss1](./src/assets/images/homepage.png)

![ss2](./src/assets/images/adoptpage.png)

______________________________________________________________________________________



## Known Issues 

- Pet data usually won't match pet image. I used fakerjs to generate fake data, and the point of this project is the coding, not the fake data.
- Again due to limits on time with fake data, I am not concerned with ages of kittens and puppies.

## How To Contribute 
  
Fork the repository and make a pull request with your new code.
  
## Tests 
  
To run tests, run the following command:
  
  ```
  npm test
  ```


## Credits 

Images of cats & dogs together by [Vecteezy.com](https://www.vecteezy.com/)<br/>
Thanks to [Lucky Dog Animal Rescue](https://www.luckydoganimalrescue.org/) for providing site content and loose specs for this project. <br/>
Custom fonts from [dafont.com](https://www.dafont.com/)

 ## Questions 
  
 If you have any questions about the repo or notice any bugs you want to report, open an issue or contact me directly at megan.meyers.388@gmail.com. 
  
  