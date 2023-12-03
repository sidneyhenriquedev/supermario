const titleWindowModal = document.getElementById('titleWindowModal')
const exampleModalLongTitle = document.getElementById('exampleModalLongTitle')
const footerModal = document.getElementById('footerModal')
const closeModalBtn = document.getElementById('closeModalBtn')
const videotrailer = document.getElementById("videoTrailer")
const btnPause = document.getElementById('btnPause')
const btnPlay = document.getElementById('btnPlay')
const btnPlayAudio = document.getElementById('btnPlayAudio')
const formContactUs = document.getElementById('formContactUs')
const btnContacUS = document.getElementById('btnContacUS')
const checkyes = document.getElementById('yes')
const checkno = document.getElementById('no')
const btnTravelTime = document.getElementById('travelTime')
const modalChoose = document.getElementById('modalChoose')

//title header modal
titleModalMovie.style.fontWeight = '700'
titleModalMovie.style.textShadow = '0.1em 0.1em 0.2em #000000'
titleWindowModal.style.backgroundColor = '#f7a21b'
titleWindowModal.style.color = '#fff'

//footer modal and btn close modal
footerModal.style.backgroundColor = '#f7a21b'
closeModalBtn.style.backgroundColor = '#008200'
closeModalBtn.style.border = 'none'

//maipuling tag video
function pause() {
    videotrailer.pause()
    btnPlay.style.display = ''
    btnPause.style.display = 'none'
}

function play() {
    videotrailer.play()
    btnPlay.style.display = 'none'
    btnPause.style.display = ''
}

function playAudio() {
    if (videotrailer.muted) {
        videotrailer.muted = false
        btnPlayAudio.innerHTML = 'Desativar Audio'
        teste.style.display = 'block'

    } else {
        videotrailer.muted = true
        btnPlayAudio.innerHTML = 'Ativar Audio'
        teste2.style.display = 'block'
    }
}

function stop() {
    videotrailer.currentTime = 0;
    videotrailer.muted = true
}

function openFormContact() {
    formContactUs.style.left = '480px'
}

function hideForm() {
    Swal.fire(({
        title: '<div style="font-size:20px">POR FAVOR AGUARDE</div>',
        html: '<div style="font-size:28px">ENVIANDO OS DADOS DO FORMULÁRIO...</div>',
        imageUrl: "./img/wating.gif",
        imageWidth: 120,
        imageHeight: 120,
        timer: 4000,
        timerProgressBar: true,
        showConfirmButton: false

    }))

    waitTimer = setTimeout(() => {
        formContactUs.style.left = '-380px'
    }, 4000)

    setTimeout(() => {
        window.location.reload()

    }, 5000)

}

btnContacUS.addEventListener('click', (function () {
    document.querySelector('.contact-us').style.display = 'none'

}))

function showModalChoose() {
    modalChoose.style.display = 'flex'
}

checkyes.addEventListener('click', function () {
    if (checkyes != false) {
        btnTravelTime.style.display = 'block'
    }
})

// function openGame() {
//     window.location.href = '../game/index.html'
// }

function openGame() {
    window.location.href = 'https://sidneyhenriquedev.github.io/supermario/game/index.html'
}

checkno.addEventListener('click', function () {
    if (checkyes != false) {

        Swal.fire(({
            title: 'QUE PENINHA',
            html: '<div style="font-size:28px">VOCÊ NUNCA TEVE INFÂNCIA ):</div>',
            imageUrl: "./img/mario_crying.gif",
            imageWidth: 160,
            imageHeight: 160,
            timer: 3000,
            timerProgressBar: true,
        }))

        setTimeout(() => {
            modalChoose.style.display = 'none'
            checkno.checked = false
            checkyes.checked = false

        }, 3000);

    }
})

//Format input phone
let phone = document.getElementById('phone')
function addMask() {
    let valuePhone = phone.value
    let numbers = valuePhone.replace(/\D/g, '')
    if (numbers.length >= 11) {
        let phoneFormated = '(' + numbers.substring(0, 2) + ')' + numbers.substring(2, 7) + '-' + numbers.substring(7, 11);
        phone.value = phoneFormated;
    } else {
        phone.value = valuePhone
    }
}

