// MENU TOGGLE
$('.menu-toggle').click(function() {
    $('ul').toggleClass('opening');
    $(this).toggleClass('open');
});

var model = {

    currentCat: null,
    adminShow: false,
    cats: [
        {
            name: 'Flokinho',
            image: '../images/cat-1.jpg',
            description: 'Flokinho é bonitinho mais não se engane ele é um bagunceiro :)',
            like: 0
        },{
            name: 'Belinha',
            image: '../images/cat-2.jpg',
            description: 'Belinha é tímida mais depois que te conhece é uma brincalhona.',
            like: 0
        }, {
            name: 'Luna',
            image: '../images/cat-3.jpg',
            description: 'Luna é serena e confiante uma verdadeira mãe.',
            like: 0
        },{
            name: 'Lirio',
            image: '../images/cat-4.jpg',
            description: 'Lirio é curioso e preguiçoso, já deve estar dormindo.',
            like: 0
        },{
            name: 'Nina',
            image: '../images/cat-5.jpg',
            description: 'Nina é um bebê de primeira, gosta muito de brincar com bola.',
            like: 0
        }
    ]
};

var octopus = {

    init: function() {
        model.currentCat = model.cats[Math.floor(Math.random() * model.cats.length)];
        catListView.init();
        view.init();
        adminView.init();
        adminView.hide();
    },
    
    getCurrentCat: function() {
       return model.currentCat;
    },

    getCats: function() {
        return model.cats;
    },

    setCurrentCat: function(cat) {
        model.currentCat = cat
    },

    incrementCounter: function() {
        model.currentCat.like++;
        view.render();
    },

    adminDisplay: function() {
        if (model.adminShow === false) {
            model.adminShow = true;
            adminView.show();
        } else if (model.adminShow === true) {
            model.adminShow = false;
            adminView.hide();
        }
    },
    
    adminCancel: function(){
        adminView.hide();
    },
    
    adminSave: function(){
        model.currentCat.name = adminCatName.value;
        model.currentCat.image = adminCatImage.value;
        model.currentCat.description = adminCatDescription.value;
        model.currentCat.like = adminCatLike.value;
        view.render();
        catListView.render();
        adminView.hide();
    }
};


var view = {

    init: function() {
        this.catElement = $('#cat')[0];
        this.catName = $('#cat-name')[0];
        this.catImage = $('#cat-image')[0];
        this.catDescription = $('#cat-description')[0];
        this.catLike = $('#cat-like')[0];

        this.catImage.addEventListener('click', function() {
            octopus.incrementCounter();
        });

        this.render();
    },

    render: function() {
        var currentCat = octopus.getCurrentCat();
        this.catName.textContent = currentCat.name;
        this.catImage.src = currentCat.image;
        this.catDescription.textContent = currentCat.description;
        this.catLike.textContent = currentCat.like;        
    }
};

var catListView = {

    init: function() {
        this.catListElem = $('#cat-list')[0];
        this.render();
    },

    render: function() {
        var cat, elem, i;
        var cats = octopus.getCats();
        this.catListElem.innerHTML= '';

        for (i = 0; i < cats.length; i++) {
            cat = cats[i];

            elem = document.createElement('li');
            elemen = document.createElement('a');
            elemen.textContent = cat.name;

            elemen.addEventListener('click', (function(catCopy) {
                return function() {
                    octopus.setCurrentCat(catCopy);
                    view.render();
                    adminView.render();
                };
            })(cat));

            this.catListElem.appendChild(elem).appendChild(elemen);
        }
    }
};

var adminView = {

    init: function() {
        this.adminCatName = $("#name")[0];
        this.adminCatImage = $("#image")[0];
        this.adminCatDescription = $("#description")[0];
        this.adminCatLike = $("#like")[0];

        var admin = $("#admin");
        
        this.adminBtn = $(".btn-admin")[0];
        this.adminCancel = $(".btn-cancel")[0];
        this.adminSave = $(".btn-save")[0];
        
        this.adminBtn.addEventListener('click', function() { 
            octopus.adminDisplay();
        });
        
        this.adminCancel.addEventListener('click', function() { 
            octopus.adminCancel();
        });
        
        this.adminSave.addEventListener('click', function() {
            octopus.adminSave();
        });
        
        this.render();
    },
    
    render: function(){
        var currentCat = octopus.getCurrentCat();
        this.adminCatName.value = currentCat.name;
        this.adminCatImage.value = currentCat.image;
        this.adminCatDescription.value = currentCat.description;
        this.adminCatLike.value = currentCat.like;
    },
    
    show: function() {
        admin.style.display = 'block';
    },
        
    hide: function() {
        admin.style.display = 'none';
    }

};

octopus.init();
