# Getting Started

This project is my journey through the sample application of React Hooks in Action by Manning Publications, and demonstrates several facets of using the various built in React Hooks instead of using class based components.  Along the way, my project will definitely be deviating from the React Hooks in Action sample, in order to make it my own, as I experiment with different ways to structure and encapsulate logic in the application better, and work with an existing UI library like Material UI to provide the user interface components.

Both of these choices serve to deviate the application from its origins, and force me to go "off script" a bit as I work.  They also more accurately represent the choices I would be likely to make in developing my own applications, helping me understand the effects of those choices more fully.

To that end, this project is an example of using the following libraries in a single React application:

* **@material-ui/core** - Main UI components.
* **@material-ui/icons** - Main UI icons library.
* **@material-ui/lab** - Skeleton UI components used during second tier loading.
* **react-error-boundary** - Common error boundary library for defining generic fallbacks quickly.
* **react-hook-form** - Full featured form and form controller library with validation support.
* **react-query** - Dedicated library for data fetching, caching, and mutations.
* **react-router** - Path based routing solution.
* **react-router-dom** - Path based routing solution.

This product also uses **luxon** for date and time handling.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn start-backend`

Runs the sample backend for the database.\
Open [http://localhost:3001](http://localhost:3001) to view it in the browser or otherwise make API requests to it.

This will read from and modify the db.json file in the root of this project as a datastore.

To better experience the "loading" behaviors of this app, you can append --delay <ms> to introduce a fixed time delay for the backend.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
