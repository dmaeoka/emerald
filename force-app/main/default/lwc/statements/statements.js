import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import basePath from '@salesforce/community/basePath';

const columns = [
	{
		label: 'Statement date',
		fieldName: 'statementDate',
		type: 'text'
	},
	{
		label: 'Period',
		fieldName: 'period'
	},
	{
		label: 'Balance from',
		fieldName: 'balanceFrom',
		type: 'text'
	},
	{
		label: 'Charges',
		fieldName: 'accountCharges',
		type: 'currency',
		typeAttributes: {
			currencyCode: 'GBP',
			step: '0.01'
		}
	},
	{
		label: 'Adjustments',
		fieldName: 'adjustments',
		type: 'currency',
		typeAttributes: {
			currencyCode: 'GBP',
			step: '0.01'
		}
	},
	{
		label: 'Housing benefit',
		fieldName: 'housingBenefit',
		type: 'currency',
		typeAttributes: {
			currencyCode: 'GBP',
			step: '0.01'
		}
	},
	{
		label: 'Net rent',
		fieldName: 'netRent',
		type: 'currency',
		typeAttributes: {
			currencyCode: 'GBP',
			step: '0.01'
		}
	},
	{
		label: 'Payments',
		fieldName: 'payments',
		type: 'currency',
		typeAttributes: {
			currencyCode: 'GBP',
			step: '0.01'
		}
	},
	{
		label: 'Balance',
		fieldName: 'balance',
		type: 'currency',
		typeAttributes: {
			currencyCode: 'GBP',
			step: '0.01'
		}
	}
];

const mockData1 = [
	{
		period: 31,
		balanceFrom: '01/11/2021',
		statementDate: '01/12/2021',
		accountCharges: 0,
		adjustments: 0,
		housingBenefit: 0,
		netRent: 0,
		payments: 0,
		balance: 50.06
	},
	{
		period: 30,
		balanceFrom: '25/10/2021',
		statementDate: '01/12/2021',
		accountCharges: 0,
		adjustments: 0,
		housingBenefit: 0,
		netRent: 0,
		payments: 0,
		balance: -25.08
	},
	{
		period: 29,
		balanceFrom: '18/10/2021',
		statementDate: '01/12/2021',
		accountCharges: 0,
		adjustments: 0,
		housingBenefit: 0,
		netRent: 0,
		payments: 0,
		balance: -100.22
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
