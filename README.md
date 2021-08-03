# React Bookings Application

This project is my journey through the sample application of React Hooks in Action by Manning Publications, and demonstrates several facets of using the various built in React Hooks instead of using class based components.  Along the way, my project will definitely be deviating from the React Hooks in Action sample, in order to make it my own, as I experiment with different ways to structure and encapsulate logic in the application better, and work with an existing UI library like Material UI to provide the user interface components.

Both of these choices serve to deviate the application from its origins, and force me to go "off script" a bit as I work.  They also more accurately represent the choices I would be likely to make in developing my own applications, helping me understand the effects of those choices more fully.

To that end, this project is an example of using the following libraries in a single React application:

* [**material-ui**](https://material-ui.com) - Main UI components and icons.  This project uses the core library, the icons library, and the labs library (for skeleton wave loading displays on the booking grid).
* [**react-error-boundary**](https://github.com/bvaughn/react-error-boundary) - Common error boundary library for defining generic fallbacks quickly.
* [**react-hook-form**](https://react-hook-form.com) - Full featured form and form controller library with validation support.
* [**react-query**](https://react-query.tanstack.com) - Dedicated library for data fetching, caching, and mutations.
* [**react-router**](https://reactrouter.com) - Path based routing solution.  This project uses the version 6 beta release.

This project also uses **luxon** for date and time handling.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Structure

The core of the application is contained in the src and public folders.  The public folder contains all of the skeleton HTML pages that load the react application when it is requested by the brower at runtime.

The src folder contains the corresponding index.js script that will be loaded by the HTML page, rendering the main application component to the DOM, as well as some static data, and the components folder.  Components are divided by feature, and generally follow the following naming convention:

* Components are contained in files using the convention MyComponentName.js.
* Components are default exported from their corresponding file.
* Hooks are contained in files using the convention useMyHookName.js.
* Hooks are default exported from their corresponding file.
* Components that end with the word "Page" are exported via the index.js file in each subfolder, with very few exceptions (UserProvider component is exported from Users/index.js).
* Exports from non index.js files are typically "default" only, with very few exceptions (contexts are exported non-default from Users/useUser).
* Dependencies between components always reference the default export from the file where the component is defined for internal components.
* The App component always uses the index to get the top level exports for the feature.

## Available Scripts

This project uses Yarn for its build process and scripts.  It may work with npm, but this is not tested.

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
