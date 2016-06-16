// list everything in the files table
r.db('tappr').table('files')

// insert a new record
r.db('tappr').table('files').insert({
  name: `myimage9999999.jpg`,
  size: 1024,
  dateImported: Date.now()
})

// update an existing record
r.db('tappr').table('files')
  .get('d30172ec-4413-4b69-bc59-8f654b9cba23')
  .update({name: 'Bob'})


// replace a record (insert, delete, or update)
r.db('tappr').table('files')
  .get('d30172ec-4413-4b69-bc59-8f654b9cba23')
  .replace({
    id: 'd30172ec-4413-4b69-bc59-8f654b9cba23',
    name: 'Bob',
    size: 2048,
    dateImported: Date.now()
  })

// delete a record
r.db('tappr').table('files')
  .get('d30172ec-4413-4b69-bc59-8f654b9cba23')
  .delete()
