import React from "react";
import "./App.css";
import axios from "axios";

const options = {
  method: 'GET',
  url: 'https://theaudiodb.p.rapidapi.com/mvid.php',
  params: {i: '112024'},
  headers: {
    'x-rapidapi-key': '95f1fb94d7mshe7816815b93cc4ap197e2fjsn4b824aff24ce',
    'x-rapidapi-host': 'theaudiodb.p.rapidapi.com'
  }
};

function App() {
  axios
    .request(options)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.error(error);
    });
  return (
    <>
      <h1>Hello</h1>
    </>
  );
}

export default App;
