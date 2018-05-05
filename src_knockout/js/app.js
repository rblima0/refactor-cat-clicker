var initialCats = [
    {
        name: 'Flokinho',
        image: '../images/cat-1.jpg',
        description: 'Flokinho é bonitinho mais não se engane ele é um bagunceiro :)',
        like: 0,
        nicknames: ['Flokinho', 'Chokito', 'Fiurinha', 'Tortinho']
    },{
        name: 'Belinha',
        image: '../images/cat-2.jpg',
        description: 'Belinha é tímida mais depois que te conhece é uma brincalhona.',
        like: 0,
        nicknames: ['Belinha', 'Liz', 'Bela']
    }, {
        name: 'Luna',
        image: '../images/cat-3.jpg',
        description: 'Luna é serena e confiante uma verdadeira mãe.',
        like: 0,
        nicknames: ['Astroa', 'Presa', 'Viajante']
    },{
        name: 'Lirio',
        image: '../images/cat-4.jpg',
        description: 'Lirio é curioso e preguiçoso, já deve estar dormindo.',
        like: 0,
        nicknames: ['Lindi', 'Castanho', 'Marrom']
    },{
        name: 'Nina',
        image: '../images/cat-5.jpg',
        description: 'Nina é um bebê de primeira, gosta muito de brincar com bola.',
        like: 0,
        nicknames: ['Peppa', 'Pig', 'Luz']
    }
];

var Cat = function(data) {

    this.name = ko.observable(data.name);
    this.image = ko.observable(data.image);
    this.description = ko.observable(data.description);
    this.like = ko.observable(data.like);
    this.nicknames = ko.observableArray(data.nicknames);

    this.level = ko.computed(function() {

		let level;
        const likes = this.like();
        
		if (likes < 10) {
			level = 'Babe';
		} else if(likes < 20) {
			level = 'Infant';
		} else if(likes < 30) {
			level = 'Child';
		} else {
            level = 'Adult';
        }
		return level;
    }, this);    
};

const ViewModel = function() {
    
    var self = this;

    this.catList = ko.observableArray([]);

    initialCats.forEach(function(catItem) {
        self.catList.push(new Cat(catItem));
    });

    this.currentCat = ko.observable( this.catList()[0] );

    this.incrementLike = function() {
        this.like(this.like() + 1);
    };

    this.setCat = function(clickedCat){
        self.currentCat(clickedCat);
    };
    
};

ko.applyBindings(new ViewModel());

// MENU TOGGLE
$('.menu-toggle').click(function() {
    $('ul').toggleClass('opening');
    $(this).toggleClass('open');
});