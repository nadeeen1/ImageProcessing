##### Udacity Full stack Image processing API project #####

This project was created using the typescript programming language to serve as an Image processing engine. The endpoint created has 2 functions:
```bash
1. Resizes an image by receiving the image filename and dimesnions as user inputs in the URL parameters
2. Retrieves a previously processed image from a 'cache' folder - named processedImages
```

##### URL for processing an image / retrieving image from cache #####
```bash
localhost:3000/api/images/?filename={filename}&height={height}&width={width}
```
** port number is set to 3000
##### Syntax for processing an image / retrieving image from cache #####
1. Filename is the exact image name which is stored in the 'Images' folder
2. Height & width are the numerical image dimensions

##### As mentioned, the functionality of the project includes: ####
1. Processing an image and returning it to the user if it hasn't been previously processed
2. Displaying the image to the user from the cache if it has already been processed before with the desired dimesnions [i.e the image isnt re-processed]
3. Re-processes the image if the user requests the image with different dimensions

##### Scripts to run the project ######
```bash
To build the project into javascript: npm run build
```
```bash
To run eslint and fix all auto-fixable problems: npm run lint
```
```bash
To run prettier: npm run format
```
```bash
To start the server: npm run start or node build/.
```
```bash
To run jasmine tests: npm run jasmine
```

### important note ###
After building the project, jamsine tests should be run before testing the endpoint in the browser as several unit tests are based on the status code returned. If the image is being processed for the first time the status code returned will be 200, while if it was retrieved from the cache the status code will be 304. Testing the endpoint in the browser before running the unit tests will cause some conflicts.

## Author

Nadin Hassan (https://github.com/nadeeen1)