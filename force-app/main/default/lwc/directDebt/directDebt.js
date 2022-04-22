import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import basePath from '@salesforce/community/basePath';

const columns = [
	{
		label: 'Duo date',
		fieldName: 'dueDate',
		type: 'text'
	},
	{
		label: 'Payment Amount',
		fieldName: 'paymentAmount',
		type: 'currency',
		typeAttributes: {
			currencyCode: 'GBP',
			step: '0.01'
		}
	}
];

const mockData1 = [
	{
		id: 1,
		dueDate: '20/01/2022',
		paymentAmount: 385.14
	},
	{
		id: 2,
		dueDate: '02/01/2013',
		paymentAmount: 35.3
	}
];

export default class Transactions extends NavigationMixin(LightningElement) {
	data = mockData1;
	columns = columns;

	handleBack(e) {
		e.preventDefault();
		this[NavigationMixin.Navigate]({
			type: 'standard__webPage',
			attributes: {
				url: `${basePath}/tenancy-dashboard`
			}
		});
	}
}
