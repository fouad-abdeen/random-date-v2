import { I_Message } from "./interfaces";
import { Accordion, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

function Message(props: { data: I_Message }) {
  return (
    <>
      <Card>
        <Card.Header>
          <Accordion.Toggle as={Button} variant="link" eventKey={props.data.id}>
            <h4>{props.data.name}</h4>
            <FontAwesomeIcon icon={faCaretDown}></FontAwesomeIcon>
          </Accordion.Toggle>
        </Card.Header>
        <Accordion.Collapse eventKey={props.data.id}>
          <Card.Body>
            <h5>{props.data.message}</h5>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </>
  );
}

export default Message;
