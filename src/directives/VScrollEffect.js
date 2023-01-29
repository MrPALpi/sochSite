export default {
    mounted(el, binding) {
        function onEntry(entry){
            entry.forEach(change => {
              if (change.isIntersecting){
                change.target.classList.add('element-show');
                // return
              }
              // change.target.classList.remove('element-show');
            });
        }
        const options = {
            threshold: [0.1]
        };
        const observer = new IntersectionObserver(onEntry, options);
        // let elements;
        if (binding.value){
            const elma = document.querySelector('.'+ el.classList[0]);
            observer.observe(elma);
            // console.log('сработало');
        }
        else{
            const elements = document.querySelectorAll('.'+ el.classList[0]);
        // console.log(binding.value);
        for (let elm of elements) {
            observer.observe(elm);
        }
    }
    // console.log( 'from my derective',el.classList, binding);
    }   
}