//DOM Ready
Zepto(function($){

  //Get Fronteers data with the help of YQL
  //Our query (url encoded): select * from html where url='http://fronteers.nl/congres/2012/attendees' and xpath='//*[@class="section"]/table'
  var query = 'select%20%2A%20from%20html%20where%20url%3D%27http%3A//fronteers.nl/congres/2012/attendees%27%20and%20xpath%3D%27//%2A%5B%40class%3D%22section%22%5D/table%27'
  var url = 'http://query.yahooapis.com/v1/public/yql?q='+query+'&format=json&callback=?'

  var countries = {}

  $.ajaxJSONP({
    url: url,
    success: parseData,
    error: function(data){
      console.log('sorry, error', data)
    },
    complete: function(){

    }
  })

  function parseData( data ){

    var rows = data.query.results.table.tr
    countries = {}

    //We start from 1 since the first row is a table header
    for ( var i = 1, l = rows.length; i < l; i++ ){
      var country = rows[i].td[3].p
      countries[country] ? countries[country]++ : countries[country] = 1
    }

    makePie()    
  }

  function makePie(){

    var labels = [], values = []

    for ( country in countries ){
      if ( countries.hasOwnProperty( country )){
        labels.push( country )
        values.push( countries[ country ])
      }
    }

    Raphael("countries", 700, 600).pieChart(350, 300, 220, values, labels, "#fff")

  }

})