import React from 'react';

import Concert from './../Concert/ConcertContainer';

const Concerts = ({ concerts }) => (
  <section>
    {concerts.map(con => <Concert key={con.id} {...con} />)}
  </section>
)

export default Concerts;