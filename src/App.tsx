import React, { useRef, useState } from "react";
import "./App.css";
import * as json_data from "./link.json";
import useFetch from "./useFetch";
import Message from "./Message";
import { I_Modal } from "./interfaces";
import moment from "moment";
import AnimatedNumber from "animated-number-react";
import { Accordion, Button, Card, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleDown,
  faBirthdayCake,
} from "@fortawesome/free-solid-svg-icons";

function MyVerticallyCenteredModal(props: I_Modal) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <h2 className="theme title">
          Happy Birthday Shadi! <FontAwesomeIcon icon={faBirthdayCake} />
        </h2>
      </Modal.Body>
    </Modal>
  );
}

function App() {
  const specialDate = "1972-04-21";
  const [dateIsChosen, setDateAsChosen] = useState(false);
  const [dateIsSetUp, setUpDate] = useState(false);
  const [day, setDay] = useState("00");
  const [month, setMonth] = useState("00");
  const [year, setYear] = useState("0000");
  const [counterDuration] = useState(5000);
  const [modalShow, setModalShow] = useState(false);
  const [messages, setMessages] = useState([]);

  const isComponentMounted = useRef(true);
  const json_response = useFetch(json_data.link, isComponentMounted, []);

  const handleInputDate = () => {
    setDateAsChosen(true);
    setDay(moment(specialDate).format("DD"));
    setMonth(moment(specialDate).format("MM"));
    setYear(moment(specialDate).format("YYYY"));

    setTimeout(() => {
      setMessages(json_response.data);
    }, 6000);

    setTimeout(() => {
      setUpDate(true);
      setModalShow(true);
    }, 7000);
  };

  const formatDayValue = (value: string) => {
    if (dateIsChosen) {
      return value;
    } else {
      return `0${value}`;
    }
  };

  const formatMonthValue = (value: string) => `0${value}`;

  const formatYearValue = (value: string) => {
    if (dateIsChosen) {
      return value;
    } else {
      return `000${value}`;
    }
  };

  return (
    <div className="App">
      <div className="date-picker mt-5 mb-5">
        <label htmlFor="date" className="mb-2">
          <h4>Choose a Random Date</h4>
        </label>
        <input
          type="date"
          name="date"
          className="btn-light  form-control"
          onChange={handleInputDate}
        />
      </div>

      <br />

      <h1 className="date mt-5 mb-5">
        <AnimatedNumber
          value={day}
          formatValue={formatDayValue}
          duration={counterDuration}
        />
        <AnimatedNumber
          value={month}
          formatValue={formatMonthValue}
          duration={counterDuration}
        />
        <AnimatedNumber
          value={year}
          formatValue={formatYearValue}
          duration={counterDuration}
        />
      </h1>

      <MyVerticallyCenteredModal
        className="mb-5"
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      {dateIsSetUp && !modalShow ? (
        <div className="mt-5 theme">
          <Accordion>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                  <h4> You have some messages from your beloved people</h4>
                  <br />
                  <FontAwesomeIcon icon={faAngleDoubleDown}></FontAwesomeIcon>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <Accordion>
                    {messages.map((message) => (
                      <Message data={message} key={Math.random()} />
                    ))}
                  </Accordion>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default App;
