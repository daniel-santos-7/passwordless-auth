function backgroundSquaresAnimation(element) {
    
    const random = (max,min) => min + Math.floor(Math.random()*(max-min));

    Array.from({ length:10 }).map(()=> {

        const square = document.createElement('div');

        square.style.width = random(100,200) + 'px';

        square.style.height = random(50,150) + 'px';

        square.style.left = random(0,100) + '%';

        square.style.animationDelay = random(0,5) + 's';

        return square;
    
    }).forEach(square => element.appendChild(square));

}

backgroundSquaresAnimation(document.getElementById('background-squares-animation'));