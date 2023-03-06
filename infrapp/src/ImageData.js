import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import emitter from './events';

class ImageData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: true,

            imagedata: [],
            userno: 0,
            imagelocation: "",
            graphOption: {

            }
        };
    }
    componentDidMount() {
        let userid = 0;
        let imagelocation = "";
  
        this.state.imagelocation = emitter.on("imagelocation", (data) => {
            imagelocation = data;          
            console.log("imagelocation" + this.state.imagelocation);
            fetch('http://133.18.23.48:3005/analysisdata?location=' + imagelocation)
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                var obj = JSON.stringify(data);
                var jsonObj = JSON.parse(obj);
                var tempetureData = [];
                for (var i = 1; i < jsonObj.length; i++) {
                  var tempeture = jsonObj[i];
                  var temp = JSON.stringify(tempeture);
                  var temp = JSON.parse(temp);
                  tempetureData[i-1] = temp.tempeture.TEMP;
                }

                this.setState({ imagedata: tempetureData })

              
            })
            .catch(console.log)
          });


    }

   
  render() {
    return (
      <ReactEcharts
      option={{
        
        legend: {
            data:['温度']
        },
        scales: {                          //軸設定
          yAxes: [{                      //y軸設定
              display: true,             //表示設定
              scaleLabel: {              //軸ラベル設定
                 display: true,          //表示設定
                 labelString: '縦軸ラベル',  //ラベル
                 fontSize: 18               //フォントサイズ
              },
              ticks: {                      //最大値最小値設定
                  min: 20,                   //最小値
                  max: 30,                  //最大値
                  fontSize: 18,             //フォントサイズ
                  stepSize: 1               //軸間隔
              },
          }],
          xAxes: [{                         //x軸設定
              display: true,                //表示設定
              barPercentage: 0.4,           //棒グラフ幅
              categoryPercentage: 0.4,      //棒グラフ幅
              scaleLabel: {                 //軸ラベル設定
                 display: true,             //表示設定
                 labelString: '横軸ラベル',  //ラベル
                 fontSize: 18               //フォントサイズ
              },
              ticks: {
                  fontSize: 18             //フォントサイズ
              },
          }],
      },
        xAxis: {
            data: ["1","2","3","4","5","6"]
        },
        yAxis: {},
        series: [{
            name: '温度',
            type: 'bar',
            data: this.state.imagedata

        }]
        }}
      />
    );
  }
}
export default ImageData;