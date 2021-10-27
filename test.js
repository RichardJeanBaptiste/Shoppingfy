const data = [
    {
      Title: 'title',
      Items: [
        'abc',
        'def',
        'ghi'
      ]
    },
    {
        Title: 'title2',
        Items: [
          'abc2',
          'def2',
          'ghi2'
        ]
      }
]

data.map((items) => {
    console.log(items.Title)
    console.log("---------------")
    items.Items.map((x) => {
        console.log(x)
    })
    console.log("---------------")
})