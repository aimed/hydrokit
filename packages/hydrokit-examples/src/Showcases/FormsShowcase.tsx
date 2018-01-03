import * as React from 'react';

import { computed, observable } from 'mobx';

import { Checkbox } from '@hydrokit/checkbox';
import { FormField } from '@hydrokit/formfield';
import { Select } from '@hydrokit/select';
import { SelectOption } from '../../../hydrokit-select/build/Select';
import { Showcase } from '../Showcase/Showcase';
import { TextField } from '@hydrokit/textField';
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
        <FormField label="Label" hint="Hint">
          <TextField placeholder="Text field" />
        </FormField>
        <FormField label="Label" error="Error">
          <TextField placeholder="Text field with error" />
        </FormField>
        <FormField>
          <Checkbox /><label>Checkbox</label>
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
      </Showcase>
    );
  }
}
