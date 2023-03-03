import { db } from './SQlite'

export function CriarTabela () {
  db.transaction(transaction => {
    transaction.executeSql(
      'CREATE TABLE    IF NOT EXISTS ' +
        'Notas ' +
        '( Id INTEGER PRIMARY KEY AUTOINCREMENT , titulo TEXT , categoria TEXT , texto TEXT );'
    )
  })
}

export async function adicionaNota (nota) {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'INSERT INTO Notas (titulo, categoria, texto) VALUES (?,?,?);',
        [nota.titulo, nota.categoria, nota.texto],
        () => {
          resolve('nota adicionada com sucesso')
        }
      )
    })
  })
}

export async function buscaNotas () {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'SELECT * FROM Notas;',
        [],
        (transaction, resultado) => {
          resolve(resultado.rows._array)
        }
      )
    })
  })
}

export async function buscaNotasFilter (categoria) {
    return new Promise(resolve => {
      db.transaction(transaction => {
        transaction.executeSql(
          'SELECT * FROM Notas WHERE categoria = ? ;',
          [categoria],
          (transaction, resultado) => {
            resolve(resultado.rows._array)
          }
        )
      })
    })
  }

export async function atualizaNota (nota) {
  return new Promise(resolve => {
    db.transaction(transaction => {
      transaction.executeSql(
        'UPDATE Notas SET titulo= ? , categoria= ? ,texto= ? WHERE Id= ? ;',
        [nota.titulo, nota.categoria, nota.texto, nota.Id],
        () => {
            console.log('nota atualizada com sucesso'+nota.Id)

          resolve('nota atualizada com sucesso')
        }
      )
    })
  })
}


export async function removeNota (nota) {
    return new Promise(resolve => {
      db.transaction(transaction => {
        transaction.executeSql(
          'DELETE FROM Notas WHERE Id= ? ;',
          [ nota.Id],
          () => {


            resolve('nota removida com sucesso')
          }
        )
      })
    })
  }
