### FruitsStoreAdminPortal
----------------------------

This is the customer relationship manager website created for technical proof of some concepts using an Angular framework.


### Used libraries
----------------------------
  
  + [material ui library](https://material.angular.io/)
  + [ngrx library](https://www.npmjs.com/package/@ngrx/store)
  + [store-devtools](https://www.npmjs.com/package/@ngrx/store-devtools)
  + [@ngrx/effects](https://www.npmjs.com/package/@ngrx/effects)
  + [flex-layout](https://github.com/angular/flex-layout)
  + [ngx-cookie-service](https://www.npmjs.com/package/ngx-cookie-service)
  + [husky](https://github.com/typicode/husky)
  + [eslint](https://eslint.org/)
  + [prettier](https://prettier.io/)


### Features added to the project:
----------------------------
  + Dark theme.
  + Setup ESLINT with prettier and husky to run ESLINT rules automatically.
  + Implement alias imports.
  + Implement responsiveness using flex-layout.
  + Implement theming using material themes in most components.
  + Add a no internet page when there is no internet connection.
  + Log ngrx statuses to the console.
  + Log http calls to the console.
  + Routing: 
    + add not found page.
    + use guard.
    + use resolver in customer module.
    + use children routes.
  + Implement login using ngrx, effect and cookies.
  + Implement functionality on the customer list [get-add-update-delete].
    + sync data with local storage.
    + Log all changes to the console.
    + after refreshing the project, all data will be reset.
  + Pagination.
  + Implement functionality on the product list [get-add-update-delete] using "ngrx" full cycle:
    + only in the front-end side and using ngrx.
    + use the dev tool to track updates.
    + log all statuses to the console.
    + after refreshing the project, all data will be reset.
  + Create special error messages based on backend error responses.
  + Create a shared file for colors in the project.
  + All icons are from the Material Library.
  + Handle errors globally using http interceptor. 
  + Shared components
    + dialog component
     + get content as template from parent component.	
    + card component
     + get some html content from parent.
     + send events to parent.	
    + loading component
    + snackbar component
    + product form



## Development server
----------------------------
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.
