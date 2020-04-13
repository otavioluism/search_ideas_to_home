//clase = . // id = #

function onOff(){ 
  document
    .querySelector('#modal')
    .classList  //adiciona uma classe 
    .toggle('hide') //aparece e desaparece com o nome da classe hide / se estiver visivel a classe, apaga. Senão estiver visivel aparece

    document
      .querySelector('body')
      .classList
      .toggle('hideScroll')

      document
      .querySelector('#modal')
      .classList
      .toggle('addScroll')
  }

  //validação do formulário
  function checkFields(event){ 
    //console.log(event.target.title.value) mostra os campos do formulario
    const valuesToCheck = [ 
      "title",
      "iamge", 
      "category",
      "description",
      "link",
    ]

   const isEmpty = valuesToCheck.find(function(value){ 

      const checkIfIsString = typeof event.target[value].value === "string" //verifica se é do tipo string
      const checkIfIsEmpty = !event.target[value].value.trim()              //verifica se é vazio o input se sim é true senao false

      if(checkIfIsString && checkIfIsEmpty){ 
        return true
      }
   })

    if(isEmpty){ 

      event.preventDefault() //não enviará os campos do form
      alert("Por favor, preencha todos os campos")

    }

  }