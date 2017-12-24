import * as React from 'react';

import { FormField } from '@hydrokit/formfield';
import { TextField } from '@hydrokit/textField';

export interface AddressFormState {}
export interface AddressFormProps {}

export class AddressForm extends React.Component<AddressFormProps, AddressFormState> {
  render() {
    return (
        <form onSubmit={e => e.preventDefault()}>
            <fieldset>
                <FormField>
                    <TextField placeholder="Street name" />
                </FormField>
            </fieldset>
        </form>
    );
  }
}
