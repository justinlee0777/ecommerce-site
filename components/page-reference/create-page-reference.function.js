import { smoothAnchorScroll } from '../../utils/smooth-anchor-scroll.function.js';

/**
 * Adds a "page reference" component, which keeps track of where the user is on the page based on a list of element IDs
 * it needs to keep track of. This component has a fixed position on the page, always on the right side of the viewport.
 * @params ids of the elements to keep track of.
 * @returns undefined.
 */
export function createPageReference(ids) {
	// Private functions

	/**
	 * @param index (number) is optional. Used to explicitly set which dot to be active.
	 */
	function updatePageReferences(index) {
		if (typeof index !== 'number') {
			index = sectionIds
				.map((sectionId) => document.getElementById(sectionId))
				.findIndex(
					(element) => Math.floor(element.getBoundingClientRect().y) <= 0
				);

			if (index < 0) {
				index = 0;
			} else {
				index = Math.abs(index - (sectionIds.length - 1));
			}
		}

		const dots = document.querySelectorAll('.page-reference-anchor');

		[...dots].forEach((dot, i) => {
			if (i === index) {
				dot.style.backgroundColor = 'black';
			} else {
				dot.style.backgroundColor = 'white';
			}
		});
	}

	// Create HTML.

	const pageReference = document.createElement('div');
	pageReference.classList.add('page-reference');

	ids.forEach((id, i) => {
		const pageReferenceAnchor = document.createElement('div');
		pageReferenceAnchor.classList.add('page-reference-anchor');

		pageReferenceAnchor.addEventListener('click', () => {
			smoothAnchorScroll(id).then(() => updatePageReferences(i));
		});

		pageReference.appendChild(pageReferenceAnchor);
	});

	// Create scrolling listener.

	const sectionIds = ids.reverse();

	[document.body, document.documentElement, window].forEach((rootElement) => {
		rootElement.addEventListener('scroll', updatePageReferences, {
			passive: true,
		});
	});

	document.body.appendChild(pageReference);

	updatePageReferences();
}
