
const fetch = require('node-fetch')
const user = 'Flanker-shyam'

const getUserRepoName = async (url)=>
{
    let arr=[];
    let response = await fetch(url);
    let result = await response.json();
    result.forEach((data)=>{
        if(data.stargazers_count>=2)
        {
            arr.push(data.name);
        }
    })
    var ans = await getRepoData(arr);
    return ans;
}


async function getRepoData(arr1)
{
    var fordata=[];
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

module.exports = getUserRepoName;