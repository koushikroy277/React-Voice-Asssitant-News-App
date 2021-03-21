import React from "react";
import "./News.scss";

import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
} from "@material-ui/core";

const infoCards = [
  { color: "#00838f", title: "Latest News", text: "Give me the latest news" },
  {
    color: "#1565c0",
    title: "News by Categories",
    info:
      "Business, Entertainment, General, Health, Science, Sports, Technology",
    text: "Give me the latest Technology news",
  },
  {
    color: "#4527a0",
    title: "News by Terms",
    info: "Bitcoin, PlayStation 5, Smartphones, Donald Trump...",
    text: "What's up with PlayStation 5",
  },
  {
    color: "#283593",
    title: "News by Sources",
    info: "CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...",
    text: "Give me the news from CNN",
  },
];

export default function News({ articles }) {
  if (!articles.length) {
    return (
      <div className="infoParent">
        {infoCards.map((infodata) => (
          <div className="infoCard">
            <div
              style={{ backgroundColor: infodata.color }}
              className="infoSec"
            >
              <h2>{infodata.title}</h2>
              {infodata.info && (
                <h5>
                  <strong>{infodata.title.split(" ")[2]}:</strong>
                  <br />
                  {infodata.info}
                </h5>
              )}
              <h5>
                Try saying: <br /> <i>{infodata.text}</i>
              </h5>
            </div>
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <h1>News</h1>
        <div className="newsData">
          {articles.map((data, index) => (
            data.urlToImage ? (
              <div className="newsCard" key={index}>
                <Card className="card">
                  <CardActionArea href={data.url} target="_blank">
                    <img src={data.urlToImage} alt="newsImg" />
                    <div className="cardSecTitle">
                      <h1>{new Date(data.publishedAt).toDateString()}</h1>
                      <h1>{data.source.name}</h1>
                    </div>
                    <h1 className="cardTitle">{data.title}</h1>
                    <CardContent className="cardContent">
                      <h1>{data.description}</h1>
                    </CardContent>
                  </CardActionArea>
                  <CardActions className="cardAction">
                    <Button color="primary" className="cardBtn">
                      Learn More
                    </Button>
                    <p>{index + 1}</p>
                  </CardActions>
                </Card>
              </div>
            ) : null
          ))}
        </div>
      </div>
    );
  }
}
