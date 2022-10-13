// Zoom functions

function zoomBeograd_5() {
   map.setView([44.823149, 20.384181], 16);
}

function zoomObrenovac() {
  map.setView([44.664428, 20.167477], 16);
}

function zoomPancevo() {
  map.setView([44.868688, 20.698780], 16);
}

function zoomEurope() {

  map.setView([48.58,8.1], 5);
}

function zoomRegion() {
  map.setView([42.0383866,23.8591327], 6.03);
}

function zoomGreece() {
  map.setView([38.5240504,24.4767468], 6.74);
}

function zoomRomania() {
  map.setView([45.8718751,24.8041215], 7.28);
}

function zoomBulgaria() {
  map.setView([42.8181513,25.8530517], 7.73);
}

function zoomCYGR() {
  map.setView([39,24.5], 6);
}

function zoomCretePelop() {
  map.setView([37,25], 7);
}

function zoomCrete() {
  map.setView([35,25.5], 8.3);
}


async function load_pl_wind(name) {

  const sqlPromise = initSqlJs({
  locateFile: file => `sql.js/dist${file}`
  });
  const dataPromise = fetch("https://farcross.weather2umbrella.com/europan/w_jsons/p_wind/wind_prev.db").then(res => res.arrayBuffer());
  if (name.slice(0,name.indexOf('_wind_'))=='GR_DidimosLofos') {
     site='GR-D'
  }
  if (name.slice(0,name.indexOf('_wind_'))=='GR_Mytoula') {
     site='GR-M'
  }
  wt=(parseInt(name.slice(name.indexOf('_wind_')+6,name.length))-1).toString()
  wt_graph=(parseInt(name.slice(name.indexOf('_wind_')+6,name.length))).toString()

  str_sql='wt='+wt+' AND sitename = '+'"'+site+'"'
  const [SQL, buf] = await Promise.all([sqlPromise, dataPromise])

  const db = new SQL.Database(new Uint8Array(buf));


    var wind = db.exec('SELECT ws FROM wind WHERE '+str_sql);
    var power = db.exec('SELECT Power FROM wind WHERE '+str_sql);
    var tajm = db.exec('SELECT time FROM wind WHERE '+str_sql);
    var trace1 = {
      type: "bar",
      mode: "lines",
      name: 'Power [Wh]',
      x: ([].concat.apply([],tajm[0].values)),
      y: ([].concat.apply([],power[0].values)),
      line: {color: '#17BECF'}
      }
   
      var trace2 = {
      type: "scatter",
      mode: "lines",
      name: 'Wind speed [m/s]',
      x: ([].concat.apply([],tajm[0].values)),
      y: ([].concat.apply([],wind[0].values)),
      yaxis: 'y2',
      line: {color: '#7F7F7F'}
      }
      var data = [trace1,trace2];
      var layout = {
      title: name,
      xaxis: {
      autorange: true,
      range: [0, 47],
      rangeselector: {buttons: [
         {
         count: 1,
         label: '1h',
         step: 'hour',
         stepmode: 'backward'
         },
         {
         count: 6,
         label: '6h',
         step: 'hour',
         stepmode: 'backward'
         },
         {step: 'all'}
      ]},
      rangeslider: {range: [([].concat.apply([],tajm[0].values))[0], ([].concat.apply([],tajm[0].values))[47]]},
      type: 'date'
      },
      yaxis: {
      autorange: true,
      type: 'linear'
      },
      yaxis2: {
      title: 'wind speed',
      titlefont: {color: '#7F7F7F'},
      tickfont: {color: '#7F7F7F'},
      overlaying: 'y',
      side: 'right'
      }
      };
   
      Plotly.newPlot('myDiv', data, layout,config= {'displaylogo': false});
      str_sql='wt='+wt+' AND sitename = '+'"'+site+'"'

      str_sql='SELECT time,SUM(Power) FROM wind WHERE sitename= "GR-D" GROUP BY time'
      var wf_data = db.exec('SELECT SUM(Power) FROM wind WHERE sitename= '+'"'+site+'"'+' GROUP BY time');
      var wf_time = db.exec('SELECT time FROM wind WHERE sitename= '+'"'+site+'"'+' GROUP BY time');
      var trace1 = {
         type: "bar",
         mode: "lines",
         name: 'Power [Wh]',
         x: ([].concat.apply([],wf_time[0].values)),
         y: ([].concat.apply([],wf_data[0].values)),
         line: {color: '#FF0000'},
         marker: {
            color: 'rgb(255,99,71)'
          }
         
         }
         var data = [trace1];
 
         var layout = {
            title: name.slice(0,name.indexOf('_wind_')),
            xaxis: {
            autorange: true,
            range: [0, 47],
            rangeselector: {buttons: [
               {
               count: 1,
               label: '1h',
               step: 'hour',
               stepmode: 'backward'
               },
               {
               count: 6,
               label: '6h',
               step: 'hour',
               stepmode: 'backward'
               },
               {step: 'all'}
            ]},
            rangeslider: {range: [([].concat.apply([],wf_time[0].values))[0], ([].concat.apply([],wf_time[0].values))[47]]},
            type: 'date'
            },
            yaxis: {
            autorange: true,
            type: 'linear'
            }
         };
         Plotly.newPlot('myDiv1', data, layout,config= {'displaylogo': false});
         
         str_sql_dir='wt='+wt+' AND wgname = '+'"'+site+'"'
 
         var dir = db.exec('SELECT "0" FROM dir WHERE ' + str_sql_dir);
         var bins = db.exec('SELECT "0" FROM bins WHERE ' + str_sql_dir);
         var data_dir = db.exec('SELECT * FROM table1 WHERE ' + str_sql_dir);
         duzina=[].concat.apply([],dir[0].values).length
         bins=[].concat.apply([],bins[0].values)
         var data1=[]
 
       for (i = 0; i < bins.length-1; i++) {
          data1.push({
            r: data_dir[0].values[i].slice(1,duzina+1),
            theta: [].concat.apply([],dir[0].values),
            name: bins[i].toFixed(2)+' - '+bins[i+1].toFixed(2)+' m/s',
           //  marker: {color: "rgb(106,81,163)"},
            type: "barpolar"
          })
       }
 
        var layout = {
            title: name,
            font: {size: 16},
            legend: {font: {size: 16}},
            polar: {
              barmode: "overlay",
              bargap: 0,
              radialaxis: {ticksuffix: "%", angle: 45, dtick: 20},
              angularaxis: {direction: "clockwise"}
            }
          }
        
        Plotly.newPlot("myDiv2", data1, layout,config= {'displaylogo': false})
 
 // podaci o turbinama
       str_sql='wt='+wt+' AND sitename = '+'"'+site+'"'
 // kriva snage
        var wg_type = db.exec('SELECT wgname FROM wind WHERE '+str_sql);
        var power = db.exec('SELECT * FROM gen_pw WHERE gname="' + wg_type[0].values[0][0]+'"');
       pw=[].concat.apply([],power[0].values)
       pw.splice(0,2)
       xdata=Array(pw.length).fill().map((x,i)=>i)
       let ydata = pw.map(Number)
       var trace1 = {
         x: xdata,
         y: ydata,
         type: 'scatter'
       };
       
       var layout = {
         font: {size: 16},
          title: 'Turb. No:'+wt_graph+' Type:'+wg_type[0].values[0][0],
          xaxis: {
           title: 'wind speed [m/s]',
           titlefont: {color: '#7F7F7F'},
           tickfont: {color: '#7F7F7F'}
           },
           yaxis: {
             title: 'Power [W]'
             }
          };    
       var data = [trace1];
       Plotly.newPlot('myDiv3', data, layout, {'displaylogo': false});
 // Koeficijen snage
       var power = db.exec('SELECT * FROM gen_ct WHERE gname="' + wg_type[0].values[0][0]+'"');
       pw=[].concat.apply([],power[0].values)
       pw.splice(0,2)
       xdata=Array(pw.length).fill().map((x,i)=>i)
       let ydata1 = pw.map(Number)
       var trace1 = {
         x: xdata,
         y: ydata1,
         type: 'scatter'
       };
       
       var layout = {
         font: {size: 16},
          title: 'Turb. No:'+wt_graph+' Type:'+wg_type[0].values[0][0],
          xaxis: {
           title: 'wind speed [m/s]',
           titlefont: {color: '#7F7F7F'},
           tickfont: {color: '#7F7F7F'}
           },
           yaxis: {
             title: 'Power coefficient'
             }
          };    
       var data = [trace1];
       Plotly.newPlot('myDiv4', data, layout, {'displaylogo': false});
 
 
 
  




  


  }





