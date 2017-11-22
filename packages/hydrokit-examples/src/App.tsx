import './App.css';
import './button/hydrokit-button.css';
import './list/hydrokit-list.css';
import './formfield/hydrokit-formfield.css';
import './checkbox/hydrokit-checkbox.css';
import './textfield/hydrokit-textfield.css';
import './popover-menu/hydrokit-popover-menu.css';

import * as React from 'react';

import { Button } from './button/Button';
import { Checkbox } from './checkbox/Checkbox';
import { FormField } from './formfield/FormField';
import { List } from './list/List';
import { ListGroup } from './list/ListGroup';
import { ListItem } from './list/ListItem';
import { PopoverMenu } from './popover-menu/PopoverMenu';
import { TextField } from './textfield/TextField';

export class App extends React.Component {
  render() {
    return (
      <div className="app">
        <section className="app__sidebar">
          <h1>Hydrokit</h1>
          <List>
            <ListGroup>
              <ListItem header>Buttons</ListItem>
            </ListGroup>
            <ListGroup>
              <ListItem header>Forms</ListItem>
              <ListItem>Text field</ListItem>
              <ListItem>Checkbox</ListItem>
            </ListGroup>
          </List>
        </section>
        <section className="app__content">
          <section>
            <h2>Buttons</h2>
            <section><Button>Hello</Button></section>
            <section><Button primary>Hello</Button></section>
          </section>

          <section>
            <h2>Forms</h2>
            <FormField label="Label" hint="Hint">
              <TextField placeholder="Text field" />
            </FormField>
            <FormField label="Label" error="Error">
              <TextField placeholder="Text field with error" />
            </FormField>
            <FormField>
              <Checkbox /><label>Checkbox</label>
            </FormField>
          </section>

          <section>
            <h2>Lists</h2>
            <List>
              <ListItem header onClick={e => { /**/ }}>List header</ListItem>
              <ListItem onClick={e => { /**/ }}>Clickable item</ListItem>
              <ListItem>Not clickable</ListItem>
              <ListGroup>
                <ListItem header onClick={e => { /**/ }}>A group header</ListItem>
                <ListItem onClick={e => { /**/ }}>Group item</ListItem>
              </ListGroup>
            </List>
          </section>

          <section>
            <h2>Popover Menu</h2>
            <section>
              <PopoverMenu label={<Button>Toggle</Button>}>
                <List>
                  <ListItem onClick={e => { /**/ }}>Do stuff</ListItem>
                  <ListItem onClick={e => { /**/ }}>Yepp</ListItem>
                </List>
              </PopoverMenu>
            </section>
            <section>
              <PopoverMenu dark label={<Button>Toggle</Button>}>
                <List>
                  <ListItem onClick={e => { /**/ }}>Manually opened menu</ListItem>
                  <ListItem onClick={e => { /**/ }}>Yepp</ListItem>
                </List>
              </PopoverMenu>
            </section>
          </section>
        </section>
      </div>
    );
  }
}