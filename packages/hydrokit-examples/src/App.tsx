import './App.css';

import * as React from 'react';

import { Button, SubmitButton } from '@hydrokit/button';
import { List, ListGroup, ListItem } from '@hydrokit/list';

import { FormsShowcase } from './Showcases/FormsShowcase';
import { PopoverMenu } from '@hydrokit/popover-menu';
import { Showcase } from './Showcase/Showcase';

export class App extends React.Component {
  
  render() {    
    return (
      <div className="app">
        <section className="app__content">
          <section>
            <h1>Hydrokit</h1>
            <h2>Clean and fun</h2>
            {/* tslint:disable-next-line:max-line-length*/}     
            <p>An experimental React Component Library. See <a href="https://github.com/aimed/hydrokit">github</a>.</p>
          </section>

          <Showcase title="Buttons">
            <section><Button>Regular</Button></section>
            <section><Button primary>Primary</Button></section>
            <section><Button disabled>Disabled</Button></section>
            <section><SubmitButton submitting>Submit button</SubmitButton></section>
          </Showcase>

          <FormsShowcase />

          <Showcase title="Lists">
            <List>
              <ListItem header onClick={e => { /**/ }}>List header</ListItem>
              <ListItem onClick={e => { /**/ }}>Clickable item</ListItem>
              <ListItem>Not clickable</ListItem>
              <ListGroup>
                <ListItem header onClick={e => { /**/ }}>A group header</ListItem>
                <ListItem onClick={e => { /**/ }}>Group item</ListItem>
              </ListGroup>
            </List>
          </Showcase>

          <Showcase title="Popovers">
            <section>
              <PopoverMenu label={<Button>Toggle</Button>}>
                <List>
                  <ListItem onClick={e => { /**/ }}>Do stuff</ListItem>
                  <ListItem onClick={e => { /**/ }}>Yepp</ListItem>
                </List>
              </PopoverMenu>
            </section>
            <section>
              <PopoverMenu dark label={<Button>Dark</Button>}>
                <List>
                  <ListItem onClick={e => { /**/ }}>Manually opened menu</ListItem>
                  <ListItem onClick={e => { /**/ }}>Yepp</ListItem>
                </List>
              </PopoverMenu>
            </section>
            <section>
              <PopoverMenu dark label={<Button>Bottom Align</Button>} alignVertical="bottom">
                <List>
                  <ListItem onClick={e => { /**/ }}>Manually opened menu</ListItem>
                  <ListItem onClick={e => { /**/ }}>Yepp</ListItem>
                </List>
              </PopoverMenu>
            </section>
          </Showcase>

        </section>
      </div>
    );
  }
}
