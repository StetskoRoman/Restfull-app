// не хороший код, так не пишется...
function getIndex(list, id) {
    for (var i = 0; i < list.length; i++ ) {
        if (list[i].id === id) {
            return i;
        }
    }

    return -1;
}


var messageApi = Vue.resource('/message{/id}');

Vue.component('message-form', {
    props: ['messages', 'messageAttr'],
    data: function() {  //конвенция такая, data это функция которая будет возвращать объект
        return {
            text: '',
            id: ''
        }
    },
    watch: {   // наблюдатель, следит за этими переменными
        messageAttr: function(newVal, oldVal) {
            this.text = newVal.text;
            this.id = newVal.id;
        }
    },
    template:  // какой блок template несет
        '<div>' +
        '<input type="text" placeholder="Write something" v-model="text" />' +
        '<input type="button" value="Save" @click="save" />' +  //добавить слово
        '</div>',
    methods: {  // добавить сообщение
        save: function() {
            var message = { text: this.text };

            if (this.id) {
                messageApi.update({id: this.id}, message).then(result =>
                    result.json().then(data => {
                        var index = getIndex(this.messages, data.id);
                        this.messages.splice(index, 1, data);
                        this.text = ''
                        this.id = ''
                    })
                )
            } else {
                messageApi.save({}, message).then(result =>
                    result.json().then(data => {
                        this.messages.push(data);
                        this.text = ''
                    })
                )
            }
        }
    }
});

Vue.component('message-row', {
    props: ['message', 'editMethod', 'messages'],
    template: '<div>' +
        '<i>({{ message.id }})</i> {{ message.text }}' +
        '<span style="position: absolute; right: 0">' +
        '<input type="button" value="Edit" @click="edit" />' +  //меняем элемент
        '<input type="button" value="X" @click="del" />' +
        '</span>' +
        '</div>',
    methods: {
        edit: function() {
            this.editMethod(this.message);
        },
        del: function() {
            messageApi.remove({id: this.message.id}).then(result => {
                if (result.ok) {
                    this.messages.splice(this.messages.indexOf(this.message), 1)
                }
            })
        }
    }
});

Vue.component('messages-list', {
    props: ['messages'],
    data: function() {
        return {
            message: null
        }
    },
    template:
        '<div style="position: relative; width: 300px;">' +
        '<message-form :messages="messages" :messageAttr="message" />' +
        '<message-row v-for="message in messages" :key="message.id" :message="message" ' +
        ':editMethod="editMethod" :messages="messages" />' +
        '</div>',
    created: function() {
        messageApi.get().then(result =>
            result.json().then(data =>
                data.forEach(message => this.messages.push(message))
            )
        )
    },
    methods: {
        editMethod: function(message) {
            this.message = message;
        }
    }
});

var app = new Vue({
    el: '#app',
    template: '<messages-list :messages="messages" />',
    data: {
        messages: []
    }
});




// // компоненты описываются до того как они будут использоваться, поэтому важно чтобы компоненты БЫЛИ ВЫШЕ
//сдаюсь..., это слишком тупо
// var messageApi = Vue.resource('/message{/id}');
//
// Vue.component('message-row', {
//     props: ['message'],
//     template: '<div><i>({{message.id}}</i>{{message.text}}</div>'
// });
//
// Vue.component('messages-list', {
//     props: ['messages'], //чтобы компонент знал что в него данные входят
//     template: '<div>' +
//         'v-for="message in messages" :key="message.id" :message="message" />' +
//         '</div>', //то что будет отображать  {{message.text}} -mustache...
//     created: function () {
//         messageApi.get().then(res=>res.json().then(data => console.log(data))); // после этого у нас есть
//     },
// });
//
// //app - это компонент, template - описывает разметку  которую мы хотим видеть
// var app = new Vue({
//     el: '#app', //за каким элементом следит view,  #говорит что это id с именем app
//     template: '<messages-list :messages="messages"/>',
//     data: {
//         messages: [
//             {id: '123', text: 'Wow'},
//             {id: '23', text: 'second'},
//             {id: '323', text: 'third'}
//         ]  //переменная объекта app - можем изменять из консоли в браузере
//     }
// });



var app2 = new Vue({
    el: '#app-2',
    data: {
        message: 'Вы загрузили эту страницу: ' + new Date().toLocaleString()
    }
})