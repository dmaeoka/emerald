import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import basePath from '@salesforce/community/basePath';

const columns = [
	{
		label: 'Date',
		fieldName: 'effectiveDate',
		type: 'text',
		fixedWidth: 120
	},
	{
		label: 'Period',
		fieldName: 'period',
		fixedWidth: 100
	},
	{
		label: 'Type',
		fieldName: 'transactionType',
		type: 'text',
		wrapText: true
	},
	{
		label: 'Credit',
		fieldName: 'credit',
		type: 'currency',
		fixedWidth: 120,
		typeAttributes: {
			currencyCode: 'GBP',
			step: '0.01'
		}
	},
	{
		label: 'Debit',
		fieldName: 'debit',
		type: 'currency',
		fixedWidth: 120,
		typeAttributes: {
			currencyCode: 'GBP',
			step: '0.01'
		}
	},
	{
		label: 'Balance',
		fieldName: 'balance',
		type: 'currency',
		fixedWidth: 120,
		typeAttributes: {
			currencyCode: 'GBP',
			step: '0.01'
		}
	}
	// {
	// 	label: 'Type',
	// 	fieldName: 'amount',
	// 	type: 'currency',
	// 	typeAttributes: {
	// 		currencyCode: 'GBP',
	// 		step: '0.001'
	// 	},
	// },
	// {
	// 	label: 'Contact Email',
	// 	fieldName: 'contact',
	// 	type: 'email'
	// },
	// {
	// 	label: 'Contact Phone',
	// 	fieldName: 'phone',
	// 	type: 'phone'
	// },
];

const mockData1 = [
	{
		id: 17446516,
		period: 35,
		effectiveDate: '29/11/2021',
		transactionType: 'STANDARD DEBIT',
		debit: 75.14,
		credit: 0,
		balance: 350.62
	},
	{
		id: 17428882,
		period: 34,
		effectiveDate: '22/11/2021',
		transactionType: 'STANDARD DEBIT',
		debit: 75.14,
		credit: 0,
		balance: 275.48
	},
	{
		id: 17337832,
		period: 33,
		effectiveDate: '11/10/2021',
		transactionType: 'PAYMENT RECEIVED FROM THE ACCOUNT HOLDER',
		transactionSubType: 'Direct Debit',
		debit: 0,
		credit: 275.48,
		balance: 275.48
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
