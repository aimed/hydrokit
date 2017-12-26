import './App.css';

import * as React from 'react';

import { List, ListGroup, ListItem } from '@hydrokit/list';

import { Button } from '@hydrokit/button';
import { Checkbox } from '@hydrokit/checkbox';
import { FormField } from '@hydrokit/formfield';
import { PopoverMenu } from '@hydrokit/popover-menu';
import { Showcase } from './Showcase/Showcase';
import { TextField } from '@hydrokit/textField';

export class App extends React.Component {
  render() {
    return (
      <div className="app">
        <section className="app__content">
          <section>
            <h1>Hydrokit</h1>
            <h2>Clean and fun</h2>
            {/* tslint:disable-next-line:max-line-length*/}     
            <p>Hydrokit is a react UI framework designed to be as clean as possible while putting a focus on UX. It comes with beautifully animated and ready to use components out of the box. This approach results in an opinionated framework.</p>
            {/* tslint:disable-next-line:max-line-length*/}     
            <p>This framework is right for you, if you want to provide a clean and fun to use experience, but you should probably look somewhere else if you require a high amount of customizability.</p>
          </section>

          <Showcase title="Buttons">
            <section><Button>Hello</Button></section>
            <section><Button primary>Hello</Button></section>
          </Showcase>

          <Showcase title="Forms">
            <FormField label="Label" hint="Hint">
              <TextField placeholder="Text field" />
            </FormField>
            <FormField label="Label" error="Error">
              <TextField placeholder="Text field with error" />
            </FormField>
            <FormField>
              <Checkbox /><label>Checkbox</label>
            </FormField>
          </Showcase>

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
