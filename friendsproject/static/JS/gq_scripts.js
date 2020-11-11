const main = () =>{

    const form = document.querySelector('#qaform')
    const ul_list = document.querySelector('#questionslist')
    form.addEventListener('submit',function (e){
        document.getElementById('did').value = $('#userid').val()
        e.preventDefault()
        $('#loadinganimation').show()
        $.ajax({
            url:'getquestions',
            type:'POST',
            data:{
                username : $('#userid').val(),
                csrfmiddlewaretoken : $('input[name=csrfmiddlewaretoken]').val(),
            },
            success: function (data){
                ul_list.innerHTML = ""
                $('#loadinganimation').hide()
                if(data['error']){
                    ul_list.textContent = data['msg']
                }
                else{
                    let questions = data['questions']
                    let answers = data['answers']
                    for(var i=0;i<questions.length;i++)
                    {
                        $('#questionslist').append('<li><span>'+questions[i]+'</span><i class="fa fa-plus"></i></li>')
                        //$('#questionslist').append('<span>'+answers[i][1]+'</span>')
                        const div = document.createElement('div')
                        div.classList.add('collapse')
                        for(var j=0;j<answers[i].length;j++)
                        {
                            const text = document.createTextNode(answers[i][j])
                            const p = document.createElement('p')
                            p.appendChild(text)
                            if(j == 3){
                                p.classList.add('correct_option')
                            }
                            div.append(p)
                        }

                        $('#questionslist').append(div)
                    }
                    const lists = document.querySelectorAll('li')
                    lists.forEach( li =>{
                        li.addEventListener('click',() =>{
                            li.lastChild.classList.toggle('fa-plus')
                            li.lastChild.classList.toggle('fa-minus')
                            $(li.nextElementSibling).collapse('toggle')
                        })
                    })
                }
            },
            error:function(data){
                $('#loadinganimation').hide()
                ul_list.textContent = 'An Exception Occured Please try again later'
            }
        });
    });

}


main()