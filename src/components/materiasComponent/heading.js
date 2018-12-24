import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {Button,Container,Divider,Grid,Header,Icon,Image,List,Menu,Responsive,
    Segment,
    Sidebar,
    Visibility,
  } from 'semantic-ui-react';

  const Heading = ({mobile})=>(
    <Container text>
        <Header
            as='h1'
            content='Docent Helper'
            inverted
            style={{
                fontSize: mobile ? '2em' : '4em',
                fontWeight: 'normal',
                marginBottom: 0,
                marginTop: mobile ? '1.5em' : '3em',
            }}
        />
    </Container>
  )

Heading.propTypes = {
    mobile : PropTypes.bool,
}


export default Heading;