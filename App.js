import React, {useState, useEffect} from 'react';
import { StyleSheet } from 'react-native';

import BookScreen from './app/screens/BookScreen';

const BACKGROUND = "#383e46";

const audioBookPlaylist = [
  {
    title: 'Hamlet - Act I',
    author: 'William Shakespeare',
    source: 'Librivox',
    uri:
      'https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act1_shakespeare.mp3',
    imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
  },
  {
    title: 'Hamlet - Act II',
    author: 'William Shakespeare',
    source: 'Librivox',
    uri:
    'http://www.archive.org/download/hamlet_0911_librivox/hamlet_act2_shakespeare.mp3',
    imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg'
  },
  {
    title: 'Hamlet - Act III',
    author: 'William Shakespeare',
    source: 'Librivox',
    uri: 'http://www.archive.org/download/hamlet_0911_librivox/hamlet_act3_shakespeare.mp3',
    imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg',
  },
  {
    title: 'Hamlet - Act IV',
    author: 'William Shakespeare',
    source: 'Librivox',
    uri:
      'https://ia800204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act4_shakespeare.mp3',
    imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg',
  },
  {
    title: 'Hamlet - Act V',
    author: 'William Shakespeare',
    source: 'Librivox',
    uri:
      'https://ia600204.us.archive.org/11/items/hamlet_0911_librivox/hamlet_act5_shakespeare.mp3',
    imageSource: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg',
  }
]

export default function App() {

  const [currentIndex, setCurrentIndex] = useState(1);
  const [currentBook, setCurrentBook] = useState(audioBookPlaylist[currentIndex]);
  
  const handlePreviousTrack = async () => {
    console.log('handlePreviousTrack');
    if(currentIndex > 0 ) {
      setCurrentIndex(currentIndex => currentIndex - 1);
    
    } else {
      setCurrentIndex(0);
    }
  }
  useEffect(()=>{
    setCurrentBook(currentBook => audioBookPlaylist[currentIndex]);
  }, [currentIndex])
  const handleNextTrack = async () => {
    if(currentIndex >= audioBookPlaylist.length - 1) {
      setCurrentIndex(currentIndex => 0);
    } 
    else {
      setCurrentIndex(currentIndex => currentIndex + 1);
    
    }
  }

  return (
      <BookScreen book={currentBook} 
      handleNextTrack={handleNextTrack} 
      handlePreviousTrack={handlePreviousTrack}
      currentIndex={currentIndex}
      ></BookScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BACKGROUND,
  },
  neumorphism: {
    margin: 24,
    fontSize: 24,
    fontWeight: '500',
    textAlign: 'center',
    color: "white"
  },
});
