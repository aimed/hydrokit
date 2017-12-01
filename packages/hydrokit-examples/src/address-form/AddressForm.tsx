import * as React from 'react';

import { FormField } from '../formfield/FormField';
import { TextField } from '../textfield/TextField';

export interface AddressFormState {}
export interface AddressFormProps {}

export class AddressForm extends React.Component<AddressFormProps, AddressFormState> {
  render() {
    return (
        <form onSubmit={e => e.preventDefault()}>
            <fieldset>
                <FormField>
                    <TextField placeholder="Search" />
                </FormField>
            </fieldset>
        </form>
    );
  }
}
