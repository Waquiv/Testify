let options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.8,
};

const target = document.querySelector(".inner-container")
console.log(target);
let observer = new IntersectionObserver((entries, observer)=>{
    console.log(entries);
    console.log(observer);
}, options)

//observer.observe(target);