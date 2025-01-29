export function $(selector: string) {
    let self = {
        element: document.querySelector(selector) as HTMLElement | null,

        css: (name: string, value: string) => {
            if (self.element) {
                self.element.style[name as any] = value;
            }
        },

        on: (event: string, callback: EventListenerOrEventListenerObject) => {
            if (self.element) {
                self.element.addEventListener(event, callback);
            }
        }
    };

    return self;
}







// let stateCheck = setInterval(() => {
//         if (document.readyState === 'complete') {
//             clearInterval(stateCheck);
//             // document ready
//         }
//     }, 100);


// document.onreadystatechange = () => {
//     if (document.readyState === 'complete') {
//       // document ready
//     }
//   };
