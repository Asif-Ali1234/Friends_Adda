function validateinputs(firstinput , secondinput) {
    if(firstinput.value == "" && secondinput.value == ""){
        return {'bool':false,'msg':'Please fill out this field','elements':[firstinput.nextElementSibling,secondinput.nextElementSibling]}
    }
    else if(firstinput.value == "" || secondinput.value == ""){
        let nullid = ""
        firstinput.value=="" ? nullid = firstinput.nextElementSibling : nullid = secondinput.nextElementSibling ;
        return {'bool':false,'msg':'Please fill out this field','elements':[nullid]}
    }
    if(secondinput.type == "email" && !validateEmail(secondinput)){
        return {'bool':false,'msg':'Enter valid email address' , 'elements':[secondinput.nextElementSibling]}
    }
    return {'bool':true}
}

function validateEmail(emailField) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(emailField.value) == false) {
        return false;
    }
    return true;
}

function validateoptions(secondinput) {
    let flag=false
    for (var i = 0; i < secondinput.length; i++) {
        if (secondinput[i].firstElementChild.checked) {
            flag=true
        }
    }
    return flag
}

function questionsanimate(firstelement, secondelement) {
    firstelement.classList.add('inactive')
    firstelement.classList.remove('active')
    secondelement.classList.remove('inactive')
    secondelement.classList.add('active')
}

function blocksanimate(firstelement , secondelement){
    firstelement.classList.add('boxinactive')
    firstelement.classList.remove('boxactive')
    secondelement.classList.remove('boxinactive')
    secondelement.classList.add('boxactive')
}

function next(parent, ans, nextform) {
    const result = validateoptions(ans)
    if (result) {
        questionsanimate(parent, nextform)
        //alert($('input[name=option1]:checked').val())
    } else {
        alert('please check atleast one answer')
    }
}

function checkusername(parent,question){
    $.ajax({
        type:'GET',
        url:"/checkusername/visitor",
        data:{
            visitorname:$('#emailid').val(),
            usrname:$('input[name=hiddenusermail]').val(),
        },
        success:function(response){
            if(response['error']){
                $('#errormodal').modal()
            }
            else{
                blocksanimate(parent,question)
            }
        }
    })
}

const main = () => {

    const subbtn = document.querySelector('#detailsbutton')
    subbtn.addEventListener('click', () => {
        const parent = subbtn.parentElement;
        const name = parent.firstElementChild;
        const email = name.nextElementSibling.nextElementSibling;
        const question = document.querySelector('#questionsdiv')
        name.nextElementSibling.textContent = ""
        email.nextElementSibling.textContent = ""
        let result=validateinputs(name,email)
        if (result['bool']) {
            document.getElementById('hiddenusrname').value = document.getElementById('nameid').value
            document.getElementById('hiddenmailid').value = document.getElementById('emailid').value
            checkusername(parent,question)
            //blocksanimate(parent,question)
        } else {
            let errboxes = result['elements']
            for(let i=0;i<errboxes.length;i++){
                errboxes[i].textContent = result['msg']
            }
        }
    })

    const nxtbtns = document.querySelectorAll('.next-btn')

    nxtbtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const parent = btn.parentElement.parentElement;
            const ques = parent.firstElementChild;
            const options = ques.nextElementSibling;
            const ans = options.children;
            const nextform = parent.nextElementSibling;
            next(parent, ans, nextform)
        })
    })

    const form = document.querySelector('#questionsform')
    form.addEventListener('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: $('input[name=hiddenusermail]').val(),
            data: {
                visitor_name:$('#hiddenusrname').val(),
                visitor_mail:$('#hiddenmailid').val(),
                answer1: $('input[name=option1]:checked').val(),
                answer2: $('input[name=option2]:checked').val(),
                answer3: $('input[name=option3]:checked').val(),
                answer4: $('input[name=option4]:checked').val(),
                answer5: $('input[name=option5]:checked').val(),
                answer6: $('input[name=option6]:checked').val(),
                answer7: $('input[name=option7]:checked').val(),
                answer8: $('input[name=option8]:checked').val(),
                answer9: $('input[name=option9]:checked').val(),
                answer10: $('input[name=option10]:checked').val(),
                csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val(),
            },
            success: function (response) {
                if (response['error']) {
                    alert(response['msg'])
                } else {
                    const firstdiv = document.querySelector('#questionsdiv')
                    const seconddiv = document.querySelector('#resultdiv')
                    blocksanimate(firstdiv, seconddiv)
                    $('#userscore').html(response['score'])
                    $('#userscore').css('color',response['color'])
                    $('#success_percentage').html(response['success_percentage'])
                    $('#success_message').html(response['success_msg'])
                }
            },
            error: function () {
                alert("Exception Occured")
            }
        })
    })
}

main();