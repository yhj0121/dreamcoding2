let tweets = [
  {
    id: '1',
    text: '드림코더분들 화이팅!',
    createdAt: Date.now().toString(),
    name: 'Bob',
    username: 'bob',
    url: 'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
  },
  {
    id: '2',
    text: '안뇽!',
    createdAt: Date.now().toString(),
    name: 'Ellie',
    username: 'ellie',
  },
];

export async function getAllTweets()
{
    return tweets;

}

export async function getAllTweetByUsername(username)
{
  return tweets.filter((tweet) => tweet.username === username);
}

export async function getTweetById(id)
{
  return  tweets.find((tweet) => tweet.id === id);
}

export async function createTweet(text,name,username)
{
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  };
  
  tweets = [tweet,...tweets];
  return tweet;
}

export async function updateTweet(id)
{
   const tweet = tweets.find((tweet) => tweet.id === id);
if(tweet)
{
  tweet.text = text;

}
   return tweet;
}

export function deleteTweet(id)
{
  tweets = tweets.filter((tweet) => tweet.id !== id);

}