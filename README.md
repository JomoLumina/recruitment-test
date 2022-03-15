### Update

To start the application use
##### `npm start`


We have provided for you a mocked out version of an endpoints for a posts, comments and users.

An example API call looks as follows:
```javascript
import { getPosts } from './data';

getPosts().then((posts) => {
  console.log(posts);
});
```
__Note!__ _The delay between calling API and
receiving an answer is random, meaning you cannot assume that calls will respond in the same order they were called. This is to simulate
variance in response time of real server requests._

All API mocks can be found in [this file.](./src/data/index.js)

## Your task
- Write a solution which allows for the efficient rendering of (using screens or tabs):
  - Comments by Post (authors name displayed with comment)
    - e.g. Select post and list comments with Author names
  - Posts by Author (authors name displayed)
    - e.g. List all posts by selected Author
  - Comments by Author
    - e.g. List all comments by selected Author alongside the post title the comment belongs to
- Focus on performance and efficiency
- Suitable for production

# Happy coding!
