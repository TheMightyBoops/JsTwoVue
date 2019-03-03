

//Vue Components
Vue.component('line-item', {
    props: {item:Object, nameOfItemToEdit:String},
    methods: {
        toggleFavorite: function (event) {
            if (this.item.isFavorite) {
                this.item.isFavorite = false;
            } else {
                this.item.isFavorite = true;
            }
        },

        editThisItemByName: function(event) {
          this.$parent.$parent.$parent.$parent.nameOfItemToEdit = this.item.name;
        }
    }

    ,
    template: '<v-list><li>{{item.name}}<i class=material-icons v-if="item.isFavorite">favorite</i></li> ' +
    '<li><strong>Qty:</strong>{{item.quantity}}</li>' +
    '<v-btn color="success" v-on:click="toggleFavorite">Favorite</v-btn>' +
    '<v-btn color="warning" v-on:click="editThisItemByName">edit</v-btn>'+
    '<v-btn color="error" v-on:click="$emit(\'remove\')">Delete</v-btn></v-list>'
});

new Vue({

    el: "#app",
    data: {
        items: [
            {id: 1, name: 'Furbies', quantity:20000 , isFavorite: true},
            {id: 2, name: 'Tonnes of AAA batteries', quantity: 100, isFavorite: true},
            {id: 3, name: 'Furby Sized Rail Guns', quantity: 200000, isFavorite: false},
            {id: 4, name: 'Ai-chips', quantity:200000, isFavorite:false}
        ],

        tempName: " ",
        tempQuantity: 0,

        displayOnlyFavorites: false,

        nameOfItemToEdit: " ",
        nameToChangeItTo: " ",
        quantityToChangeItTo: " "
    },

    methods: {
        addItem() {

            if(this.tempName.trim() !== "") {
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

                if (this.items.length === 0) {
                    let newItem = {
                        id: 0,
                        name: this.tempName,
                        quantity: this.quantity,
                        isFavorite: false
                    };

                    this.items.push(newItem)
                }
            }
        },

        editItem() {
            for(let i=0; i < this.items.length; ++i) {
                if(this.nameOfItemToEdit.trim() === this.items[i].name.trim()) {
                    if(this.nameToChangeItTo.trim() !== '') {
                        this.items[i].name = this.nameToChangeItTo;
                    }

                    this.items[i].quantity = this.quantityToChangeItTo;
                }
            }

            this.nameOfItemToEdit = " ";
        }
    },

    computed: {
        filteredItems() {
            return this.items.filter(item => {return item.isFavorite === true})
        }
    }
});

