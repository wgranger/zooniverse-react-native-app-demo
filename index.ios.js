'use strict';

import React, {StyleSheet, AppRegistry, Text, View, Image} from 'react-native';
import SwipeCards from 'react-native-swipe-cards';
// import apiClient from 'panoptes-client';

let Card = React.createClass({
  render() {
    return (
      <View style={styles.card}>
        <Image style={styles.thumbnail} source={{uri: this.props.image}} />
        <Text style={styles.text}>This is card {this.props.name}</Text>
      </View>
    )
  }
})

let NoMoreCards = React.createClass({
  render() {
    return (
      <View style={styles.noMoreCards}>
        <Text>No more cards</Text>
      </View>
    )
  }
})

const Cards = [
  {name: '44708', image: 'https://panoptes-uploads.zooniverse.org/staging/subject_location/c25c74e4-234e-4087-b8d8-4f4a3e707a09.jpeg'},
  {name: '44707', image: 'https://panoptes-uploads.zooniverse.org/staging/subject_location/11d93432-e0a0-4085-a2cc-39caaa64e04b.jpeg'},
  {name: '44706', image: 'https://panoptes-uploads.zooniverse.org/staging/subject_location/bd0ae4fd-d241-4678-aafd-1ac11b4106cd.jpeg'},
  {name: '44705', image: 'https://panoptes-uploads.zooniverse.org/staging/subject_location/a3d348ac-7675-4389-b871-f1bd230397d1.jpeg'},
  {name: '44704', image: 'https://panoptes-uploads.zooniverse.org/staging/subject_location/6db405e1-ef0a-4626-ab30-2a99d4341219.jpeg'},
  {name: '44703', image: 'https://panoptes-uploads.zooniverse.org/staging/subject_location/d57aa99f-f72b-4891-9277-070fc683e117.jpeg'},
]

var AwesomeProject = React.createClass({
  getInitialState() {
    return {
      cards: Cards,
      outOfCards: false
    }
  },
  handleYup (card) {
    console.log("yup")
  },
  handleNope (card) {
    console.log("nope")
  },
  cardRemoved (index) {
    console.log(`The index is ${index}`);

    let CARD_REFRESH_LIMIT = 3

    if (this.state.cards.length - index <= CARD_REFRESH_LIMIT + 1) {
      console.log(`There are only ${this.state.cards.length - index - 1} cards left.`);

      if (!this.state.outOfCards) {
        console.log(`Adding ${Cards.length} more cards`)

        this.setState({
          cards: this.state.cards.concat(Cards),
          outOfCards: true
        })
      }

    }

  },

  getSubjects () {
    apiClient.type('subjects').get(subjectQuery)["catch"](function(error) {
      if (error.message.indexOf('please try again') === -1) {
        throw error;
      } else {
        return new Promise(function(resolve, reject) {
          var fetchSubjectsAgain;
          fetchSubjectsAgain = function() {
            return apiClient.type('subjects').get(subjectQuery).then(resolve)["catch"](reject);
          };
          return setTimeout(fetchSubjectsAgain, 2000);
        });
      }
    }).then(function(subjects) {
      var newSubject, nonLoadedSubjects, ref;
      nonLoadedSubjects = (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = subjects.length; i < len; i++) {
          newSubject = subjects[i];
          if (newSubject !== subjectToLoad) {
            results.push(newSubject);
          }
        }
        return results;
      })();
      return (ref = upcomingSubjects.forWorkflow[workflow.id]).push.apply(ref, nonLoadedSubjects);
    });
  },

  render() {
    return (
      <SwipeCards
        cards={this.state.cards}
        loop={false}

        renderCard={(cardData) => <Card {...cardData} />}
        renderNoMoreCards={() => <NoMoreCards />}
        showYup={true}
        showNope={true}

        handleYup={this.handleYup}
        handleNope={this.handleNope}
        cardRemoved={this.cardRemoved}
      />
    )
  }
})

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    borderRadius: 5,
    overflow: 'hidden',
    borderColor: 'grey',
    backgroundColor: 'white',
    borderWidth: 1,
    elevation: 1,
  },
  thumbnail: {
    flex: 1,
    width: 300,
    height: 300,
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
