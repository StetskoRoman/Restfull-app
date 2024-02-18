// компоненты описываются до того как они будут использоваться, поэтому важно чтобы компоненты БЫЛИ ВЫШЕ
Vue.component('message-row', {

});

Vue.component('messages-list', {
    props: ['messages'], //чтобы компонент знал что в него данные входят
    template: '<div><div  v-for="message in messages">>{{message.text}} {{message.id}}</div></div>'  //то что будет отображать  {{message.text}} -mustache...
    // v-for="message in messages" - цикл message - один объект из списка messages - должен быть в одном узле
})

//app - это компонент, template - описывает разметку  которую мы хотим видеть
var app = new Vue({
    el: '#app', //за каким элементом следит view,  #говорит что это id с именем app
    template: '<messages-list :messages="messages"/>',
    data: {
        messages: [
            {id: '123', text: 'Wow'},
            {id: '23', text: 'second'},
            {id: '323', text: 'third'}
        ]  //переменная объекта app - можем изменять из консоли в браузере
    }
});



var app2 = new Vue({
    el: '#app-2',
    data: {
        message: 'Вы загрузили эту страницу: ' + new Date().toLocaleString()
    }
})