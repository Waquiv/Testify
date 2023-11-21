const video = document.querySelector('#video')
const main = document.querySelector('.face-show')
const containerWidth = video.parentElement.clientWidth; // Get container width
const containerHeight = video.parentElement.clientHeight;
const button=document.querySelector(".click");
const expressionsArray=[];

let maxExpressionCount = 20;
let detected;
let isShutter=false;
let dependencies=false;
let inter;
let canvas;
let displaySize;


const sad = [
    {
      artist: 'Mitski',
      uri: 'spotify:track:3pANfZVFdtuVnJsE6xa5Ox'
    },
    {
      artist: 'Kurt Cobain',
      uri: 'spotify:track:7x4b0UccXSKBWxWmjcrG2T'
    },
    {
      artist: 'Deftones',
      uri: 'spotify:track:4HpIh5wWfkq5sSuCLLSwYR'
    },
    {
      artist: 'Elliott Smith',
      uri: 'spotify:track:4zetUxeSCCDwrr1jJT0SuD'
    }
  ];
const angry = [
    {
      artist: 'Deftones',
      uri: 'spotify:track:1158ckiB5S4cpsdYHDB9IF'
    },
    {
      artist: 'Necromorphic Despair',
      uri: 'spotify:track:7sMP2BG7I4qXYH5hocL0gv'
    },
    {
      artist: 'Slipknot',
      uri: 'spotify:track:0Y2i84QWPFiFHQfEQDgHya'
    },
    {
      artist: 'Pantera',
      uri: 'spotify:track:7fcfNW0XxTWlwVlftzfDOR'
    },
    {
      artist: 'Mudvayne',
      uri: 'spotify:track:7vrLphPq4yjaX7jiDdd2Nc'
    },
    {
      artist: 'My Chemical Romance',
      uri: 'spotify:track:7j31rVgGX9Q2blT92VBEA0'
    },
    {
      artist: 'Imagine Dragons',
      uri: 'spotify:track:1r9xUipOqoNwggBpENDsvJ'
    },
    {
      artist: 'Disturbed',
      uri: 'spotify:track:4ImIJRZNJhNQLLdUFSYJoS'
    },
    {
      artist: 'Drowning Pool',
      uri: 'spotify:track:7CpbhqKUedOIrcvc94p60Y'
    },
    {
      artist: 'Billy Talent',
      uri: 'spotify:track:6l78mUZ86r0NrfRgni0LuM'
    }
  ];
const happy = [
    {
      artist: 'The Cure',
      uri: 'spotify:track:4QlzkaRHtU8gAdwqjWmO8n'
    },
    {
      artist: 'Coldplay',
      uri: 'spotify:track:1mea3bSkSGXuIRvnydlB5b'
    },
    {
      artist: 'The 1975',
      uri: 'spotify:track:12g9IeQzX7xECLNxz8dpb5'
    },
    {
      artist: 'Harry Styles',
      uri: 'spotify:track:6UelLqGlWMcVH1E5c4H7lY'
    },
    {
      artist: 'Taylor Swift',
      uri: 'spotify:track:0cqRj7pUJDkTCEsJkx8snD'
    },
    {
      artist: 'Pharrell Williams',
      uri: 'spotify:track:60nZcImufyMA1MKQY3dcCH'
    },
    {
      artist: 'B.J. Thomas',
      uri: 'spotify:track:7a9uRVfAZn74qHOFbQEiHN'
    },
    {
      artist: 'The Crew Cuts',
      uri: 'spotify:track:7G2jAmiYUDZKyk7npVrgX8'
    },
    {
      artist: '5 Seconds of Summer',
      uri: 'spotify:track:1CQ2cMfrmFM1YdfmjENKVE'
    },
    {
      artist: 'Harry Styles',
      uri: 'spotify:track:3jjujdWJ72nww5eGnfs2E7'
    },
    // More songs can be added here
  ];
const surprised = [
    {
      artist: 'Wowkie Da',
      uri: 'spotify:track:4VYv4gIbr6XPWKTddnGBlh'
    },
    {
      artist: 'The Beatles',
      uri: 'spotify:track:6dGnYIeXmHdcikdzNNDMm2'
    },
    {
      artist: 'Kanye West',
      uri: 'spotify:track:19a3JfW8BQwqHWUMbcqSx8'
    },
    {
      artist: 'Kavinsky',
      uri: 'spotify:track:0U0ldCRmgCqhVvD6ksG63j'
    },
    {
      artist: 'Bo Burnham',
      uri: 'spotify:track:0Kdj7nwaYQmvhxnqZaIQuW'
    }
  ];
const fearful = [
    {
      artist: 'Loathe',
      uri: 'spotify:track:06l8eDJb6lK9goc7xceMHV'
    },
    {
      artist: 'Kurt Cobain',
      uri: 'spotify:track:4le6DvrwMv2rpyN1SPeL0g'
    },
    {
      artist: 'Have A Nice Life',
      uri: 'spotify:track:34dkZZNQJzEJRqPkywYmEY'
    },
    {
      artist: 'Will and the Tapeworms',
      uri: 'spotify:track:1788x4xlNC5GiIgLYglxMW'
    },
    {
      artist: 'bo en',
      uri: 'spotify:track:0wZUJxxybEiafs0BIg9SAP'
    }
  ];


Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('./models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models')
]).then(()=>{
    dependencies=true
    console.log("loaded"+dependencies);})