import React from "react";
import "./App.scss";
import alanBtn from "@alan-ai/alan-sdk-web";
import News from "./News/News";
import alanAi from "./assets/alanHead.jpeg";

const alanKey =
  "a37bdabb642d531656e030bf705fbf432e956eca572e1d8b807a3e2338fdd0dc/stage";

function App() {
  const [newsData, setNewsData] = React.useState([]);

  React.useEffect(() => {
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles }) => {
        if (command === "newsHeadline") {
          setNewsData(articles);
        }
      },
    });
  }, []);

  return (
    <>
      <div className="alanImg">
        <img src={alanAi} alt="" />
      </div>
      <News articles={newsData} />
    </>
  );
}

export default App;
