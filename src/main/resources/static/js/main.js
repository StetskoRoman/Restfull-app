var app = new Vue({
    el: '#app', //за каким элементом следит view,  #говорит что это id с именем app
    data: {
        message: 'Привет, Vue!'
    }
})

var app2 = new Vue({
    el: '#app-2',
    data: {
        message: 'Вы загрузили эту страницу: ' + new Date().toLocaleString()
    }
})