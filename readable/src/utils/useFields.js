import { useState } from 'react';

//Manage form's fields
export function useFormImput(initialValue) {
	const [ value, setValue ] = useState(initialValue);

	function handleChange(e) {
		setValue(e.target.value);
	}

	return {
		value,
		onChange: handleChange,
		bind: { reset: () => setValue('') }
	};
}
