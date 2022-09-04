const lazySetups: (() => void)[] = [];

/**
 * Add a Lazy Setup function to the queue to be executed at build time.
 *
 * Use this to allow variables to be accessed inside the setup functions before they are declared
 *
 * @param setup {() => void} Callback function to be invoked at a later stage
 */
export const addLazySetup = (setup: () => void) => lazySetups.push(setup);

/**
 * Removes one item from the lazySetups list and runs it.
 *
 * As items are nested this could result in a new lazySetup being added. This
 * process is recursive and will continue running all lazySetups until no more occur.
 */
export const runLazySetups = () => {
  lazySetups.pop()?.();
  if (lazySetups.length > 0) runLazySetups();
};
