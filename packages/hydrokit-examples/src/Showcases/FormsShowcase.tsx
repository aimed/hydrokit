import * as React from 'react';

import { Select, SelectOption } from '@hydrokit/select';
import { computed, observable } from 'mobx';

import { Checkbox } from '@hydrokit/checkbox';
import { FormField } from '@hydrokit/formfield';
import { Showcase } from '../Showcase/Showcase';
import { TextField } from '@hydrokit/textfield';
import { Timepicker } from '@hydrokit/datepicker';
import { observer } from 'mobx-react';

export interface FormsShowcaseState { }
export interface FormsShowcaseProps { }

@observer
export class FormsShowcase extends React.Component<FormsShowcaseProps, FormsShowcaseState> {
  options: string[] = ['one', 'two', 'three'];
  
  @observable
  selected: string | undefined;

  @observable
  search: string = '';

  @computed
  get filteredOptions(): string[] {
    return this.options.filter(o => this.search === '' || o.indexOf(this.search) === 0);
  }

  render() {
    return (
      <Showcase title="Forms">
        <FormField label="Label" hint="Hint" htmlFor="text-field">
          <TextField placeholder="Text field" id="text-field" />
        </FormField>
        <FormField label="Label" error="Error" htmlFor="text-field-with-error">
          <TextField placeholder="Text field with error" id="text-field-with-error" />
        </FormField>
        <FormField>
          <Checkbox id="checkbox" /><label htmlFor="checkbox">Checkbox</label>
        </FormField>
        <FormField>
          <Select 
            placeholder={'Select'}
            options={this.options.map(value => ({ value, label: value }))}
            onSelect={(o: SelectOption<string>) => this.selected = o.value}
            value={this.selected}
          />
        </FormField>
        <FormField>
          <Select 
            placeholder={'Select search'}
            options={this.filteredOptions.map(value => ({ value, label: value }))}
            onSelect={(o: SelectOption<string>) => this.selected = o.value}
            value={this.selected}
            onSearch={s => this.search = s}
          />
        </FormField>
        <FormField label="Timepicker">
          <Timepicker />
        </FormField>
      </Showcase>
    );
  }
}
