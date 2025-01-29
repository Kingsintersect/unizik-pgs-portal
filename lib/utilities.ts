function showSnackBar(): void {
    const snackbar = document.getElementById("snackbar");

    if (!snackbar) {
        console.error('Snackbar element not found');
        return;
    }

    snackbar.className = "show";
    setTimeout((): void => {
        snackbar.className = snackbar.className.replace("show", "");
    }, 3000);
}


function typeWriter(index: number, text: string, speed: number): void {
    // const demoElement = document.getElementById("typeWriter");
    document.addEventListener("DOMContentLoaded", () => {
        const element = document.getElementById("typeWriter");
        if (element) {
            // Element is available in the DOM
            console.log("Element is loaded");
        }

        if (!element) {
            console.error('Element with id "demo" not found');
            return;
        }

        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeWriter, speed);
        }
    });
}

function solomon() {
    window.onscroll = function () { myFunction() };

    var navbar = document.getElementById("navbar");
    var sticky = navbar!.offsetTop;

    function myFunction() {
        if (window.pageYOffset >= sticky) {
            navbar!.classList.add("sticky")
        } else {
            navbar!.classList.remove("sticky");
        }
    }
}

function AnimateElementOnVisiblility() {
    const obsever = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            console.log(entry);
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            } else {
                entry.target.classList.remove("show");
            }
        })
    })

    const hiddenElements = document.querySelectorAll(".hidden");
    hiddenElements.forEach((el) => obsever.observe(el));
}
