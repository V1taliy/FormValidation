var validatorMethods = {
    notEmpty: function (el) {
        if (el.value == '') {
            return false;
        }
        return true;
    },
    pattern: function (el, pattrn) {
        return pattrn.test(el.value)
    },
    selected: function (el) {
        for (var i = 0; i < el.length; i++) {
            if (el[i].checked) return true;
        }
        return false;
    },
    wrongType: function (el) {
        if (typeof el) {
            return true;
        }
        return false;
    }
}

function Validator(settings) {
    var formEl = document.getElementById(settings.id);
    var formFields = formEl.elements;
    var errors = [];
    var rulesPattern = {
        email: /^\w{1,}@\w{1,}\.\w{2,}$/,
        tetxtarea: /['\'','\"'.b\d]/,
    }

    var showError = function (el) {
        el.parentNode.classList.remove('success');
        el.parentNode.classList.add('error');
        el.nextElementSibling.innerHTML = el.dataset.error;
    }
    var showSuccess = function (el) {
        el.parentNode.classList.remove('error');
        el.parentNode.classList.add(success);
        el.nextElementSibling.innerHTML = '';
    }

    var isValid = function (el) {
        var methods = setting.methods[el.getAttribute('id')];
        if (methods !== undefined) {
            for (var i = 0; i < methods.length; i++) {
                if (validatorMethods[methods[i][0]](el.methods[i][1])) {
                    error.push({ el: el });
                }
            }
            for (var i = 0; i < error.length; i++) {
                if (error[i].el == el) {
                    return false;
                }
            }
        }
        return true;
    }


    var chekIt = function () {
        if (isValid(this)) {
            showSucces(this);
            for (var i = 0; i < error.length; i++) {
                if (error[i].el == this) {
                    delete (error[i]);
                }
            }
        } else {
            showError(this);
            error.push({
                el: this,
            })
        }
    }

    for (var i = 0; i < formFields.length; i++) {
        if (formFields[i].tagName == 'BUTTON') {
            continue;
        }

        formFields[i].addEventListener('change', chekIt);
    }
    for (var prop in setting.pattern) {
        rulesPattern[prop] = settings.pattern[prop]
    }
}

var v = new Validator({
    id: 'myForm',
    methods: {
        'fname': [
            ['notEmpty'],
            ['pattern', 'tetxtarea']
        ],
        'lname': [
            ['notEmpty'],
            ['pattern', 'tetxtarea']
        ],
        'sex': [
            ['notEmpty'],
            ['selected'],
        ],
        'country': [
            ['notEmpty'],
            ['selected'],
        ],
        'email': [
            ['notEmpty'],
            ['pattern', 'email']
        ],
        'password': [
            ['notEmpty'],
        ],
        'adress': [
            ['notEmpty'],
            ['pattern', 'tetxtarea']
        ]
    }
}) 
