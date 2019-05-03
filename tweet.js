const Twitter = require('twitter')

const consumer_key = 'oKdF0pmYxeYejFuPE3B93BFM2'
const consumer_secret = 'tq4a2vrJ9nIelKqxtGbs1X9ylR6m9sxLFbvclEPlKBck5DxxLs'
const access_token_key = '1671656778-WOIwCPSSeRSQ2MdBz9YPZiIa9wep2LeBdKYXr1R'
const access_token_secret = 'W1EvTLF2QKNJzYCtOsjVI5vxCAXEP7C9jWBhxmZxb51vE'

const client = new Twitter({
  consumer_key,
  consumer_secret,
  access_token_key,
  access_token_secret
})





  client.stream( 'statuses/filter', { track : '@Mikazuki_Laisa' }, function( stream ) {
    // フィルターされたデータのストリームを受け取り、ツイートのテキストを表示する
    stream.on( 'data', function( data ) {
        var text = data.text; // ツイートのテキスト
        var textCleaned = text.replace( /@Mikazuki_Laisa/g, "" ); // アカウント名は不要
        var destination = '@' + data.user.screen_name;
        console.log("---------------------------------------------------")
        console.log( textCleaned );
        reserve(textCleaned, destination);
    });
 });


var reserve = (tweet_message, user) => {
    var result = tweet_message.split(" ");
    var result_date = result[1].split("/");
    if(!isNaN(result_date[0])){
      var now = Date.now();
      var buffer = (result[1] + " " + result[2]).toString();
      var message_time = new Date(buffer).getTime();
      var df = message_time - now;
  
      console.log(result);
      console.log("booking : " + df);
      console.log("destination : " + user);
      console.log("booked tweet : " + result[3]);
      
      setTimeout(() => {
          var twitter_status = user + " " + result[3];
  
              client.post('statuses/update', {status: twitter_status}, function(error, tweet, response) {
                  if (!error) {
                    console.log("tweeted : " + twitter_status);
                  }
                });
         
      }, df)
    }else{
      console.log(result);
      console.log(result_date);
      console.log("this is not a reservation tweet");
    }
}

