import Header from "../components/header/Header";
import ContentContainer from "../components/contentContainer/ContentContainer";
import React from "react";
import Nav from "../components/Navbar/Navbar";
import Head from "../components/Head";
import Layout from "../components/Layout";
const eventStatus = {
  1: "upcoming",
  2: "past",
  3: "all",
};

const fetchEvents = ({ addEvents, eventsFailed, eventType }) => {
  const status = eventStatus[eventType];
  const url =
    eventType === 3
      ? "http://localhost:3001/events"
      : `http://localhost:3001/events?status=${status}`;
  return fetch(url)
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          const error = new Error(
            `Error ${response.status}: ${response.statusText}`
          );
          error.response = response;
          throw error;
        }
      },
      (error) => {
        const errMess = new Error(error.message);
        throw errMess;
      }
    )
    .then((response) => response.json())
    .then((data) => addEvents(data))
    .catch((error) => eventsFailed(error.message));
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventType: 1,
      view: 1,
      events: [],
      isLoading: false,
      errMess: undefined,
    };
  }

  componentDidMount() {
    this.toggleEventData();
  }

  eventsFailed = (errMess) => {
    this.setState({ isLoading: false, errMess: errMess });
  };

  addEvents = (data) => {
    this.setState({ events: data, isLoading: false });
  };

  toggleEventType = (value) => this.setState({ eventType: value });

  toggleView = (value) => this.setState({ view: value });
  toggleEventData = () => {
    this.setState({ isLoading: true, events: [] });
    fetchEvents({
      addEvents: this.addEvents,
      eventsFailed: this.eventsFailed,
      eventType: this.state.eventType,
    });
  };

  render() {
    return (
      <>
        <Head />
        <Nav />
        <Layout>
          <main className="MainContainer">
            <Header />
            <ContentContainer
              eventType={this.state.eventType}
              view={this.state.view}
              data={this.state.events}
              handleChangeView={this.toggleView}
              errMess={this.state.errMess}
              fetchData={this.toggleEventData}
              isLoading={this.state.isLoading}
              toggleEventType={this.toggleEventType}
            />
          </main>
        </Layout>
      </>
    );
  }
}

export default Home;
