const iconMenu = document.querySelector('.header__burger');
const menuBody = document.querySelector('.header__menu');
if (iconMenu) {
    iconMenu.addEventListener('click', function (e) {
        document.body.classList.toggle('lock');
        iconMenu.classList.toggle('active');
        menuBody.classList.toggle('active');
    });
};
const popupCloseBurger = document.querySelector('.header__btn');
if (popupCloseBurger) {
    popupCloseBurger.addEventListener('click', () => {
        iconMenu.classList.toggle('active');
        menuBody.classList.toggle('active');
    });
}

const phone = document.querySelector('.phone');
const newPhone = phone.textContent.split(' - ');
if (window.innerWidth < 1201) { phone.innerHTML = newPhone[1] }

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener('click', onMenuLinkClick)
    });
    function onMenuLinkClick(e) {
        e.preventDefault();
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            let someValue;
            if (window.innerWidth < 993) { someValue = document.querySelector('.header__container').offsetHeight }
            else { someValue = 20 };
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - someValue;
            if (iconMenu.classList.contains('active')) {
                document.body.classList.remove('lock');
                iconMenu.classList.remove('active');
                menuBody.classList.remove('active');
            }
            console.log(gotoBlockValue);
            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
        }
    }
};

const number = document.querySelector('.number');
const email = document.querySelector('.email');
const name = document.querySelector('.name');
const company = document.querySelector('.company');
const error = document.querySelector('.submit__error');
const errorPhone = document.querySelector('.submit__error-phone');
const errorEmail = document.querySelector('.submit__error-email');
const input = document.querySelector('.input');
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('subscribe_form');
    form.addEventListener('submit', formSend);
    function formSend(e) {
        e.preventDefault();
        if (error.classList.contains('active')) { error.classList.remove('active'); }
        if (errorPhone.classList.contains('active')) { errorPhone.classList.remove('active'); }
        if (errorEmail.classList.contains('active')) { errorEmail.classList.remove('active'); }
        if (number.classList.contains('error')) { number.classList.remove('error'); }
        if (email.classList.contains('error')) { email.classList.remove('error'); }
        if (name.classList.contains('error')) { name.classList.remove('error'); }
        if (company.classList.contains('error')) { company.classList.remove('error'); }
        if (number.value == '') {
            if (!error.classList.contains('active')) { error.classList.add('active') };
            number.classList.add('error');
        }
        if (email.value == '') {
            if (!error.classList.contains('active')) { error.classList.add('active') };
            email.classList.add('error');
        }
        if (name.value == '') {
            if (!error.classList.contains('active')) { error.classList.add('active') };
            name.classList.add('error');
        }
        if (company.value == '') {
            if (!error.classList.contains('active')) { error.classList.add('active') };
            company.classList.add('error');
        }
        if (emailTest(email) && number.value != '' && email.value != '' && name.value != '' && company.value != '') {
            email.classList.add('error');
            if (!errorEmail.classList.contains('active')) { errorEmail.classList.add('active') };
        }
        if (!numberTest(number) && number.value != '' && email.value != '' && name.value != '' && company.value != '') {
            number.classList.add('error');
            if (!errorPhone.classList.contains('active')) { errorPhone.classList.add('active') };
        }
        if (!emailTest(email) && numberTest(number) && number.value != '' && email.value != '' && name.value != '' && company.value != '') {
            form.reset();
            form.classList.add('well');
            /* let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                form.reset();
                form.classList.remove('sending');
            } else {
                alert('Error');
                form.classList.remove('sending');
            } */
            setTimeout(() => {
                form.classList.remove('well');
            }, 2000);
        }
    }
    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
    };
    function numberTest(input) {
        return /^\d[\d\(\)\ -]{4,14}\d$/.test(number.value);
    };
});