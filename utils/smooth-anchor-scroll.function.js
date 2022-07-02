/**
 * @param id (string) of the element to anchor scroll to.
 * @param options (object) configuring properties of the scroll (see below for more details)
 * @returns a promise resolving when the scroll is finished.
 * 
 * interface SmoothAnchorScrollOptions {
 *   msPerFrame: number; // Number of milliseconds per frame. Default is ~~16.7ms for 60fps.
 *   duration: number; // Duration in milliseconds of the scroll. Default is 300ms.
 * }
 */
export function smoothAnchorScroll(id, options) {
    const msPerFrame = options?.msPerFrame ?? (1000 / 60);
    /** In milliseconds. */
    const duration = options?.duration ?? 300;
    const frames = duration / msPerFrame;

    let i = 1;

    const page = document.body;
    const anchor = document.getElementById(id);

    const distance = anchor.getBoundingClientRect().y;
    const scrollTopPerFrame = distance / frames;

    return new Promise(resolve => {
        const setIntervalId = setInterval(() => {
            if (i >= frames) {
                clearInterval(setIntervalId);

                resolve();
            }

            page.scrollBy({ top: scrollTopPerFrame });

            i = i + 1;
        }, msPerFrame);
    });
};