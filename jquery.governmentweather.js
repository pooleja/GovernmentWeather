function getGovWeather(zip, callback){
 $.get('http://graphical.weather.gov/xml/SOAP_server/ndfdXMLclient.php?whichClient=NDFDgenMultiZipCode&zipCodeList=' + zip  +'&product=time-series&maxt=maxt&mint=mint&Submit=Submit', function(xml) {    
    
    var forecast = {
      title: "7 Day Forecast",
      lows: new Array(),
      highs: new Array()
    }; 
      
    $(xml).find('temperature').each(function(){
        var array = forecast.lows;
        if($(this).attr('type') == 'maximum')
        {
          var array = forecast.highs;
        }
        var count = 0;
        $(this).find('value').each(function(){
          array[count] = $(this).text();
          count = count + 1;
        });
    });
    
    callback(forecast);
  });
}