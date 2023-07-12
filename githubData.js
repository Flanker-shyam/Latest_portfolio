const fetch = require('node-fetch')
require('dotenv').config();

// GitHub GraphQL API endpoint
const endpoint = 'https://api.github.com/graphql';

// Your GitHub Personal Access Token
const accessToken = process.env.GITHUB_ACCESS_TOKEN;

// GraphQL query to retrieve pinned repositories
const query = `
  query {
    user(login: "Flanker-shyam") {
      pinnedItems(first: 5, types: REPOSITORY) {
        edges {
          node {
            ... on Repository {
              name
              description
              url
            }
          }
        }
      }
    }
  }
`;

// Define the request headers including the Authorization header
const headers = {
  'Authorization': `Bearer ${accessToken}`,
  'Content-Type': 'application/json'
};

async function getRepoData(arr1)
{
    let fordata=[];
    for(let name1 of arr1){
        let dataHere={};
        let res = await fetch('https://api.github.com/repos/Flanker-shyam/'+name1);
        let out = await res.json();
        dataHere.name = out.name;
        dataHere.description = out.description;
        dataHere.stargazers_count = out.stargazers_count;
        dataHere.topics = out.topics;
        dataHere.forks = out.forks;
        dataHere.html_url = out.html_url;
        fordata.push(dataHere);
    }
    return fordata;
}

const getUserRepoName = async ()=>
{
    let arr=[];
    // Construct the POST request body
    const body = JSON.stringify({ query });

    // Send the POST request to the GitHub GraphQL API
    await fetch(endpoint, {
    method: 'POST',
    headers,
    body
    })
    .then(response => response.json())
    .then(data => {
        // Extract the pinned repositories from the response
        const pinnedRepos = data.data.user.pinnedItems.edges.map(edge => edge.node);
        
        // Display the repository information
        pinnedRepos.forEach(repo => {
            arr.push(repo.name);
        });
    })
    .catch(error => {
        console.error('Error fetching pinned repositories:', error);
    });
    let ans = await getRepoData(arr);
    // console.log(ans);
    return ans;
}


getUserRepoName();
module.exports = getUserRepoName;