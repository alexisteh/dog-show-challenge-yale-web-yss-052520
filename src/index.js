document.addEventListener('DOMContentLoaded', () => {

    function qs(identifier){
        return document.querySelector(identifier) 
    }
    function ce(element){
        return document.createElement(element) 
    }

    const registeredDogsTable = qs('tbody#table-body')
    const editDogForm = qs('form#dog-form')

    function fetchDogs(){
        fetch("http://localhost:3000/dogs")
            .then(res => res.json())
            .then(dogs => showDogs(dogs))
    }

    function showDogs(dogs){
        registeredDogsTable.innerHTML = ""
        dogs.forEach(dog => {
            addDog(dog)
        })
    }

    function addDog(dog){
        const dogRow = ce('tr')

        const dogName = ce('td') 
        dogName.innerText = dog.name 

        const dogBreed = ce('td') 
        dogBreed.innerText = dog.breed 

        const dogSex = ce('td')
        dogSex.innerText = dog.sex 

        const dogEditButton = ce('button')
        dogEditButton.innerText = "Edit"

        dogEditButton.addEventListener('click', function(){
            qs('input#name').value = dog.name 
            qs('input#name').className = "dog-"+ dog.id
            qs('input#breed').value = dog.breed 
            qs('input#sex').value = dog.sex 
        })

        dogRow.append(dogName, dogBreed, dogSex, dogEditButton)
        registeredDogsTable.append(dogRow)
    }

    editDogForm.addEventListener('submit', function(){
        event.preventDefault()
        const editDogId = parseInt(qs('input#name').className.split("-")[1])
        const newDogName = qs('input#name').value 
        const newDogBreed = qs('input#breed').value
        const newDogSex = qs('input#sex').value 
        const configObj = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: newDogName,
                breed: newDogBreed,
                sex: newDogSex
            })
        } 
        fetch("http://localhost:3000/dogs/"+editDogId, configObj)
            .then(res => res.json())
            .then(updatedDog => {
                fetchDogs() 
            })
        editDogForm.reset() 
    })

    fetchDogs()
})