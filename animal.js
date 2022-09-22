var animalData = [
    {
        id: 1,
        title: 'hippo',
        faveFood: 'carrots'
    },
    {
        id: 2,
        title: 'Cat',
        faveFood: 'carrots'
    },
    {
        id: 3,
        title: 'ducks',
        faveFood: 'breadcrumbs'
    },
]
exports.findAnimal = function() {
    for(x=0; x<3; x++) {
        if(animalData[x].title = args[0]) {
            var answer = animalData[x].faveFood
        }
    }
    return answer
}
