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
  .get('28aeade3-49c7-4687-890c-2d49f6c11ee5')
  .update({name: 'Bob'})


// replace a record (insert, delete, or update)
r.db('tappr').table('files')
  .get('28aeade3-49c7-4687-890c-2d49f6c11ee5')
  .replace({
    id: '28aeade3-49c7-4687-890c-2d49f6c11ee5',
    name: 'Bob',
    size: 2048,
    dateImported: Date.now()
  })

// delete a record
r.db('tappr').table('files')
  .get('28aeade3-49c7-4687-890c-2d49f6c11ee5')
  .delete()
