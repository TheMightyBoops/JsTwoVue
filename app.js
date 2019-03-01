//Vue Components
Vue.component('line-item', {
    props: ['item'],
    methods: {
        toggleFavorite: function (event) {
            if (this.item.isFavorite) {
                this.item.isFavorite = false;
            } else {
                this.item.isFavorite = true;
            }
        },

        deleteItem: function (event) {
            if (confirm("Are you sure?")) {
                Vue.delete(this.item);
            } else {
                //do nothing
            }
        }
    },
    template: '<li>{{item.name}} {{item.quantity}} {{item.isFavorite}} ' +
    '<button v-on:click="toggleFavorite">Favorite</button>' +
    '<button v-on:click="$emit(\'remove\')">Delete</button></li>'
});

new Vue({

    el: "#app",
    data: {
        items: [
            {id: 1, name: 'An item', quantity: 7, isFavorite: false},
            {id: 2, name: 'Number two', quantity: 1, isFavorite: true},
            {id: 3, name: 'Three', quantity: 3, isFavorite: false}
        ],

        tempName: " ",
        tempQuantity: 0,

        displayOnlyFavorites: false
    },

    methods: {
        addItem() {


            for (let i = 0; i < this.items.length; ++i) {

                if (this.items[i].name.trim() === this.tempName.trim()) {
                    this.items[i].quantity = parseInt(this.tempQuantity) + parseInt(this.items[i].quantity);
                    break;
                }



                if (i === (this.items.length - 1)) {
                    let unusedId = i + 2;
                    let makeSureIsInt = this.tempQuantity;
                    let newItem = {
                        id: unusedId,
                        name: this.tempName,
                        quantity: makeSureIsInt,
                        isFavorite: false
                    };

                    this.items.push(newItem);
                    break;
                }

            }

            if(this.items.length === 0) {
                let newItem = {
                    id: 0,
                    name: this.tempName,
                    quantity: this.quantity,
                    isFavorite:false
                };

                this.items.push(newItem)
            }
        },
    },

    computed: {
        filteredItems() {
            return this.items.filter(item => {return item.isFavorite === true})
        }
    }
});

