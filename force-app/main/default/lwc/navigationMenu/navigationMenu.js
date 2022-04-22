import { LightningElement, api, wire } from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';
import getNavigationMenuItems from '@salesforce/apex/NavigationMenuItemsController.getNavigationMenuItems';
import isGuestUser from '@salesforce/user/isGuest';
import basePath from '@salesforce/community/basePath';

function pageReference(type, target, defaultListViewId) {
	let reference = {};
	if (type === 'SalesforceObject') {
		reference = {
			type: 'standard__objectPage',
			attributes: {
				objectApiName: target
			},
			state: {
				filterName: defaultListViewId
			}
		};
	} else if (type === 'InternalLink') {
		reference = {
			type: 'standard__webPage',
			attributes: {
				url: basePath + target
			}
		};
	} else if (type === 'ExternalLink') {
		reference = {
			type: 'standard__webPage',
			attributes: {
				url: target
			}
		};
	}
	return reference;

	// use the NavigationMixin from lightning/navigation to generate the URL for navigation.
	// if (reference) {
	// 	this[NavigationMixin.GenerateUrl](reference).then(
	// 		(url) => {
	// 			this.href = url;
	// 		}
	// 	);
	// }
}

/**
 * This is a custom LWC navigation menu component.
 * Make sure the Guest user profile has access to the NavigationMenuItemsController apex class.
 */
export default class NavigationMenu extends NavigationMixin(LightningElement) {
	@api menuLabel;
	@api buttonRedirectPageAPIName;
	@api menuName;

	error;
	href = basePath;
	isLoaded;
	menuItems = [];
	publishedState;
	showHamburgerMenu;
	selectedItem = 'item-0';

	@wire(getNavigationMenuItems, {
		menuName: '$menuName',
		publishedState: '$publishedState'
	})
	wiredMenuItems({ error, data }) {
		if (data && !this.isLoaded) {
			this.menuItems = data
				.map((item, index) => {
					return {
						index: `item-${index}`,
						target: item.Target,
						label: item.Label,
						defaultListViewId: item.DefaultListViewId,
						type: item.Type,
						accessRestriction: item.AccessRestriction
					};
				})
				.filter((item) => {
					// Only show "Public" items if guest user
					console.log(item);
					return (
						item.accessRestriction === 'None' ||
						(item.accessRestriction === 'LoginRequired' &&
							!isGuestUser)
					);
				});
			this.error = undefined;
			this.isLoaded = true;
		} else if (error) {
			this.error = error;
			this.menuItems = [];
			this.isLoaded = true;
			console.log(`Navigation menu error: ${JSON.stringify(this.error)}`);
		}
	}

	@wire(CurrentPageReference)
	setCurrentPageReference(currentPageReference) {
		const app =
			currentPageReference &&
			currentPageReference.state &&
			currentPageReference.state.app;
		if (app === 'commeditor') {
			this.publishedState = 'Draft';
		} else {
			this.publishedState = 'Live';
		}

		this.currentPageReference = currentPageReference;
	}

	// renderedCallback() {
	// 	console.log('connectedCallback');
	// }

	handleNavigation() {
		this.dispatchEvent(new CustomEvent('navigation'));
	}

	handleClick(e) {
		// use the NavigationMixin from lightning/navigation to perform the navigation.
		e.stopPropagation();
		e.preventDefault();
		this.handleNavigation();
		const dataset = e.currentTarget.dataset;
		const type = dataset.type;
		const target = dataset.target;
		const defaultListViewId = dataset.defaultListViewId;
		const reference = pageReference(type, target, defaultListViewId);
		if (Object.keys(reference).length > 0) {
			this[NavigationMixin.Navigate](reference);
		}
	}
}
