function getGovWeather(zip, callback){
  
  // Use the weather.gov API to request the 7 day forecast for the specified zip code
  $.get('http://graphical.weather.gov/xml/SOAP_server/ndfdXMLclient.php?whichClient=NDFDgenMultiZipCode&zipCodeList=' + zip  +'&product=time-series&maxt=maxt&mint=mint&Submit=Submit', function(xml) {    
    
    // Init the variable we will return
    var forecast = {
      title: "7 Day Forecast",
      lows: new Array(),
      highs: new Array()
    }; 
      
    // Parse the XML response to get out the values we want
    $(xml).find('temperature').each(function(){
        var array = forecast.lows;
        
        // See whether we are processign lows or highs
        if($(this).attr('type') == 'maximum')
        {
          var array = forecast.highs;
        }
        
        // Init the day index
        var count = 0;
        
        // We are asking for a 7 day forecast, so if the length is 6, it means the high/low is already happened and isn't reported.
        // Start from the next 'day'
        if($(this).find('value').length == 6)
          count = 1;
        
        // Iterate over the day values and assigne to the right array
        $(this).find('value').each(function(){
          array[count] = $(this).text();
          count = count + 1;
        });
    });
    
    callback(forecast);
  });
}