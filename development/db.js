const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./data.db')

db.serialize(function(){ 

  // -----------------------------------------------------------------

  //CRIAR A TABELA 
  db.run(`

      CREATE TABLE IF NOT EXISTS ideas(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          image TEXT, 
          title TEXT, 
          category TEXT, 
          description TEXT,
          link TEXT
       );
  `)

// -----------------------------------------------------------------

  //ISERIR DADOS NA TABBELA 
  // const query = `
  //           INSERT INTO ideas(
  //               image,
  //               title, 
  //               category, 
  //               description,
  //               link
  //           ) VALUES (?,?,?,?,?);
  //         `
  //  const values = [
  //   "https://image.flaticon.com/icons/svg/2729/2729005.svg", 
  //   "Exercícios", 
  //   "Saúde",
  //   "Lorem ipsum, dolor sit amet consectetur adipisicing",
  //   "https://rocketseat.com.br"
  // ]

  // db.run(query, values, function(err){ 
  //     if (err) return console.log(err)

  //     console.log(this) //a resposta que inseriu
  // })

// -----------------------------------------------------------------

  //DELETAR UM DADO DA TABELA 
  // db.run('DELETE FROM ideas WHERE id = ?', [1], function(err){ 
  //   if(err) return console.log(err)

  //   console.log("DELETEI", this)
  // })  

// ----------------------------------------------------------------- 

  // //CONSULTAR DADOS NA TABELA 
  //   db.all(`SELECT * FROM ideas`, function(err, rows){ 
  //     if(err) return console.log(err)

  //     console.log(rows)
  //   })

})

module.exports = db