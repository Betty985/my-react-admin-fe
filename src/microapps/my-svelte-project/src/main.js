import App from './App.svelte';
let app;
const render = (container) => {
    app = new App({
        target: container ?? document.body,
        props: {
            name: 'world',
        },
    });
};

((global) => {
    global['svelte'] = {
        bootstrap: () => {
            console.log('svelte bootstrap');
            return Promise.resolve();
        },
        mount: () => {
            console.log('svelte mount');
            return render(document.querySelector('#container'));
        },
        unmount: () => {
            console.log('svelte unmount');
            return Promise.resolve();
        },
    };
})(window);
export default app;
