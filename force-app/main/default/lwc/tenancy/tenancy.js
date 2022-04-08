/* eslint-disable @lwc/lwc/no-api-reassignments */
import { LightningElement, api, track } from 'lwc';
import healthAlive from '@salesforce/apex/LWCRest.healthAlive';
import getTenancies from '@salesforce/apex/LWCRest.getTenancies';
import getName from '@salesforce/apex/LWCRest.getName';

export default class Tenancy extends LightningElement {
	@api pageTitle;
	@api status;
	@api tenancies;
	@track responsedata;

	connectedCallback() {
		this.status = '';
		this.tenancies = [];

		healthAlive()
			.then(result => JSON.parse(result))
			.then(result => {
				this.status = result.status;
			})
			.catch(error => console.log(error));

		getTenancies()
			.then(result => JSON.parse(result))
			.then(result => {
				console.log(result);
				this.tenancies = result;
			})
			.catch(error => console.log(error));
	}
}
