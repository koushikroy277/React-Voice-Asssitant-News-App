const apiKey = '3ffb1ba42494400a92391f88af490bb6';
let savedArticles = [];

// Search by source
intent('Give me the news from $(source* (.*))', (p) => {
   let news_url = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}`;
    
   if (p.source.value){
       news_url = `${news_url}&sources=${p.source.value.toLowerCase().split(" ").join("-")}`
   }
    
   api.request(news_url, (error, response, body) => {
       const { articles } = JSON.parse(body);
       
       if (!articles.length){
           p.play("Sorry, try to search from a different source")
           return;
       }
       
       savedArticles = articles;
       
       p.play({ command: 'newsHeadline', articles });
       p.play( `here are the (latest | recent) news from ${p.source.value}`)
       
   })
})

// Search by terms
intent('what\'s up with $(term* (.*))', (p) => {
   let news_url = `https://newsapi.org/v2/everything?apiKey=${apiKey}`;
    
   if (p.term.value){
       news_url = `${news_url}&q=${p.term.value}`
   }
    
   api.request(news_url, (error, response, body) => {
       const { articles } = JSON.parse(body);
       
       if (!articles.length){
           p.play("Sorry, try to search from something else")
           return;
       }
       
       savedArticles = articles;
       
       p.play({ command: 'newsHeadline', articles });
       p.play( `Here are the (latest | recent) articles on ${p.term.value}`)
       
   })
})

const cat = ['business', 'technology', 'entertainment', 'general', 'health', 'science', 'sports']
const catIntent = `${cat.map((catData) => `${catData}~${catData}`).join("|")}`;

// Search by categories
intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${catIntent})`,
  `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${catIntent}) $(N news|headlines)`, (p) => {
   let news_url = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}`;
    
   if (p.C.value){
       news_url = `${news_url}&category=${p.C.value}`
   }
    
   api.request(news_url, (error, response, body) => {
       const { articles } = JSON.parse(body);
       
       if (!articles.length){
           p.play("Sorry, try to search for a different category")
           return;
       }
       
       savedArticles = articles;
       
       p.play({ command: 'newsHeadline', articles });
       
       if(p.C.value) {
            p.play(`Here are the (latest|recent) articles on ${p.C.value}.`);        
        } else {
            p.play(`Here are the (latest|recent) news`);   
        }
        
        p.play('Would you like me to read the headlines?');
        p.then(confirmation);
   })
})


const confirmation = context(() => {
    intent('yes', async (p) => {
        for(let i = 0; i < savedArticles.length; i++){
            p.play({ command: 'highlight', article: savedArticles[i]});
            p.play(`${savedArticles[i].title}`);
        }
    })
    
    intent('no', (p) => {
        p.play('Sure, sounds good to me.')
    })
})

intent('open (the|) (article|) (number|) $(number* (.*))', (p) => {
    if(p.number.value) {
        p.play({ command:'open', number: p.number.value, articles: savedArticles})
    }
})

intent('(go|) back', (p) => {
    p.play('Sure, going back');
    p.play({ command: 'newHeadlines', articles: []})
})