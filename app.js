//Vue Components
Vue.component('line-item',{
    props:['item'],
    template: '<li>{{item.id}} {{item.name}} {{item.quantity}} {{item.isFavorite}}</li>'
});

Vue.component('favorite-button',{
    props:['item'],
    methods:{
        toggleFav: function () {
            
        }
    },
    template:'<button v-on:toggle-fav>favorite</button>'
});


new Vue({

    el:"#app",
    data: {
        items: [
            { id: 1, name: 'An item', quantity: 7, isFavorite: false},
            { id: 1, name: 'Number two', quantity: 1, isFavorite: true},
            { id: 1, name: 'Three', quantity: 3, isFavorite: false}
        ]
    }
});

