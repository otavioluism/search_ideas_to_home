//usei o express pra criar e configurar meu servidor
const express = require('express') //estou pedindo o pacote express
const server = express(); 
const db = require("./db")

//variaveis no servidor para enviar ao html 
// const ideas = [
//   { 
//     img: "https://image.flaticon.com/icons/svg/2729/2729005.svg", 
//     title: "Exercícios", 
//     category: "Saúde",
//     description: "Lorem ipsum, dolor sit amet consectetur adipisicing",
//     url: "https://rocketseat.com.br"
//   },

//   { 
//     img: "https://image.flaticon.com/icons/svg/2729/2729007.svg", 
//     title: "Curso de Programação", 
//     category: "Estudo",
//     description: "Lorem ipsum, dolor sit amet consectetur adipisicing",
//     url: "https://rocketseat.com.br"
//   },

//   { 
//     img: "https://image.flaticon.com/icons/svg/2729/2729027.svg", 
//     title: "Meditação", 
//     category: "Mentalidade",
//     description: "Lorem ipsum, dolor sit amet consectetur adipisicing",
//     url: "https://rocketseat.com.br"
//   },

//   { 
//     img: "https://image.flaticon.com/icons/svg/2729/2729032.svg", 
//     title: "Karaokê", 
//     category: "Diversão em Família",
//     description: "Lorem ipsum, dolor sit amet consectetur adipisicing",
//     url: "https://rocketseat.com.br"
//   },
// ]

//configurar arquivos estáticos (css, scripts, imagens)
server.use(express.static("public"))

//habilitar uso do req body que tem todos os campos salvos no formulario
server.use(express.urlencoded( { extended: true} ))

//configuracao do nunjucks 
const nunjucks = require("nunjucks")
nunjucks.configure("views",{
  express: server, 
  noCache: true, //desabilita a cache do nunjucks pois as vezes se salva algo e ele nao muda por estar salvo na cache
})


//criei uma rota /
//e capturo o pedido do cliente para responder
server.get("/", function(req, res){ 

      db.all(`SELECT * FROM ideas`, function(err, rows){ 
          
        if (err){
          console.log(err)
          return res.send("ERRO NO BANCO DE DADOS")
      }

           const reverseIdeas = [...rows].reverse()

           let lastIdeas = []
           for(let idea of reverseIdeas){ 
               if(lastIdeas.length < 2){ 
                  lastIdeas.push(idea)
               }
           }
                           //manda a pg    //var    //valor
           return res.render("index.html", {ideas: lastIdeas})
    })
})

// O cliente pede a rota ideias e o servidor devolve a pagina html
server.get("/ideias", function(req, res){ 

  db.all(`SELECT * FROM ideas`, function(err, rows){ 
        if (err){
            console.log(err)
            return res.send("ERRO NO BANCO DE DADOS")
        }
        const reverseIdeas = [...rows].reverse()

        return res.render("ideias.html", {ideas: reverseIdeas} )
  })


}) 

server.post('/',function(req, res){ 
    //ISERIR DADOS NA TABBELA 
  const query = `
            INSERT INTO ideas(
                image,
                title, 
                category, 
                description,
                link
            ) VALUES (?,?,?,?,?);
          `
   const values = [
     req.body.image, 
     req.body.title, 
     req.body.category, 
     req.body.description, 
     req.body.link
    ]

  db.run(query, values, function(err){ 
  
      if (err){
        console.log(err)
        return res.send("ERRO NO BANCO DE DADOS")
      } 

    return res.redirect("/ideias")
  })
})


//liguei meu servidor na porta 3000
server.listen(3000)