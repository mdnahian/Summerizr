var formatTime = require('minutes-seconds-milliseconds');
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
} from 'react-native';

var StopWatch = React.createClass({
  getInitialState: function (){
    return {
      timeElapsed: null,
      isRunning: false,
      startTime: null,
      recordings: [],
      isSaved: false
    }
  },
  render: function(){
    var time = formatTime(this.state.timeElapsed);
    time = time.substring(0, time.length - 3);

    return <View style={styles.container}>
      <View style={styles.header}> 

        <View style={styles.timerWrapper}> 
          <Text style={styles.timer}>{time}</Text>
        </View>

        <View style={styles.buttonWrapper}> 
          {this.startStopBtn()}
          {this.saveBtn()}
        </View>

      </View>

      <View style={styles.footer}>
        {this.recordings()}
      </View>

    </View>
  },
  recordings: function(){
    return this.state.recordings.map(function (time, index){
      return <View key={index} style={styles.recording}>
        <Text style={styles.recordingText}>
          Recording #{index + 1}
        </Text>
        <Text style={styles.recordingText}>
          {time}
        </Text>
      </View>
    });
  },
  startStopBtn: function(){
    return <TouchableHighlight underlayColor={this.state.isRunning ? 'red' : 'green'}
    onPress={this.handleStartPress}
    style={[styles.button, this.state.isRunning ? styles.stopButton : styles.startButton]}>
      <Text style={styles.colorWhite}>
        {this.state.isRunning ? 'Stop' : 'Record'}
      </Text>
    </TouchableHighlight>
  },
  saveBtn: function(){
    return <TouchableHighlight underlayColor='black'
    onPress={this.handleSavePress}
    style={styles.button}>
      <Text style={styles.colorWhite}>Save</Text>
    </TouchableHighlight>
  },
  handleStartPress: function(){

    if(this.state.isRunning){
      this.handleStopPress();
      return
    }

    this.setState({
      startTime: new Date()
    });

    this.interval = setInterval(() => {
      this.setState({
        timeElapsed: new Date - this.state.startTime,
        isRunning: true,
        isSaved: false
      });
    }, 100); 
  },
  handleStopPress: function(){
    clearInterval(this.interval);
    this.setState({isRunning: false});
  },
  handleSavePress: function(){

    if(this.state.timeElapsed > 1000 && !this.state.isSaved) {

      var time = formatTime(this.state.timeElapsed);
      time = time.substring(0, time.length - 3);
      
      this.setState({
        recordings: this.state.recordings.concat([time]),
        isSaved: true
      });

      this.handleStopPress();
      return
    }

  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch'
  },
  header: { // timer and buttons
    flex: 2,
    backgroundColor: '#eeeeee',
  },
  footer: { // laps list
    flex: 3,
    backgroundColor: '#333333'
  },
  timerWrapper: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  buttonWrapper: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#242424'
  },
  timer: {
    fontSize: 60,
  },
  button: {
    borderWidth: 5,
    height: 100,
    width:100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  startButton: {
    borderColor: 'green'
  },
  stopButton: {
    borderColor: 'red',
    backgroundColor: 'red'
  },
  colorWhite: {
    color: 'white'
  },
  recording: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
    margin: 10
  },
  recordingText: {
    fontSize: 20,
    color: 'white'
  }
});

AppRegistry.registerComponent('StopWatch', () => StopWatch);
