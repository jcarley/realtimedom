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
  .get('3e3bf95e-d868-4e5f-9d4d-2330331aa61f')
  .update({name: 'Bob'})


// replace a record (insert, delete, or update)
r.db('tappr').table('files')
  .get('3e3bf95e-d868-4e5f-9d4d-2330331aa61f')
  .replace({
    id: '3e3bf95e-d868-4e5f-9d4d-2330331aa61f',
    size: 2048,
    dateImported: Date.now()
  })

// delete a record
r.db('tappr').table('files')
  .get('3e3bf95e-d868-4e5f-9d4d-2330331aa61f')
  .delete()
