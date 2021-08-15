import React from 'react';
import { Row, Col } from 'reactstrap';
import io from 'socket.io-client';

import './Concert.scss';

class Concert extends React.Component {
  
  componentDidMount() {

    const { loadSeats, loadSeatsData } = this.props;
    loadSeats();

    this.socket = io((process.env.NODE_ENV === 'production') ? '' : 'localhost:8000', { transports: ["websocket"] });
    this.socket.on('seatsUpdated', seats => loadSeatsData(seats));
  }

  tickets = (day) => {
    const {seats} = this.props;
    const bookedTickets = (seats.filter(item => item.day === day)).length;
    const freeTickets = 50 - bookedTickets;
    return freeTickets;
  }

  render() {
    const { performer, price, genre, day, image} = this.props;

    return (
      <article className="concert">
        <Row noGutters>
          <Col xs="6">
            <div className="concert__image-container">
              <img className="concert__image-container__img" src={image} alt={performer}/>
            </div>
          </Col>
          <Col xs="6">
            <div className="concert__info">
              <img className="concert__info__back" src={image} alt={performer}/>
              <h2 className="concert__info__performer">{ performer }</h2>
              <h3 className="concert__info__genre">{ genre }</h3>
              <h3 className="concert__info__tickets">Only { this.tickets(day) } tickets left!</h3>
              <p className="concert__info__day-n-price">Day: {day}, Price: { price }$</p>
            </div>
          </Col>
        </Row>
      </article>
    )
  }
}

export default Concert;