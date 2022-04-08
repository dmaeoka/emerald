import { LightningElement } from 'lwc';

export default class CustomSelfRegister extends LightningElement {
	label;

	handleClick(evt) {
		this.label = evt.target.label;
	}
}
