### How to Run:
1. Make sure you have node installed
2. Run `npm install`
3. Run `node index.js`
4. Go to `localhost:3000/`

### Run Docker Image
- Build a image: `docker build --pull --rm -f "Dockerfile" -t mustang:V1 "."`
- Run the image: `docker run --rm -d  -p 3000:3000/tcp mustang:V1` 



### Documentation 
App will respond with a JSON object that contains the dates you should buy and sell gold in the last 5 years to get the higher profit and also will show you the profit you would obtain in USD.  