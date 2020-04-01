'use strict';

$.get('./data/page-1.json')
    .then(data => {
        let newHorn;
        //    console.log(data);
        data.forEach((element) => {

            newHorn = new Horn(element);
            var renderOption = newHorn.render()
            $('#newtemplate').append(renderOption);

        });
        bulder();
        console.log(Keywords.array);
        Keywords.array.forEach(element => {
            console.log(element);
            let options = $('#option').html();
            let sndHtml = Mustache.render(options, element);
            $('#selectClone').append(sndHtml);
        });

        sortArr.forEach(element => {
            theOption(element);
        });

    })
    .then(() => selection());


function Keywords(element) {
    this.keyOption = element;
}
Keywords.array = [];

function bulder() {
    keywordArr.forEach(element => {
        let key = new Keywords(element);
        Keywords.array.push(key);
    });
}
function Horn(element) {
    this.image_url = element.image_url;
    this.title = element.title;
    this.description = element.description;
    this.keyword = element.keyword;
    // console.log(this.keyword);
    this.horns = element.horns;
    hornArr.push(this);
    if (keywordArr.includes(this.keyword) === false) {
        keywordArr.push(this.keyword);
    }
}
let hornArr = [];
let keywordArr = [];
// console.log(keywordArr);

Horn.prototype.render = function () {

    let newDiv = $('#neigh-template').html();
    let html = Mustache.render(newDiv, this);
    $('#newtemplate').append(html);

    
}

Horn.prototype.theOption = function () {
    let options = $('#option').html();
    let sndHtml = Mustache.render(options, this)
    console.log(this);
    return sndHtml;
}
function selection() {
    $('select').on('change', function () {

        let selected = $(this).val();
        console.log(selected);
        let allselected = hornArr.filter((element) => element.keyword === selected || element.title===selected);
        console.log(allselected);
        $('div').remove();
        allselected.forEach(value => {
            if (value === 'text') {
                hornArr.sort((a, b) => {
                    if (a.title < b.title) {
                        return -1;
                    }
                    else {
                        return 1;
                    }
                });
            }else{
                if (value === 'num') {
                    allselected.sort((a, b) => {
                      return a.horns - b.horns;
                    });
            }}
            value.render();

        });

    });
}

// ---------------------sort---------------------------
// --------------------------------------------------

let sortArr = ['title', 'horn'];
function theOption(element) {

    let options = $('<option></option>').text(element);
    $('#sortBy').append(options);

}

