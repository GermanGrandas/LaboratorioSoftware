import React from 'react';
import {Header,Segment, Container,Grid, GridColumn,Image} from 'semantic-ui-react';

const Footer = ()=>(

    <footer>
    <Segment vertical style={{ padding: '5em 0em' }}>
        <Container >
        <Grid divided inverted stackable>
          <GridColumn width={7}>
                <Header
                    as='h4'
                    content='Made by a group of noobs'
                    inverted
                    style={{fontFamily: 'Courgette',fontSize: '1.5em'}}
                />
          </GridColumn>
          <Grid.Row>
            <Grid.Column width={3}>
              <Image src="../images/yo.jpg" alt="yo" circular size='tiny'/>
              <Header style={{fontFamily: 'Courgette',fontSize: '1.5em'}} inverted as='h4' content='Germán Grandas'/>
            </Grid.Column>
            <Grid.Column width={3}>
                <Image src="../images/jhoan.jpg" alt="Jhoan" circular size='tiny'/>
                <Header style={{fontFamily: 'Courgette',fontSize: '1.5em'}} inverted as='h4' content='Jhoan Marín'/>
            </Grid.Column>
            <Grid.Column width={3}>
                <Image src="../images/mauro.jpg" alt="mauro" circular size='tiny'/>
                <Header style={{fontFamily: 'Courgette',fontSize: '1.5em'}} inverted as='h4' content='Mauricio Castaño'/>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
              <Grid.Column>
                <Header 
                        as='h5'
                        content='© 2018 Copyright'
                        inverted
                    />
              </Grid.Column>
          </Grid.Row>
        </Grid>
        </Container>
    </Segment>
    </footer>
)

export default Footer;