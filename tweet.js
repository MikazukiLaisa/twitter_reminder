const Twitter = require('twitter')

const consumer_key = ''
const consumer_secret = ''
const access_token_key = ''
const access_token_secret = ' '

const client = new Twitter({
  consumer_key,
  consumer_secret,
  access_token_key,
  access_token_secret
})





  client.stream( 'statuses/filter', { track : '@TWITTER ID' }, function( stream ) {
    // フィルターされたデータのストリームを受け取り、ツイートのテキストを表示する
    stream.on( 'data', function( data ) {
        var text = data.text; // ツイートのテキスト
        var textCleaned = text.replace( /@TWITTER ID/g, "" ); // アカウント名は不要
        var destination = '@' + data.user.screen_name;
        console.log("---------------------------------------------------")
        console.log( textCleaned );
        reserve(textCleaned, destination);
    });
 });


var reserve = (tweet_message, user) => {
    var result = tweet_message.split(" ");
    var result_date = result[0].split("/");
    if(!isNaN(result_date[0])){
      var now = Date.now();
      var buffer = (result[0] + " " + result[1]).toString();
      var message_time = new Date(buffer).getTime();
      var df = message_time - now;
  
      console.log(result);
      console.log("booking : " + df);
      console.log("destination : " + user);
      console.log("booked tweet : " + result[2]);
      
      setTimeout(() => {
          var twitter_status = user + " " + result[2];
  
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

