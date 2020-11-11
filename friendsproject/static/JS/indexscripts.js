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

function validateoptions(firstinput , secondinput){
    if(firstinput.value == ""){
        return {'bool':false,'msg':'Please enter your question to continue','elements':firstinput,'type':'element'}
    }
    else{
        let nullelements =[]
        for(var i=0;i<secondinput.length;i++){
            if(secondinput[i].value=="")
            {
                nullelements.push(secondinput[i])
            }
        }
        if(nullelements.length>0){
            return {'bool':false,'msg':'','elements':nullelements,'type':'array'}
        }
        else{
            return {'bool':true}
        }        
    }
}

function questionsanimate(firstelement , secondelement){
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

function next(parent , ques , ans , nextform ) {
    ques.nextElementSibling.textContent = ""
    let options_string = ""
    let wrong_options = ""
    let correct_option = ""
    ques.classList.remove('errorinput')
    for(var i=0;i<ans.length;i++){
        ans[i].classList.remove('errorinput')
        if(ans[i].classList.contains('correctanswer')){
            correct_option=ans[i].value
        }
        else{
            wrong_options+=ans[i].value+"$#%"
        }
    }
    const result = validateoptions(ques,ans)
    if(result['bool']){
        options_string = wrong_options+correct_option
        parent.lastElementChild.value=options_string
        questionsanimate(parent , nextform)
    }
    else if(result['type'] == "array"){
        const arr = result['elements']
        for(var i=0;i<arr.length;i++){
            arr[i].placeholder=result['msg']+arr[i].placeholder
            arr[i].classList.add('errorinput')
        }
    }
    else{
        const input = result['elements']
        input.placeholder = result['msg']
        input.classList.add('errorinput')
    }
}

function validateEmail(emailField) {
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (reg.test(emailField.value) == false) {
        return false;
    }
    return true;
}

function checkusername(parent,question){
    $.ajax({
        type:'GET',
        url:'checkusername/user',
        data:{
            usrname:$('#emailid').val()
        },
        success:function(response){
            if(response['error']){
                $('#createquestionsmodal').modal()
            }
            else{
                blocksanimate(parent,question)
            }
        },
        error:function(){
            alert("Exception occured please try again")
        }
    })
}

function copyText(element) {
    var range, selection;
  
    if (document.body.createTextRange) {
      range = document.body.createTextRange();
      range.moveToElementText(element);
      range.select();
    } else if (window.getSelection) {
      selection = window.getSelection();        
      range = document.createRange();
      range.selectNodeContents(element);
      selection.removeAllRanges();
      selection.addRange(range);
    }  
    document.execCommand('copy');
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
        } else {
            let errboxes = result['elements']
            for(let i=0;i<errboxes.length;i++){
                errboxes[i].textContent = result['msg']
            }
        }
    })

    const nxtbtns = document.querySelectorAll('.next-btn')

    const prevbtns = document.querySelectorAll('.prev-btn')

    nxtbtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const parent = btn.parentElement.parentElement;
            const ques = parent.firstElementChild;
            const options = ques.nextElementSibling.nextElementSibling;
            const ans = options.children;
            const nextform = parent.nextElementSibling;
            next(parent , ques , ans , nextform)
        })
    })

    prevbtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const parent = btn.parentElement.parentElement;
            const prevform = parent.previousElementSibling;
            questionsanimate(parent , prevform)
        })
    })

    const atags = document.querySelectorAll('.visitorslink')

    atags.forEach(link=>{
        link.addEventListener('click',()=>{
            link.href="my_questions_visitors/"+$('#emailid').val()
        })
    })

    const copybtn = document.querySelector('#copyurl')

    copybtn.addEventListener('click',()=>{
        let url = document.querySelector('#sharingurl')
       copyText(url)
    })

    const form = document.querySelector('#questionsform')
    form.addEventListener('submit', function(e){
        e.preventDefault()
        const lastinputs = document.querySelectorAll('.lastinput')
        let wa = "",ca="",opt = ""
        for(var i =0;i<lastinputs.length;i++){
            if(lastinputs[i].classList.contains('correctanswer')){
                ca = lastinputs[i].value;
            }
            else{
                wa=wa+lastinputs[i].value+"$#%"
            }
        }
        opt=wa+ca
        const lastelement = document.querySelector("#lastelement")
        lastelement.value = opt
        $.ajax({
            type : "POST",
            url : "createuserandquestions",
            data : {
                usrname:$('input[name=usrname').val(),
                email:$('input[name=email]').val(),
                question1:$('input[name=question1]').val(),
                answer1:$('input[name=answer1]').val(),
                question2:$('input[name=question2]').val(),
                answer2:$('input[name=answer2]').val(),
                question3:$('input[name=question3]').val(),
                answer3:$('input[name=answer3]').val(),
                question4:$('input[name=question4]').val(),
                answer4:$('input[name=answer4]').val(),
                question5:$('input[name=question5]').val(),
                answer5:$('input[name=answer5]').val(),
                question6:$('input[name=question6]').val(),
                answer6:$('input[name=answer6]').val(),
                question7:$('input[name=question7]').val(),
                answer7:$('input[name=answer7]').val(),
                question8:$('input[name=question8]').val(),
                answer8:$('input[name=answer8]').val(),
                question9:$('input[name=question9]').val(),
                answer9:$('input[name=answer9]').val(),
                question10:$('input[name=question10]').val(),
                answer10:$('input[name=answer10]').val(),
                csrfmiddlewaretoken : $('input[name=csrfmiddlewaretoken]').val(),
            },
            success:function(response){
                    let a = document.getElementById('sharingurl')
                    a.href = response['url']
                    a.textContent = response['url']
                    const firstdiv = document.querySelector('#questionsdiv')
                    const seconddiv = document.querySelector('#resultdiv')
                    blocksanimate(firstdiv,seconddiv)
            },
            error:function(){
                alert("Exception Occured Please try again")
            }
        })
    })
}

main();