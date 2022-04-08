import { LightningElement, api, wire } from 'lwc';
import { CurrentPageReference, NavigationMixin } from 'lightning/navigation';
import getNavigationMenuItems from '@salesforce/apex/NavigationMenuItemsController.getNavigationMenuItems';
import isGuestUser from '@salesforce/user/isGuest';
import basePath from '@salesforce/community/basePath';

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

	@wire(getNavigationMenuItems, {
		menuName: '$menuName',
		publishedState: '$publishedState'
	})

	wiredMenuItems({ error, data }) {
		if (data && !this.isLoaded) {
			console.log(data);
			this.menuItems = data
				.map((item, index) => {
					return {
						index: index,
						target: item.Target,
						id: index,
						label: item.Label,
						defaultListViewId: item.DefaultListViewId,
						type: item.Type,
						accessRestriction: item.AccessRestriction,
						active: (index === 0) ? 'slds-nav-vertical__item slds-is-active' : 'slds-nav-vertical__item'
					};
				})
				.filter((item) => {
					// Only show "Public" items if guest user
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
	}

	handleClick(e) {
		e.preventDefault();
		this[NavigationMixin.Navigate]({
			type: 'comm__namedPage',
			attributes: {
				name: this.buttonRedirectPageAPIName
			}
		});
	}
}
